import React from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import StatPill from '../common/StatPill';

function monthlyEstimate(price) {
  const amount = Number(price || 0);
  if (!amount) return null;
  return Math.ceil(amount / 24);
}

export default function ProductInlineCard({ product, summary, artwork, minimalUi, routeMode, planState, bareBonesUi = false }) {
  if (!product) return null;

  const monthly = monthlyEstimate(product.price);

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
        p: minimalUi ? 1.5 : 2,
        boxShadow: bareBonesUi ? 'none' : '0 14px 30px rgba(24,22,26,0.05)'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: bareBonesUi ? '1fr' : minimalUi ? '132px 1fr' : '168px 1fr',
          gap: 2,
          alignItems: 'center'
        }}
      >
        {!bareBonesUi ? (
          <Box
            component="img"
            src={artwork}
            alt={product.name}
            sx={{
              width: '100%',
              height: minimalUi ? 104 : 128,
              objectFit: 'cover',
              borderRadius: '18px',
              border: '1px solid rgba(24,22,26,0.08)',
              background: '#f7f7f7'
            }}
          />
        ) : null}

        <Box sx={{ display: 'grid', gap: 0.75 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.25, alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: minimalUi ? 24 : 28, fontWeight: 800, lineHeight: 1.12 }}>
              {product.name}
            </Typography>
            <StatPill label={product.category || 'Uncategorized'} compact />
          </Box>

          <Typography sx={{ fontSize: 12, color: '#5b6670', fontWeight: 500 }}>
            SKU {product.sku} {product.category ? `• ${product.category}` : ''}
          </Typography>

          <Stack direction="row" spacing={1.25} alignItems="baseline" flexWrap="wrap">
            <Typography sx={{ fontSize: minimalUi ? 30 : 36, fontWeight: 900, color: '#E47A44', lineHeight: 1 }}>
              ${product.price}
            </Typography>
            {monthly ? (
              <Typography sx={{ fontSize: 14, color: '#43505e', fontWeight: 600 }}>
                or pay as low as ${monthly}/mo
              </Typography>
            ) : null}
          </Stack>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ pt: 0.35 }}>
            {monthly ? (
              <Chip
                size="small"
                label={`Bread Credit Card from $${monthly}/mo`}
                sx={{
                  background: '#1C8195',
                  color: '#fff',
                  fontWeight: 800
                }}
              />
            ) : null}
            <Chip
              size="small"
              label="Bread Pay available"
              sx={{
                background: '#13294B',
                color: '#fff',
                fontWeight: 800
              }}
            />
            <Chip size="small" variant="outlined" label="Selected for checkout" />
          </Stack>

          {summary ? (
            <Typography sx={{ color: 'rgba(24,22,26,0.72)', lineHeight: 1.5, pt: 0.5 }}>
              {summary}
            </Typography>
          ) : null}

          {routeMode === 'agentcore' && planState ? (
            <Typography sx={{ fontSize: 11, color: '#6a7680', fontWeight: 500, pt: 0.25 }}>
              Planner: {planState.source}
              {planState.plannerModelId ? ` • ${planState.plannerModelId.split('/').slice(-1)[0]}` : ''}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Paper>
  );
}