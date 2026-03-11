import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import StatPill from '../common/StatPill';
import { palette, typeScale } from '../../lib/theme';

export default function StateCard({ title, status, lines, emphasis = false, bareBonesUi = false }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: emphasis ? 1.8 : 1.55,
        borderRadius: bareBonesUi ? '6px' : '18px',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,251,253,0.94) 100%)',
        border: bareBonesUi
          ? '1px solid #d0d0d0'
          : emphasis
            ? '1px solid rgba(28,129,149,0.16)'
            : `1px solid ${palette.softLine}`,
        boxShadow: emphasis ? '0 10px 22px rgba(15,23,42,0.05)' : 'none'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <Typography
          sx={{
            fontSize: emphasis ? typeScale.title : '1.08rem',
            fontWeight: emphasis ? 800 : 700,
            color: palette.ink
          }}
        >
          {title}
        </Typography>
        <StatPill label={status} compact />
      </Box>

      <Box sx={{ mt: 1.1, display: 'grid', gap: 0.55 }}>
        {lines.filter(Boolean).map((line, index) => (
          <Typography
            key={`${title}-${index}`}
            sx={{
              color: palette.muted,
              lineHeight: 1.6,
              fontSize: typeScale.bodySm,
              fontWeight: 500
            }}
          >
            {line}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}