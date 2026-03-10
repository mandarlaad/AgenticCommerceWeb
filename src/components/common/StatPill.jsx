import React from 'react';
import { Box, Typography } from '@mui/material';
import { palette } from '../../lib/theme';

function statusTone(status) {
  if (!status) return { bg: '#efe4cf', fg: palette.ink };
  if (/CONFIRMED|CAPTURED|DELIVERED|GRANTED|VERIFIED|CLEAR/i.test(status)) {
    return { bg: 'rgba(77,107,87,0.18)', fg: palette.moss };
  }
  if (/READY|AUTHORIZED|CREATED|PENDING|OPEN|MATCHED|BNPL|REVIEW|SHOWING/i.test(status)) {
    return { bg: 'rgba(30,109,116,0.16)', fg: palette.teal };
  }
  if (/DECLINED|FAILED|ERROR/i.test(status)) {
    return { bg: 'rgba(205,91,46,0.18)', fg: palette.ember };
  }
  return { bg: '#efe4cf', fg: palette.ink };
}

export default function StatPill({ label, compact = false }) {
  const tone = statusTone(label);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: compact ? 1.15 : 1.4,
        py: compact ? 0.6 : 0.8,
        borderRadius: '999px',
        background: tone.bg,
        color: tone.fg,
        whiteSpace: 'nowrap',
        border: '1px solid rgba(24,22,26,0.04)'
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
          fontSize: compact ? 11 : 12,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 700,
          lineHeight: 1
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}