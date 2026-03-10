import React from 'react';
import {
  Box,
  Button,
  Chip,
  MenuItem,
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

function monthlyEstimate(price) {
  const amount = Number(price || 0);
  if (!amount) return null;
  return Math.ceil(amount / 24);
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
            {monthly ? <Chip size="small" color="primary" label={`Pay as low as $${monthly}/mo`} /> : null}
            <Chip size="small" color="secondary" label="Bread Pay available" />
            <Chip size="small" variant="outlined" label="Special financing" />
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
          Guided checkout step
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
        </Box>
      ) : null}

      {stage === 'consent' ? (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            To continue, the assistant needs permission to use shipping, financing, and payment-token details for checkout.
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip size="small" variant="outlined" label="Shipping data" />
            <Chip size="small" variant="outlined" label="Financing data" />
            <Chip size="small" variant="outlined" label="Payment token data" />
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={onGrantConsent}
              disabled={loading}
              variant="contained"
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none'
              }}
            >
              Grant consent
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
              Continue to identity and fraud checks
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
              Continue to payment preparation
            </Button>
          </Box>
        </Box>
      ) : null}

      {stage === 'payment' ? (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            Choose the preferred payment rail and prepare the checkout session.
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.25 }}>
            <Field label="Preferred rail">
              <TextField
                select
                size="small"
                value={paymentDraft.railPreference}
                onChange={(e) => setPaymentDraft((draft) => ({ ...draft, railPreference: e.target.value }))}
              >
                <MenuItem value="bnpl">BNPL</MenuItem>
                <MenuItem value="card">Card</MenuItem>
              </TextField>
            </Field>

            <Field label="Order quantity">
              <TextField size="small" value={String(cartDraft.qty)} disabled />
            </Field>
          </Box>

          <Field label="Customer note">
            <TextField
              size="small"
              value={paymentDraft.detailsLabel}
              onChange={(e) => setPaymentDraft((draft) => ({ ...draft, detailsLabel: e.target.value }))}
            />
          </Field>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip size="small" color="primary" label="Financing offer available" />
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
              Prepare payment and checkout session
            </Button>
          </Box>
        </Box>
      ) : null}

      {stage === 'confirm' ? (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography sx={{ color: '#43505e', lineHeight: 1.55 }}>
            The product, shipping, screening, and tokenized payment are ready. Confirm to complete checkout.
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip size="small" color="primary" label="Ready for payment" />
            <Chip size="small" color="secondary" label="Bread Pay prepared" />
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