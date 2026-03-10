import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import StatPill from '../common/StatPill';
import { productArtwork } from '../../lib/planning';

function Field({ label, children }) {
  return (
    <Box sx={{ display: 'grid', gap: 0.75 }}>
      <Typography
        sx={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#43505e',
          fontWeight: 700
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function monthlyEstimate(price, months = 24) {
  const amount = Number(price || 0);
  if (!amount) return null;
  return Math.ceil(amount / months);
}

function breadPayEstimate(price) {
  const amount = Number(price || 0);
  if (!amount) return null;
  return Math.ceil(amount / 4);
}

function randomApr() {
  const aprs = [14.99, 16.99, 18.99, 20.99, 22.99];
  return aprs[Math.floor(Math.random() * aprs.length)];
}

function randomTerm() {
  const terms = [12, 18, 24];
  return terms[Math.floor(Math.random() * terms.length)];
}

function OptionCard({ option, onSelectProduct, loading, bareBonesUi }) {
  const monthly = monthlyEstimate(option.price);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: bareBonesUi ? '4px' : '18px',
        border: bareBonesUi ? '1px solid #cccccc' : '1px solid rgba(24,22,26,0.10)',
        background: '#ffffff',
        p: 1.5,
        display: 'grid',
        gap: 1.25
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '120px 1fr' },
          gap: 1.5,
          alignItems: 'center'
        }}
      >
        <Box
          component="img"
          src={productArtwork(option)}
          alt={option.name}
          sx={{
            width: '100%',
            height: 96,
            objectFit: 'cover',
            borderRadius: '14px',
            border: '1px solid rgba(24,22,26,0.08)',
            background: '#f7f7f7'
          }}
        />

        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'start', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'grid', gap: 0.35 }}>
              <Typography sx={{ fontSize: 17, fontWeight: 700, lineHeight: 1.25 }}>
                {option.name}
              </Typography>
              <Typography sx={{ color: '#5b6670', fontSize: 13 }}>
                SKU {option.sku} {option.category ? `• ${option.category}` : ''}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 24, fontWeight: 800, color: '#b5522c', lineHeight: 1 }}>
              ${option.price}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {monthly ? <Chip size="small" color="secondary" label={`Bread Credit Card from $${monthly}/mo`} /> : null}
            <Chip size="small" color="primary" label="Bread Pay available" />
            <Chip size="small" variant="outlined" label="Prequalify" />
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => onSelectProduct(option)}
              disabled={loading}
              variant="contained"
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none'
              }}
            >
              Continue with this item
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

function ConsentBullet({ title, body }) {
  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: '14px',
        border: '1px solid rgba(24,22,26,0.08)',
        background: 'rgba(255,255,255,0.86)'
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 14.5, mb: 0.35 }}>
        {title}
      </Typography>
      <Typography sx={{ color: '#5b6670', lineHeight: 1.45, fontSize: 13.5 }}>
        {body}
      </Typography>
    </Box>
  );
}

function OfferCard({ title, subtext, chipText, onClick, primary = false }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: '18px',
        border: primary ? '1px solid rgba(30,109,116,0.26)' : '1px solid rgba(24,22,26,0.10)',
        background: primary ? 'linear-gradient(135deg, rgba(30,109,116,0.08) 0%, rgba(255,255,255,1) 100%)' : '#ffffff',
        display: 'grid',
        gap: 1
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 800 }}>
          {title}
        </Typography>
        <Chip size="small" color={primary ? 'secondary' : 'primary'} label={chipText} />
      </Box>

      <Typography sx={{ color: '#43505e', lineHeight: 1.5 }}>
        {subtext}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          onClick={onClick}
          variant="contained"
          sx={{
            borderRadius: '999px',
            textTransform: 'none',
            fontWeight: 700,
            boxShadow: 'none'
          }}
        >
          Choose this offer
        </Button>
      </Box>
    </Paper>
  );
}

export default function StageActionCard({
  bareBonesUi = false,
  stage,
  options,
  product,
  currentProfile,
  cartDraft,
  setCartDraft,
  paymentDraft,
  setPaymentDraft,
  screening,
  loading,
  onSelectProduct,
  onGrantConsent,
  onSelectFinancingOffer,
  onContinueAfterSms,
  onContinueToScreening,
  onContinueToPayment,
  onPreparePayment,
  onConfirmCheckout
}) {
  const [allowEligibility, setAllowEligibility] = useState(false);
  const [allowMarketing, setAllowMarketing] = useState(true);
  const [allowSms, setAllowSms] = useState(false);
  const [offerSet, setOfferSet] = useState(null);

  useEffect(() => {
    if (stage === 'consent') {
      setAllowEligibility(false);
      setAllowMarketing(true);
    }
    if (stage === 'sms') {
      setAllowSms(false);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'offers' && product) {
      const termMonths = randomTerm();
      const apr = randomApr();
      const creditMonthly = monthlyEstimate(product.price, termMonths);
      const breadPayAmount = breadPayEstimate(product.price);

      setOfferSet({
        card: {
          type: 'card',
          label: 'Bread Credit Card selected',
          apr,
          termMonths,
          monthlyAmount: creditMonthly
        },
        breadPay: {
          type: 'bnpl',
          label: 'Bread Pay selected',
          apr: 0,
          termMonths: 4,
          monthlyAmount: breadPayAmount
        }
      });
    }
  }, [stage, product]);

if (!stage || stage === 'idle' || stage === 'complete') return null;

  return (
    <Paper
      elevation={0}
      sx={{
        justifySelf: 'start',
        width: '100%',
        maxWidth: '92%',
        background: '#ffffff',
        border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.10)',
        borderRadius: bareBonesUi ? '4px' : '22px',
        p: 1.75,
        display: 'grid',
        gap: 1.5,
        boxShadow: bareBonesUi ? 'none' : '0 14px 30px rgba(24,22,26,0.05)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Continue your purchase
        </Typography>
        <StatPill label={stage.replace('_', ' ')} />
      </Box>

      {stage === 'options' ? (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.5 }}>
            I found a shortlist of matching products. Pick one to continue the financing and checkout flow.
          </Typography>

          <Box sx={{ display: 'grid', gap: 1.25 }}>
            {options.map((option) => (
              <OptionCard
                key={option.sku}
                option={option}
                onSelectProduct={onSelectProduct}
                loading={loading}
                bareBonesUi={bareBonesUi}
              />
            ))}
          </Box>

          <Alert severity="info" sx={{ borderRadius: '16px' }}>
            <Typography sx={{ fontWeight: 600 }}>
              Prequalify in seconds. Checking eligibility won’t affect your credit score.
            </Typography>
          </Alert>
        </Box>
      ) : null}

      {stage === 'consent' ? (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Box sx={{ display: 'grid', gap: 0.5 }}>
            <Typography sx={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2 }}>
              Review permissions to check your offers
            </Typography>
            <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
              To check your available financing offers, we need your permission to use basic shopper details.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gap: 1 }}>
            <ConsentBullet
              title="Information used for eligibility"
              body="We’ll use details like your name, email, phone number, and address to check available financing offers for this purchase."
            />
            <ConsentBullet
              title="Marketing preferences"
              body="You can also allow marketing communications so relevant offers and future updates can be shared with you later."
            />

            {currentProfile ? (
              <Paper
                elevation={0}
                sx={{
                  p: 1.25,
                  borderRadius: '14px',
                  border: '1px solid rgba(24,22,26,0.08)',
                  background: 'rgba(255,255,255,0.92)'
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: 14.5, mb: 0.75 }}>
                  Profile details to be shared with your permission
                </Typography>

                <Stack spacing={0.5}>
                  <Typography sx={{ color: '#5b6670', fontSize: 13.5 }}>
                    <strong>Name:</strong> {currentProfile.firstName} {currentProfile.lastName}
                  </Typography>
                  <Typography sx={{ color: '#5b6670', fontSize: 13.5 }}>
                    <strong>Email:</strong> {currentProfile.email}
                  </Typography>
                  <Typography sx={{ color: '#5b6670', fontSize: 13.5 }}>
                    <strong>Phone:</strong> {currentProfile.phone}
                  </Typography>
                  <Typography sx={{ color: '#5b6670', fontSize: 13.5 }}>
                    <strong>Address:</strong> {currentProfile.shippingAddress.line1}, {currentProfile.shippingAddress.city}, {currentProfile.shippingAddress.region} {currentProfile.shippingAddress.postalCode}
                  </Typography>
                </Stack>
              </Paper>
            ) : null}
          </Box>

          <Box
            sx={{
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(30,109,116,0.08) 0%, rgba(205,91,46,0.08) 100%)',
              border: '1px solid rgba(24,22,26,0.08)',
              p: 1.25
            }}
          >
            <Stack spacing={0.5}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allowEligibility}
                    onChange={(e) => setAllowEligibility(e.target.checked)}
                  />
                }
                label="I allow my information to be used to check available financing offers."
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={allowMarketing}
                    onChange={(e) => setAllowMarketing(e.target.checked)}
                  />
                }
                label="I’d like to receive marketing communications and future offer updates. (Optional)"
              />
            </Stack>
          </Box>

          <Alert severity="success" sx={{ borderRadius: '16px' }}>
            <Typography sx={{ fontWeight: 600 }}>
              Checking eligibility is quick and won’t affect your credit score.
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={onGrantConsent}
              disabled={loading || !allowEligibility}
              variant="contained"
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none',
                px: 2.25
              }}
            >
              Check my offers
            </Button>
          </Box>
        </Box>
      ) : null}

      {stage === 'offers' && offerSet ? (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            Here are the financing options available for this purchase. Choose the one you want to continue with.
          </Typography>

          <OfferCard
            title="Bread Credit Card"
            chipText={`from $${offerSet.card.monthlyAmount}/mo`}
            subtext={`${offerSet.card.termMonths} monthly payments at ${offerSet.card.apr}% APR for this purchase.`}
            primary
            onClick={() => onSelectFinancingOffer(offerSet.card)}
          />

          <OfferCard
            title="Bread Pay"
            chipText={`4 payments of $${offerSet.breadPay.monthlyAmount}`}
            subtext="Split your purchase into four payments with a shorter-term pay-over-time option."
            onClick={() => onSelectFinancingOffer(offerSet.breadPay)}
          />
        </Box>
      ) : null}

      {stage === 'sms' ? (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            To continue with {paymentDraft.railPreference === 'card' ? 'Bread Credit Card' : 'Bread Pay'}, we’ll send a secure verification link to your phone.
          </Typography>

          <Alert severity="info" sx={{ borderRadius: '16px' }}>
            <Typography sx={{ fontWeight: 600 }}>
              This secure link helps confirm your identity, validate the device, and continue the financing request.
            </Typography>
          </Alert>

          <FormControlLabel
            control={
              <Checkbox
                checked={allowSms}
                onChange={(e) => setAllowSms(e.target.checked)}
              />
            }
            label="I agree to receive a one-time secure verification link by SMS."
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={onContinueAfterSms}
              disabled={!allowSms || loading}
              variant="contained"
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none'
              }}
            >
              Send secure link
            </Button>
          </Box>
        </Box>
      ) : null}

      {stage === 'cart' ? (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            Confirm the order quantity and delivery destination before identity and fraud screening.
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '120px 1fr' }, gap: 1.25 }}>
            <Field label="Quantity">
              <TextField
                type="number"
                size="small"
                inputProps={{ min: 1 }}
                value={cartDraft.qty}
                onChange={(e) => setCartDraft((draft) => ({ ...draft, qty: Math.max(1, Number(e.target.value || 1)) }))}
              />
            </Field>

            <Field label="Street address">
              <TextField
                size="small"
                value={cartDraft.shippingAddress.line1}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, line1: e.target.value }
                  }))
                }
              />
            </Field>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'minmax(160px,1.2fr) 90px 120px' }, gap: 1.25 }}>
            <Field label="City">
              <TextField
                size="small"
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
              <TextField
                size="small"
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
              <TextField
                size="small"
                value={cartDraft.shippingAddress.postalCode}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, postalCode: e.target.value }
                  }))
                }
              />
            </Field>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={onContinueToScreening}
              disabled={loading}
              variant="contained"
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none'
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      ) : null}

      {stage === 'screening' ? (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            Screening results are ready. Review the shopper verification status before payment preparation.
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <StatPill label={screening?.identityStatus || 'Pending'} compact />
            <StatPill label={screening?.fraudStatus || 'Pending'} compact />
          </Stack>

          <Typography sx={{ color: '#43505e', lineHeight: 1.5 }}>
            {screening?.recommendation || 'Identity and fraud signals will appear here.'}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={onContinueToPayment}
              disabled={loading}
              variant="contained"
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none'
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      ) : null}

      {stage === 'approved' && product ? (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 800 }}>
            🎉 You're approved
          </Typography>

          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            Your financing offer is ready. Review your order and complete your purchase.
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '18px',
              border: '1px solid rgba(24,22,26,0.10)',
              background: '#ffffff'
            }}
          >
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 700 }}>
                {product.name}
              </Typography>

              <Typography sx={{ fontSize: 22, fontWeight: 800 }}>
                ${product.price}
              </Typography>

              <Typography sx={{ color: '#43505e' }}>
                {paymentDraft.railPreference === 'card'
                  ? `${paymentDraft.termMonths || 24} monthly payments starting around $${paymentDraft.monthlyAmount || '--'}`
                  : `4 payments of $${paymentDraft.monthlyAmount || '--'} with Bread Pay`}
              </Typography>
            </Stack>
          </Paper>

          <Button
            onClick={onConfirmCheckout}
            variant="contained"
            sx={{
              borderRadius: '999px',
              textTransform: 'none',
              fontWeight: 700,
              boxShadow: 'none'
            }}
          >
            Complete purchase
          </Button>
        </Box>
      ) : null}

      {stage === 'payment' ? (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            {paymentDraft.railPreference === 'card'
              ? `You selected Bread Credit Card with ${paymentDraft.termMonths || '--'} months financing at ${paymentDraft.apr || '--'}% APR.`
              : `You selected Bread Pay with estimated payments of $${paymentDraft.monthlyAmount || '--'} over 4 payments.`}
          </Typography>

          <Field label="Selected payment option">
            <TextField
              size="small"
              value={paymentDraft.railPreference === 'card' ? 'Bread Credit Card' : 'Bread Pay'}
              disabled
            />
          </Field>

          <Field label="Customer note">
            <TextField
              size="small"
              value={paymentDraft.detailsLabel}
              onChange={(e) => setPaymentDraft((draft) => ({ ...draft, detailsLabel: e.target.value }))}
            />
          </Field>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip size="small" color="secondary" label="Bread Credit Card available" />
            <Chip size="small" color="primary" label="Bread Pay available" />
            <Chip size="small" variant="outlined" label="Tokenized checkout" />
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={onPreparePayment}
              disabled={loading}
              variant="contained"
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none'
              }}
            >
              Prepare checkout
            </Button>
          </Box>
        </Box>
      ) : null}

      {stage === 'confirm' ? (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            Everything is ready. Confirm to complete your purchase.
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip size="small" color="secondary" label="Bread Credit Card ready" />
            <Chip size="small" color="primary" label="Bread Pay ready" />
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={onConfirmCheckout}
              disabled={loading}
              variant="contained"
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none'
              }}
            >
              Confirm order and complete checkout
            </Button>
          </Box>
        </Box>
      ) : null}
    </Paper>
  );
}