import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import StatPill from '../common/StatPill';

export default function ContractSurfacePanel({ contracts }) {
  if (!contracts.length) {
    return (
      <Typography sx={{ color: 'rgba(24,22,26,0.65)', lineHeight: 1.5 }}>
        Contract target summary appears after the first flow execution.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'grid', gap: 1.25 }}>
      {contracts.map((contract) => (
        <Paper
          key={`${contract.targetName}-${contract.operationId}`}
          elevation={0}
          sx={{
            border: '1px solid rgba(24,22,26,0.10)',
            borderRadius: '16px',
            p: 1.5,
            background: 'rgba(255,255,255,0.9)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.25, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#43505e',
                  fontWeight: 700
                }}
              >
                {contract.targetName}
              </Typography>

              <Typography sx={{ mt: 0.5, fontSize: 15, fontWeight: 600 }}>
                {contract.operationId}
              </Typography>
            </Box>

            <StatPill label={contract.surfaceMode || 'direct_http'} compact />
          </Box>

          <Typography sx={{ mt: 1, color: 'rgba(24,22,26,0.72)', wordBreak: 'break-all', lineHeight: 1.45 }}>
            {contract.contractPath}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}