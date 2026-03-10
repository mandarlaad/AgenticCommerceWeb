import React from 'react';
import StatPill from '../common/StatPill';
import { palette } from '../../lib/theme';

function Field({ label, children }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontFamily: '"Avenir Next", Avenir, Helvetica, Arial, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: palette.slate }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      style={{
        padding: '11px 13px',
        borderRadius: 14,
        border: `1px solid ${palette.line}`,
        background: 'rgba(248,250,250,0.94)',
        fontSize: 14,
        boxSizing: 'border-box',
        width: '100%',
        color: palette.ink,
        fontFamily: '"Avenir Next", Avenir, Helvetica, Arial, sans-serif',
        ...(props.style || {})
      }}
    />
  );
}

function actionButtonStyle(bareBonesUi, tone) {
  const tones = {
    teal: `linear-gradient(135deg, ${palette.teal} 0%, ${palette.tealDeep} 100%)`,
    slate: 'linear-gradient(135deg, #54777d 0%, #36555d 100%)'
  };
  return {
    justifySelf: 'start',
    padding: '10px 14px',
    borderRadius: bareBonesUi ? 4 : 999,
    border: bareBonesUi ? '1px solid #bdbdbd' : 'none',
    background: bareBonesUi ? '#f2f2f2' : tones[tone] || tones.slate,
    color: bareBonesUi ? '#111111' : '#f5efe4',
    cursor: 'pointer',
    fontWeight: 600,
    boxShadow: bareBonesUi ? 'none' : '0 12px 24px rgba(37,108,115,0.18)'
  };
}

export default function StageActionCard({
  bareBonesUi = false,
  stage,
  options,
  cartDraft,
  setCartDraft,
  paymentDraft,
  setPaymentDraft,
  screening,
  loading,
  onSelectProduct,
  onGrantConsent,
  onContinueToScreening,
  onContinueToPayment,
  onPreparePayment,
  onConfirmCheckout
}) {
  if (!stage || stage === 'idle' || stage === 'complete') return null;

  return (
    <div
      style={{
        justifySelf: 'start',
        width: '100%',
        maxWidth: '92%',
        background: bareBonesUi
          ? '#ffffff'
          : 'linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(242,249,249,0.94) 100%)',
        border: bareBonesUi ? '1px solid #d0d0d0' : `1px solid ${palette.line}`,
        borderRadius: bareBonesUi ? 4 : 22,
        padding: 16,
        display: 'grid',
        gap: 14,
        boxShadow: bareBonesUi ? 'none' : '0 14px 28px rgba(18,32,43,0.06)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: palette.ink }}>Guided checkout step</div>
        <StatPill label={stage.replace('_', ' ')} />
      </div>

      {stage === 'options' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          {options.map((option) => (
            <button
              key={option.sku}
              onClick={() => onSelectProduct(option)}
              disabled={loading}
              style={{
                textAlign: 'left',
                padding: '13px 14px',
                borderRadius: bareBonesUi ? 4 : 18,
                border: bareBonesUi ? '1px solid #cccccc' : `1px solid ${palette.line}`,
                background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(247,250,250,0.94) 100%)',
                cursor: 'pointer',
                boxShadow: bareBonesUi ? 'none' : '0 10px 20px rgba(18,32,43,0.04)'
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: palette.ink }}>{option.name}</div>
              <div style={{ color: palette.slate }}>SKU {option.sku} · ${option.price}</div>
            </button>
          ))}
        </div>
      ) : null}

      {stage === 'consent' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ color: palette.slate, lineHeight: 1.45 }}>Approve the data-sharing scopes required to continue into merchant checkout and financing.</div>
          <button onClick={onGrantConsent} disabled={loading} style={actionButtonStyle(bareBonesUi, 'teal')}>
            Grant consent
          </button>
        </div>
      ) : null}

      {stage === 'cart' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 10 }}>
            <Field label="Quantity">
              <Input
                type="number"
                min="1"
                value={cartDraft.qty}
                onChange={(e) => setCartDraft((draft) => ({ ...draft, qty: Math.max(1, Number(e.target.value || 1)) }))}
              />
            </Field>
            <Field label="Street address">
              <Input
                value={cartDraft.shippingAddress.line1}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, line1: e.target.value }
                  }))
                }
              />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(160px,1.2fr) 90px 120px', gap: 10 }}>
            <Field label="City">
              <Input
                value={cartDraft.shippingAddress.city}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, city: e.target.value }
                  }))
                }
              />
            </Field>
            <Field label="State">
              <Input
                value={cartDraft.shippingAddress.region}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, region: e.target.value }
                  }))
                }
              />
            </Field>
            <Field label="Postal code">
              <Input
                value={cartDraft.shippingAddress.postalCode}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, postalCode: e.target.value }
                  }))
                }
              />
            </Field>
          </div>
          <button onClick={onContinueToScreening} disabled={loading} style={actionButtonStyle(bareBonesUi, 'slate')}>
            Continue to identity and fraud checks
          </button>
        </div>
      ) : null}

      {stage === 'screening' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <StatPill label={screening?.identityStatus || 'Pending'} compact />
            <StatPill label={screening?.fraudStatus || 'Pending'} compact />
          </div>
          <div style={{ color: palette.slate, lineHeight: 1.45 }}>
            {screening?.recommendation || 'Identity and fraud signals will appear here.'}
          </div>
          <button onClick={onContinueToPayment} disabled={loading} style={actionButtonStyle(bareBonesUi, 'slate')}>
            Continue to payment preparation
          </button>
        </div>
      ) : null}

      {stage === 'payment' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Preferred rail">
              <select
                value={paymentDraft.railPreference}
                onChange={(e) => setPaymentDraft((draft) => ({ ...draft, railPreference: e.target.value }))}
                style={{ padding: '11px 13px', borderRadius: 14, border: `1px solid ${palette.line}`, background: 'rgba(248,250,250,0.94)', fontSize: 14, color: palette.ink, fontFamily: '"Avenir Next", Avenir, Helvetica, Arial, sans-serif' }}
              >
                <option value="bnpl">BNPL</option>
                <option value="card">Card</option>
              </select>
            </Field>
            <Field label="Order quantity">
              <Input value={String(cartDraft.qty)} disabled />
            </Field>
          </div>
          <Field label="Customer note">
            <Input
              value={paymentDraft.detailsLabel}
              onChange={(e) => setPaymentDraft((draft) => ({ ...draft, detailsLabel: e.target.value }))}
            />
          </Field>
          <button onClick={onPreparePayment} disabled={loading} style={actionButtonStyle(bareBonesUi, 'teal')}>
            Prepare payment and checkout session
          </button>
        </div>
      ) : null}

      {stage === 'confirm' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ color: palette.slate, lineHeight: 1.45 }}>
            The product, shipping, screening, and tokenized payment are ready. Confirm to complete checkout.
          </div>
          <button onClick={onConfirmCheckout} disabled={loading} style={actionButtonStyle(bareBonesUi, 'slate')}>
            Confirm order and complete checkout
          </button>
        </div>
      ) : null}
    </div>
  );
}

