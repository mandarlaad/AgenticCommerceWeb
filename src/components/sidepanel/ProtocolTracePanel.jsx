import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import StatPill from '../common/StatPill';
import { palette, typeScale } from '../../lib/theme';

export default function ProtocolTracePanel({ trace, base }) {
  if (!trace.length) {
    return (
      <Typography sx={{ color: palette.muted, lineHeight: 1.65, fontSize: typeScale.bodySm }}>
        Tool and endpoint trace will appear here after the flow starts.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'grid', gap: 1.15 }}>
      {trace.map((entry, index) => (
        <Paper
          key={`${entry.tool}-${index}`}
          elevation={0}
          sx={{
            border: `1px solid ${palette.softLine}`,
            borderRadius: '18px',
            p: 1.6,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,251,253,0.94) 100%)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.25, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: typeScale.label,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: palette.breadCard,
                  fontWeight: 800
                }}
              >
                {entry.tool}
              </Typography>

              <Typography sx={{ mt: 0.55, fontSize: typeScale.bodySm, wordBreak: 'break-all', lineHeight: 1.6, color: palette.ink, fontWeight: 600 }}>
                {entry.method} {String(entry.endpoint || entry.path || '').replace(base, '')}
              </Typography>
            </Box>

            <StatPill label={String(entry.status || entry.statusCode || (entry.ok ? 'OK' : 'ERROR'))} compact />
          </Box>

          {(entry.targetName || entry.operationId) ? (
            <Box sx={{ mt: 1.05, display: 'grid', gap: 0.45 }}>
              {entry.targetName ? (
                <Typography sx={{ fontSize: typeScale.bodySm, color: palette.muted, lineHeight: 1.55 }}>
                  Target: {entry.targetName}
                </Typography>
              ) : null}
              {entry.operationId ? (
                <Typography sx={{ fontSize: typeScale.bodySm, color: palette.muted, lineHeight: 1.55 }}>
                  Operation: {entry.operationId}
                </Typography>
              ) : null}
              {entry.contractPath ? (
                <Typography sx={{ fontSize: typeScale.bodySm, color: palette.muted, lineHeight: 1.55, wordBreak: 'break-all' }}>
                  Contract: {entry.contractPath}
                </Typography>
              ) : null}
              {entry.surfaceMode ? (
                <Typography sx={{ fontSize: typeScale.bodySm, color: palette.muted, lineHeight: 1.55 }}>
                  Transport: {entry.surfaceMode}
                </Typography>
              ) : null}
            </Box>
          ) : null}

          {entry.idempotencyKey ? (
            <Typography sx={{ mt: 1.05, fontSize: typeScale.bodySm, color: palette.muted, lineHeight: 1.55, wordBreak: 'break-all' }}>
              Idempotency-Key: {entry.idempotencyKey}
            </Typography>
          ) : null}

          <Typography sx={{ mt: 1.05, fontSize: typeScale.micro, color: '#7C8795', fontWeight: 700 }}>
            {entry.at}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}