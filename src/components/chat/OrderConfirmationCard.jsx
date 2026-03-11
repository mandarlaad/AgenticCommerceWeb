import React from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';

function paymentLabel(railPreference) {
  return railPreference === 'card' ? 'Bread Credit Card' : 'Bread Pay';
}

export default function OrderConfirmationCard({
  product,
  artwork,
  order,
  paymentDraft,
  cartDraft,
  currentProfile
}) {
  if (!product) return null;

  const orderNumber =
    order?.orderId ||
    order?.checkoutSessionId ||
    order?.sessionId ||
    `BFH-${String(Date.now()).slice(-6)}`;

  const shippingEta =
    order?.status && /DELIVERED/i.test(order.status)
      ? 'Delivered'
      : 'Arrives in 2–4 business days';

  const amountSpent = Number(product.price || 0);
  const rewardsEarned = currentProfile?.rewardsMember ? Math.round(amountSpent * 2) : Math.round(amountSpent * 1.25);

  return (
    <Paper
      elevation={0}
      sx={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,251,0.98) 100%)',
        border: '1px solid rgba(24,22,26,0.10)',
        borderRadius: '28px',
        p: 2.5,
        display: 'grid',
        gap: 2,
        boxShadow: '0 18px 42px rgba(24,22,26,0.08)'
      }}
    >
      <Box sx={{ display: 'grid', gap: 0.5 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 900, lineHeight: 1.1 }}>
          🎉 Order placed successfully
        </Typography>
        <Typography sx={{ color: '#43505e', lineHeight: 1.6 }}>
          Your financing is approved and your purchase is confirmed.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '180px 1fr' },
          gap: 2,
          alignItems: 'center'
        }}
      >
        <Box
          component="img"
          src={artwork}
          alt={product.name}
          sx={{
            width: '100%',
            height: 140,
            objectFit: 'cover',
            borderRadius: '20px',
            border: '1px solid rgba(24,22,26,0.08)',
            background: '#f7f7f7'
          }}
        />

        <Stack spacing={1}>
          <Typography sx={{ fontSize: 22, fontWeight: 900 }}>
            {product.name}
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip label={`Order #${orderNumber}`} color="secondary" />
            <Chip label={paymentLabel(paymentDraft?.railPreference)} color="primary" />
            <Chip label={shippingEta} variant="outlined" />
          </Stack>

          <Typography sx={{ color: '#43505e' }}>
            Ship to: {cartDraft?.shippingAddress?.line1}, {cartDraft?.shippingAddress?.city}, {cartDraft?.shippingAddress?.region} {cartDraft?.shippingAddress?.postalCode}
          </Typography>
        </Stack>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: '20px',
          border: '1px solid rgba(24,22,26,0.08)',
          background: 'rgba(255,255,255,0.92)'
        }}
      >
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
            Purchase summary
          </Typography>

          <Typography>
            Amount spent: <strong>${amountSpent}</strong>
          </Typography>

          <Typography>
            Financing used:{' '}
            <strong>
              {paymentDraft?.railPreference === 'card'
                ? `Bread Credit Card • ${paymentDraft?.termMonths || 24} months • ${paymentDraft?.apr || '--'}% APR`
                : `Bread Pay • 4 payments of $${paymentDraft?.monthlyAmount || '--'}`}
            </strong>
          </Typography>

          <Typography>
            Rewards earned: <strong>{rewardsEarned} points</strong>
          </Typography>
        </Stack>
      </Paper>
    </Paper>
  );
}