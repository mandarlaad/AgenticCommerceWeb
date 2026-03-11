import React from 'react';
import { Box, Typography } from '@mui/material';
import { palette } from '../../lib/theme';

function statusTone(status) {
  if (!status) return { bg: '#EAF0F6', fg: palette.ink };
  if (/CONFIRMED|CAPTURED|DELIVERED|GRANTED|VERIFIED|CLEAR/i.test(status)) {
    return { bg: 'rgba(77,107,87,0.16)', fg: palette.moss };
  }
  if (/READY|AUTHORIZED|CREATED|PENDING|OPEN|MATCHED|BNPL|REVIEW|SHOWING/i.test(status)) {
    return { bg: 'rgba(28,129,149,0.14)', fg: palette.breadCard };
  }
  if (/DECLINED|FAILED|ERROR/i.test(status)) {
    return { bg: 'rgba(240,138,75,0.16)', fg: palette.accent };
  }
  return { bg: '#EAF0F6', fg: palette.ink };
}

export default function StatPill({ label, compact = false }) {
  const tone = statusTone(label);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: compact ? 1.25 : 1.55,
        py: compact ? 0.72 : 0.92,
        borderRadius: '999px',
        background: tone.bg,
        color: tone.fg,
        whiteSpace: 'nowrap',
        border: '1px solid rgba(15,23,42,0.04)'
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: tone.fg,
          flex: '0 0 auto'
        }}
      />

      <Typography
        sx={{
          fontSize: compact ? '0.76rem' : '0.82rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 800,
          lineHeight: 1
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}