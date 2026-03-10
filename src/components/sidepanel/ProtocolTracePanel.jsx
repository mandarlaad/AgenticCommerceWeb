import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import StatPill from '../common/StatPill';

export default function ProtocolTracePanel({ trace, base }) {
  if (!trace.length) {
    return (
      <Typography sx={{ color: 'rgba(24,22,26,0.65)', lineHeight: 1.5 }}>
        Tool and endpoint trace will appear here after the flow starts.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'grid', gap: 1.25 }}>
      {trace.map((entry, index) => (
        <Paper
          key={`${entry.tool}-${index}`}
          elevation={0}
          sx={{
            border: '1px solid rgba(24,22,26,0.10)',
            borderRadius: '16px',
            p: 1.5,
            background: 'rgba(255,255,255,0.9)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.25, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#43505e',
                  fontWeight: 700
                }}
              >
                {entry.tool}
              </Typography>

              <Typography sx={{ mt: 0.5, fontSize: 14, wordBreak: 'break-all', lineHeight: 1.45 }}>
                {entry.method} {String(entry.endpoint || entry.path || '').replace(base, '')}
              </Typography>
            </Box>

            <StatPill label={String(entry.status || entry.statusCode || (entry.ok ? 'OK' : 'ERROR'))} compact />
          </Box>

          {(entry.targetName || entry.operationId) ? (
            <Box sx={{ mt: 1, display: 'grid', gap: 0.35 }}>
              {entry.targetName ? (
                <Typography sx={{ fontSize: 11.5, color: '#43505e', lineHeight: 1.4 }}>
                  Target: {entry.targetName}
                </Typography>
              ) : null}
              {entry.operationId ? (
                <Typography sx={{ fontSize: 11.5, color: '#43505e', lineHeight: 1.4 }}>
                  Operation: {entry.operationId}
                </Typography>
              ) : null}
              {entry.contractPath ? (
                <Typography sx={{ fontSize: 11.5, color: '#43505e', lineHeight: 1.4, wordBreak: 'break-all' }}>
                  Contract: {entry.contractPath}
                </Typography>
              ) : null}
              {entry.surfaceMode ? (
                <Typography sx={{ fontSize: 11.5, color: '#43505e', lineHeight: 1.4 }}>
                  Transport: {entry.surfaceMode}
                </Typography>
              ) : null}
            </Box>
          ) : null}

          {entry.idempotencyKey ? (
            <Typography sx={{ mt: 1, fontSize: 11.5, color: '#43505e', lineHeight: 1.4, wordBreak: 'break-all' }}>
              Idempotency-Key: {entry.idempotencyKey}
            </Typography>
          ) : null}

          <Typography sx={{ mt: 1, fontSize: 11, color: '#6c7882', fontWeight: 600 }}>
            {entry.at}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}