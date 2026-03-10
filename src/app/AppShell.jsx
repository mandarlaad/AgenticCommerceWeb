import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, Chip, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ConversationPanel from '../components/chat/ConversationPanel';
import SideWorkspace from '../components/sidepanel/SideWorkspace';
import { fetchJson } from '../lib/api';
import { defaultBareBonesUi, defaultMinimalUi, defaultRuntimeArn, defaultRuntimeQualifier, defaultRuntimeRegion } from '../lib/config';
import { toolContractMap } from '../lib/contracts';
import {
  describePlan,
  extractQuery,
  parseIntent,
  productArtwork,
  screeningFromDraft
} from '../lib/planning';
import { panelStyle, palette, shellStyle } from '../lib/theme';
import mockProfiles from '../lib/mockProfiles';
import logo from '../images/logo.png';

const API_BASE = '/api';

function normalizeItems(body) {
  if (Array.isArray(body)) return body;
  if (Array.isArray(body?.items)) return body.items;
  if (Array.isArray(body?.products)) return body.products;
  return [];
}

function shortlistProducts(items, mode, amount) {
  const priced = Array.isArray(items) ? items.filter((item) => typeof item?.price === 'number') : [];
  if (!priced.length) return [];
  if (mode === 'below' && amount) return priced.filter((item) => item.price <= amount).sort((a, b) => b.price - a.price).slice(0, 3);
  if (mode === 'above' && amount) return priced.filter((item) => item.price >= amount).sort((a, b) => a.price - b.price).slice(0, 3);
  return priced.slice(0, 3);
}

function contractSummaryFromTrace(trace, runtimeContracts) {
  if (Array.isArray(runtimeContracts) && runtimeContracts.length) return runtimeContracts;
  const seen = new Set();
  return trace
    .map((entry) => ({
      targetName: entry.targetName,
      operationId: entry.operationId,
      contractPath: entry.contractPath,
      surfaceMode: entry.surfaceMode
    }))
    .filter((entry) => entry.targetName && entry.operationId && entry.contractPath)
    .filter((entry) => {
      const key = `${entry.targetName}|${entry.operationId}|${entry.contractPath}|${entry.surfaceMode}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function summaryForState({ product, order, rail, shippingAddress }) {
  if (!product) return 'No product selected yet.';
  if (order?.status === 'CONFIRMED') return `CONFIRMED for ${product.name} at $${product.price} via ${rail || 'card'}.`;
  if (order?.status === 'DECLINED') return `DECLINED for ${product.name} at $${product.price} via ${rail || 'card'}.`;
  if (order?.status === 'PENDING_3DS') return `Step-up verification is required before completing the ${product.name} purchase.`;
  if (order?.status === 'DELIVERED' || order?.status === 'IN_TRANSIT' || order?.status === 'SHIPPED' || order?.status === 'CAPTURED') {
    return `Checkout is confirmed for ${product.name}. Estimated delivery in 2-4 business days to ${shippingAddress?.city || 'the shopper'}.`;
  }
  return 'No completed order yet.';
}

function shopperFacingRouteStatus(order, shippingStatus) {
  const status = order?.status || shippingStatus || '';
  if (/DECLINED|FAILED|ERROR/i.test(status)) return 'DECLINED';
  if (/PENDING_3DS/i.test(status)) return 'PENDING_3DS';
  if (/CONFIRMED|CAPTURED|DELIVERED|IN_TRANSIT|SHIPPED/i.test(status)) return 'CONFIRMED';
  if (/READY_FOR_PAYMENT/i.test(status)) return 'READY_FOR_PAYMENT';
  return status || 'IDLE';
}

export default function AppShell() {
  const [minimalUi, setMinimalUi] = useState(defaultMinimalUi);
  const [bareBonesUi, setBareBonesUi] = useState(defaultBareBonesUi);
  const [runtimeArn, setRuntimeArn] = useState(() => defaultRuntimeArn || localStorage.getItem('agentcore-runtime-arn') || '');
  const [runtimeRegion] = useState(defaultRuntimeRegion);
  const [runtimeQualifier] = useState(defaultRuntimeQualifier);
  const [prompt, setPrompt] = useState('suggest treadmills under 1200; offer financing');
  const [messages, setMessages] = useState([]);
  const [trace, setTrace] = useState([]);
  const [toolContracts, setToolContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [routeMode, setRouteMode] = useState('acp');
  const [planState, setPlanState] = useState(null);
  const [options, setOptions] = useState([]);
  const [flowStage, setFlowStage] = useState('idle');
  const [product, setProduct] = useState(null);
  const [consentRecord, setConsentRecord] = useState(null);
  const [currentProfile] = useState(() => mockProfiles[Math.floor(Math.random() * mockProfiles.length)]);
  const [cartDraft, setCartDraft] = useState({
    qty: 1,
    shippingAddress: {
      line1: currentProfile.shippingAddress.line1,
      city: currentProfile.shippingAddress.city,
      region: currentProfile.shippingAddress.region,
      postalCode: currentProfile.shippingAddress.postalCode
    }
  });
  const [screening, setScreening] = useState(null);
  const [paymentDraft, setPaymentDraft] = useState({
    railPreference: 'card',
    detailsLabel: 'Bread Credit Card selected',
    apr: '',
    termMonths: '',
    monthlyAmount: ''
  });
  const [session, setSession] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [token, setToken] = useState(null);
  const [order, setOrder] = useState(null);
  const [shippingStatus, setShippingStatus] = useState('');
  const [showContractSurface, setShowContractSurface] = useState(true);
  const [showProtocolTrace, setShowProtocolTrace] = useState(true);
  const [activePanel, setActivePanel] = useState('state');
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const orderId = order?.orderId || session?.checkoutSessionId || session?.sessionId || '';

  useEffect(() => {
    localStorage.setItem('agentcore-runtime-arn', runtimeArn || '');
  }, [runtimeArn]);

  useEffect(() => {
    if (!orderId || routeMode !== 'acp') return undefined;
    const interval = setInterval(async () => {
      const response = await fetchJson(`${API_BASE}/orders/${orderId}`);
      if (response.ok) {
        setOrder(response.body);
        setShippingStatus(response.body.status || '');
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [orderId, routeMode]);

  const summary = useMemo(
    () => summaryForState({ product, order, rail: eligibility?.preferredRail, shippingAddress: cartDraft?.shippingAddress }),
    [product, order, eligibility, cartDraft]
  );
  const routeStatus = useMemo(() => shopperFacingRouteStatus(order, shippingStatus), [order, shippingStatus]);
  const artwork = useMemo(() => productArtwork(product), [product]);
  const contractSummary = useMemo(() => contractSummaryFromTrace(trace, toolContracts), [trace, toolContracts]);

  function pushMessage(role, text) {
    setMessages((prev) => [...prev, { role, text }]);
  }

  function pushTrace(tool, method, endpoint, status, extra = {}) {
    const contract = toolContractMap[tool] || {};
    setTrace((prev) => [
      ...prev,
      {
        tool,
        method,
        endpoint,
        status,
        at: new Date().toLocaleTimeString(),
        targetName: contract.targetName,
        operationId: contract.operationId,
        contractPath: contract.contractPath,
        surfaceMode: extra.surfaceMode || contract.surfaceMode || 'direct_http',
        ...extra
      }
    ]);
  }

  function resetFlowState(nextRouteMode) {
    setRouteMode(nextRouteMode);
    setMessages([]);
    setTrace([]);
    setToolContracts([]);
    setError('');
    setOptions([]);
    setFlowStage('idle');
    setProduct(null);
    setConsentRecord(null);
    setScreening(null);
    setSession(null);
    setEligibility(null);
    setToken(null);
    setOrder(null);
    setShippingStatus('');
    setPlanState(null);
    setCartDraft({
      qty: 1,
      shippingAddress: {
        line1: currentProfile.shippingAddress.line1,
        city: currentProfile.shippingAddress.city,
        region: currentProfile.shippingAddress.region,
        postalCode: currentProfile.shippingAddress.postalCode
      }
    });
    setPaymentDraft({
      railPreference: 'card',
      detailsLabel: 'Bread Credit Card selected',
      apr: '',
      termMonths: '',
      monthlyAmount: ''
    });
    setActivePanel('state');
    setShowWorkspace(false);
  }

  function handleReset() {
    resetFlowState(routeMode);
  }

  async function runFlow() {
    setLoading(true);
    resetFlowState('acp');
    pushMessage('user', prompt);
    try {
      const intent = parseIntent(prompt);
      const query = extractQuery(prompt) || prompt;
      const requestedRailPreference = /finance|installment|bread pay|breadpay|card/i.test(prompt) ? 'card' : 'card';
      const plan = {
        source: 'react-surface',
        mode: intent.mode,
        amount: intent.amount,
        query,
        maxPrice: intent.mode === 'below' ? intent.amount : 5000,
        requestedRailPreference,
        railPreference: requestedRailPreference,
        toolSequence: ['catalog.search', 'consents.create', 'identity.screen', 'fraud.screen', 'checkout_sessions.create', 'checkout_sessions.update', 'fsp.financing.eligibility', 'fsp.payments.tokenize', 'checkout_sessions.complete']
      };
      setPlanState(plan);
      pushTrace('planner.intent', 'LOCAL', 'prompt -> structured plan', 'OK', { surfaceMode: 'react_ui', query, maxPrice: plan.maxPrice });
      pushMessage('assistant', `Got it — I’m looking for ${query}${plan.mode === 'below' && plan.amount ? ` under $${plan.amount}` : ''}. I’ll show you the best matches here.`);

      const searchParams = new URLSearchParams();
      searchParams.set('q', query);
      if (plan.mode === 'below' && plan.amount) searchParams.set('maxPrice', String(plan.amount));
      const searchEndpoint = `${API_BASE}/catalog/search?${searchParams.toString()}`;
      const searchResponse = await fetchJson(searchEndpoint);
      pushTrace('catalog.search', 'GET', searchEndpoint, searchResponse.status);
      if (!searchResponse.ok) throw new Error('Catalog search failed');

      const shortlist = shortlistProducts(normalizeItems(searchResponse.body), plan.mode, plan.amount);
      if (!shortlist.length) throw new Error('No matching products were returned by catalog search');

      setOptions(shortlist);
      setFlowStage('options');
      pushMessage('assistant', `I found ${shortlist.length} matching options. Review the shortlist below and pick the one you want.`);

    } catch (err) {
      setError(err.message || String(err));
      pushMessage('assistant', `Flow failed: ${err.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  function confirmProductChoice(selected) {
    setProduct(selected);
    setFlowStage('consent');
    pushMessage('user', `Proceed with ${selected.name} at $${selected.price}.`);
    pushMessage('assistant', 'To continue, please review and approve the information-sharing permissions below so I can check your available financing offers.');
  }

  function grantConsent() {
    const record = {
      consentId: `cons_${Date.now()}`,
      status: 'GRANTED',
      scopes: ['shipping', 'financing', 'payments', 'marketing_preferences']
    };
    setConsentRecord(record);
    setFlowStage('offers');
    pushTrace('consents.create', 'LOCAL', 'consent -> shopper approval', 201, { surfaceMode: 'ui_simulated' });
    pushMessage('user', 'I approve the requested permissions and want to continue.');
    pushMessage('assistant', 'Thanks — I checked your eligibility and found available financing offers for this purchase. Pick the option you want to continue with.');
  }

  function selectFinancingOffer(selectedOffer) {
    setPaymentDraft({
      railPreference: selectedOffer.type,
      detailsLabel: selectedOffer.label,
      apr: selectedOffer.apr,
      termMonths: selectedOffer.termMonths,
      monthlyAmount: selectedOffer.monthlyAmount
    });

    setFlowStage('sms');

    pushMessage(
      'user',
      `I want to continue with ${selectedOffer.type === 'card' ? 'Bread Credit Card' : 'Bread Pay'}.`
    );

    pushMessage(
      'assistant',
      selectedOffer.type === 'card'
        ? `Great choice — you selected Bread Credit Card with ${selectedOffer.termMonths} months financing at ${selectedOffer.apr}% APR. To continue, we’ll send a secure verification link to your phone.`
        : `Great choice — you selected Bread Pay with estimated payments of $${selectedOffer.monthlyAmount}. To continue, we’ll send a secure verification link to your phone.`
    );
  }

  function continueAfterSms() {
    setFlowStage('approved');

    pushMessage(
      'assistant',
      `Great news — you're approved for this purchase using ${
        paymentDraft.railPreference === 'card'
          ? 'Bread Credit Card financing'
          : 'Bread Pay'
      }. Review your order below and complete checkout.`
    );
  }

  function continueToScreening() {
    const result = screeningFromDraft(product, cartDraft);
    setScreening(result);
    setFlowStage('screening');
    pushTrace('identity.screen', 'LOCAL', 'identity verification', 200, { surfaceMode: 'ui_simulated', identityStatus: result.identityStatus });
    pushTrace('fraud.screen', 'LOCAL', 'fraud screening', 200, { surfaceMode: 'ui_simulated', fraudStatus: result.fraudStatus, riskScore: result.riskScore });
  }

  function continueToPayment() {
    setFlowStage('payment');
  }

  async function preparePayment() {
    setLoading(true);
    try {
      const qty = Math.max(1, Number(cartDraft.qty || 1));
      const createKey = `ui-create-${Date.now()}`;
      const updateKey = `ui-update-${Date.now()}`;
      const createBody = { items: [{ sku: product.sku, qty }], shippingAddress: cartDraft.shippingAddress };
      const createResponse = await fetchJson(`${API_BASE}/checkout_sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': createKey },
        body: JSON.stringify(createBody)
      });
      pushTrace('checkout_sessions.create', 'POST', `${API_BASE}/checkout_sessions`, createResponse.status, { idempotencyKey: createKey });
      if (!createResponse.ok) throw new Error('Checkout session creation failed');
      setSession(createResponse.body);

      const sessionId = createResponse.body.checkoutSessionId || createResponse.body.sessionId;
      const updateBody = { items: [{ sku: product.sku, qty }], shippingAddress: cartDraft.shippingAddress, status: 'READY_FOR_PAYMENT' };
      const updateResponse = await fetchJson(`${API_BASE}/checkout_sessions/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': updateKey },
        body: JSON.stringify(updateBody)
      });
      pushTrace('checkout_sessions.update', 'POST', `${API_BASE}/checkout_sessions/${sessionId}`, updateResponse.status, { idempotencyKey: updateKey });
      if (!updateResponse.ok) throw new Error('Checkout session update failed');
      setSession(updateResponse.body);

      const total = Number(product.price || 0) * qty;
      const eligibilityResponse = await fetchJson(`${API_BASE}/fsp/financing/eligibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      });
      pushTrace('fsp.financing.eligibility', 'POST', `${API_BASE}/fsp/financing/eligibility`, eligibilityResponse.status);
      if (!eligibilityResponse.ok) throw new Error('Eligibility lookup failed');
      setEligibility(eligibilityResponse.body);

      const chosenRail = paymentDraft.railPreference || eligibilityResponse.body.preferredRail || 'card';
      const tokenizeResponse = await fetchJson(`${API_BASE}/fsp/payments/tokenize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId: 'bfh-demo', rail: chosenRail, amount: total })
      });
      pushTrace('fsp.payments.tokenize', 'POST', `${API_BASE}/fsp/payments/tokenize`, tokenizeResponse.status, { rail: chosenRail });
      if (!tokenizeResponse.ok) throw new Error('Payment tokenization failed');
      setToken(tokenizeResponse.body);
      setPaymentDraft((draft) => ({ ...draft, railPreference: chosenRail }));
      setFlowStage('confirm');
    } catch (err) {
      setError(err.message || String(err));
      pushMessage('assistant', `Flow failed: ${err.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  async function confirmAndCheckout() {
    setLoading(true);
    try {
      const completeKey = `ui-complete-${Date.now()}`;
      const sessionId = session?.checkoutSessionId || session?.sessionId || `session-${Date.now()}`;
      const instrument = token?.instrument || { token: token?.token || `tok_${Date.now()}`, type: paymentDraft.railPreference };
      const completeBody = { sessionId, paymentToken: instrument.token, instrument };

      let result = null;

      try {
        const completeResponse = await fetchJson(`${API_BASE}/checkout_sessions/${sessionId}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Idempotency-Key': completeKey },
          body: JSON.stringify(completeBody)
        });
        pushTrace('checkout_sessions.complete', 'POST', `${API_BASE}/checkout_sessions/${sessionId}/complete`, completeResponse.status, { idempotencyKey: completeKey });
        result = completeResponse.body || {};
      } catch (e) {
        result = {};
      }

      const normalizedResult = {
        ...result,
        orderId: result?.orderId || `BFH-${String(Date.now()).slice(-6)}`,
        status: /DECLINED|FAILED|ERROR/i.test(result?.status || '') ? 'DECLINED' : 'CONFIRMED'
      };

      setOrder(normalizedResult);
      setShippingStatus(normalizedResult.status || '');
      setFlowStage('complete');
    } catch (err) {
      setError(err.message || String(err));
      pushMessage('assistant', `Flow failed: ${err.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  function applyRuntimeResult(result) {
    setPlanState(result.plan || null);
    setToolContracts(result.toolContracts || []);
    setProduct(result.product || null);
    setEligibility(result.eligibility || null);
    setToken(result.instrument || result.token || null);
    setOrder(result.order || null);
    setShippingStatus(result.order?.status || '');
    setFlowStage('complete');
    const runtimeTrace = (result.toolTrace || []).map((entry) => ({
      ...entry,
      endpoint: `${API_BASE}${entry.path}`,
      status: entry.statusCode || (entry.ok ? 'OK' : 'ERROR'),
      at: new Date().toLocaleTimeString()
    }));
    setTrace(runtimeTrace);
    if (result.order?.orderId) setSession({ checkoutSessionId: result.order.orderId, sessionId: result.order.orderId, status: result.order.status });
  }

  async function runRuntimeFlow() {
    setLoading(true);
    resetFlowState('agentcore');
    pushMessage('user', prompt);
    try {
      const response = await fetchJson('/runtime-proxy/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentRuntimeArn: runtimeArn,
          qualifier: runtimeQualifier,
          region: runtimeRegion,
          payload: { userText: prompt }
        })
      });
      if (!response.ok || !response.body?.ok) throw new Error(response.body?.error || 'Runtime invocation failed');
      applyRuntimeResult(response.body.body || {});
    } catch (err) {
      setError(err.message || String(err));
      pushMessage('assistant', `AgentCore flow failed: ${err.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!prompt.trim()) return;
    if (routeMode === 'agentcore') {
      await runRuntimeFlow();
      return;
    }
    await runFlow();
  }

  async function simulateFulfillment() {
    if (!orderId) return;
    const response = await fetchJson(`${API_BASE}/fulfillment/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    });
    pushTrace('fulfillment.simulate', 'POST', `${API_BASE}/fulfillment/simulate`, response.status);
    if (response.ok) {
      setShippingStatus(response.body.status || 'IN_TRANSIT');
    }
  }

  const heroCopy = minimalUi
    ? 'A shopper-first conversational commerce surface with optional agent-step visibility.'
    : 'A chat-guided commerce surface for product discovery, financing, and checkout, with technical agent steps available only when needed.';
  const workspaceHeight = minimalUi ? 'calc(100vh - 126px)' : 'calc(100vh - 164px)';

  return (
    <div
      style={
        bareBonesUi
          ? { minHeight: '100vh', background: '#ffffff', color: '#111111', fontFamily: '"Segoe UI", Arial, sans-serif' }
          : shellStyle
      }
    >
      <div style={{ maxWidth: 1580, margin: '0 auto', padding: minimalUi ? '12px' : '20px' }}>
        <section
          style={{
            ...(bareBonesUi
              ? { background: '#ffffff', border: '1px solid #d0d0d0', borderRadius: 6, boxShadow: 'none' }
              : panelStyle),
            padding: minimalUi ? '12px 16px' : '18px 22px',
            marginBottom: 12
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img
                src={logo}
                alt="logo"
                style={{
                  height: 64,
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />

              <div>
                <div
                  style={{
                    fontFamily: bareBonesUi ? '"Segoe UI", Arial, sans-serif' : '"Trebuchet MS", sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: palette.slate,
                    marginBottom: 8
                  }}
                >
                  Agentic Commerce / ACP surface
                </div>

                <h1 style={{ margin: 0, fontSize: bareBonesUi ? 32 : minimalUi ? 34 : 48, lineHeight: 1, fontWeight: 600 }}>
                  Chat-guided checkout with protocol trace.
                </h1>

                <p style={{ margin: '8px 0 0', maxWidth: 760, fontSize: minimalUi ? 15 : 18, color: 'rgba(24,22,26,0.78)' }}>
                  {heroCopy}
                </p>
              </div>
            </div>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
              <Chip
                label={
                  currentProfile.customerType === 'existing'
                    ? 'Existing customer'
                    : currentProfile.customerType === 'risk'
                      ? 'Risk profile'
                      : 'New customer'
                }
                color={currentProfile.customerType === 'existing' ? 'secondary' : currentProfile.customerType === 'risk' ? 'warning' : 'primary'}
                variant="outlined"
              />
              <IconButton onClick={() => setProfileOpen(true)}>
                <AccountCircleRoundedIcon sx={{ fontSize: 34 }} />
              </IconButton>
            </Stack>
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: showWorkspace ? 'minmax(0,1.5fr) minmax(360px,1fr)' : 'minmax(0,1fr)',
            gap: 16,
            alignItems: 'stretch',
            height: workspaceHeight,
            minHeight: 700,
            maxHeight: workspaceHeight,
            overflow: 'hidden',
            transition: 'all 0.25s ease'
          }}
        >
          <ConversationPanel
            minimalUi={minimalUi}
            bareBonesUi={bareBonesUi}
            routeMode={routeMode}
            setRouteMode={setRouteMode}
            prompt={prompt}
            setPrompt={setPrompt}
            onSend={handleSend}
            onReset={handleReset}
            loading={loading}
            runtimeReady={Boolean(runtimeArn)}
            messages={messages}
            product={product}
            summary={summary}
            artwork={artwork}
            planState={planState}
            stageProps={{
              stage: routeMode === 'acp' ? flowStage : 'idle',
              options,
              product,
              currentProfile,
              order,
              cartDraft,
              setCartDraft,
              paymentDraft,
              setPaymentDraft,
              screening,
              loading,
              onSelectProduct: confirmProductChoice,
              onGrantConsent: grantConsent,
              onSelectFinancingOffer: selectFinancingOffer,
              onContinueAfterSms: continueAfterSms,
              onContinueToScreening: continueToScreening,
              onContinueToPayment: continueToPayment,
              onPreparePayment: preparePayment,
              onConfirmCheckout: confirmAndCheckout
            }}
          />

          {showWorkspace ? (
            <SideWorkspace
              bareBonesUi={bareBonesUi}
              routeMode={routeMode}
              orderStatus={routeStatus}
              plannerStatus={planState?.source || eligibility?.preferredRail}
              showContractSurface={showContractSurface}
              setShowContractSurface={setShowContractSurface}
              showProtocolTrace={showProtocolTrace}
              setShowProtocolTrace={setShowProtocolTrace}
              activePanel={activePanel}
              setActivePanel={setActivePanel}
              flowProps={{
                planState,
                product,
                consentRecord,
                screening,
                session,
                eligibility,
                paymentDraft,
                token,
                order,
                shippingStatus,
                cartDraft,
                orderId
              }}
              contracts={contractSummary}
              trace={trace}
              base={API_BASE}
            />
          ) : null}
        </section>

        <Drawer anchor="right" open={profileOpen} onClose={() => setProfileOpen(false)}>
          <Box sx={{ width: 360, p: 2.25, display: 'grid', gap: 1.5 }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar sx={{ width: 48, height: 48 }}>
                {currentProfile.firstName[0]}
                {currentProfile.lastName[0]}
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 800 }}>
                  {currentProfile.firstName} {currentProfile.lastName}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {currentProfile.customerType === 'existing'
                    ? 'Existing customer profile'
                    : currentProfile.customerType === 'risk'
                      ? 'High-risk profile'
                      : 'New customer profile'}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Box sx={{ display: 'grid', gap: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>Saved profile details</Typography>
              <Typography><strong>Email:</strong> {currentProfile.email}</Typography>
              <Typography><strong>Phone:</strong> {currentProfile.phone}</Typography>
              <Typography>
                <strong>Address:</strong> {currentProfile.shippingAddress.line1}, {currentProfile.shippingAddress.city}, {currentProfile.shippingAddress.region} {currentProfile.shippingAddress.postalCode}
              </Typography>
              {currentProfile.cardLast4 ? (
                <Typography><strong>Bread card:</strong> ending in {currentProfile.cardLast4}</Typography>
              ) : null}
            </Box>

            <Divider />

            <Box sx={{ display: 'grid', gap: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>Available for consent sharing</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip label="First name" size="small" />
                <Chip label="Last name" size="small" />
                <Chip label="Email" size="small" />
                <Chip label="Phone" size="small" />
                <Chip label="Address" size="small" />
              </Stack>
              <Typography sx={{ color: 'text.secondary', fontSize: 13.5, lineHeight: 1.5 }}>
                These saved profile details can be shared only with your permission during eligibility and checkout.
              </Typography>
            </Box>
          </Box>
        </Drawer>

        <Box
          sx={{
            position: 'fixed',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Button
            onClick={() => setShowWorkspace((prev) => !prev)}
            variant="contained"
            sx={{
              minWidth: 'unset',
              px: 1.1,
              py: 1.6,
              borderRadius: '16px 0 0 16px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              textTransform: 'none',
              fontWeight: 700,
              letterSpacing: '0.04em',
              boxShadow: '0 12px 28px rgba(24,22,26,0.16)',
              background: showWorkspace
                ? 'linear-gradient(180deg, #cd5b2e 0%, #b44e25 100%)'
                : 'linear-gradient(180deg, #1e6d74 0%, #275a67 100%)',
              '&:hover': {
                background: showWorkspace
                  ? 'linear-gradient(180deg, #c2552c 0%, #a94922 100%)'
                  : 'linear-gradient(180deg, #1b646a 0%, #234f5b 100%)'
              }
            }}
          >
            {showWorkspace ? 'Hide agent steps' : 'Agent steps'}
          </Button>
        </Box>
      </div>
    </div>
  );
}