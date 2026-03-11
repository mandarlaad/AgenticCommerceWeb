import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import StatPill from '../common/StatPill';
import { palette, typeScale } from '../../lib/theme';

export default function ContractSurfacePanel({ contracts }) {
  if (!contracts.length) {
    return (
      <Typography sx={{ color: palette.muted, lineHeight: 1.65, fontSize: typeScale.bodySm }}>
        Contract target summary appears after the first flow execution.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'grid', gap: 1.15 }}>
      {contracts.map((contract) => (
        <Paper
          key={`${contract.targetName}-${contract.operationId}`}
          elevation={0}
          sx={{
            border: `1px solid ${palette.softLine}`,
            borderRadius: '18px',
            p: 1.6,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,251,253,0.94) 100%)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.25, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: typeScale.label,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: palette.breadCard,
                  fontWeight: 800
                }}
              >
                {contract.targetName}
              </Typography>

              <Typography sx={{ mt: 0.55, fontSize: '1.02rem', fontWeight: 700, color: palette.ink }}>
                {contract.operationId}
              </Typography>
            </Box>

            <StatPill label={contract.surfaceMode || 'direct_http'} compact />
          </Box>

          <Typography sx={{ mt: 1.05, color: palette.muted, wordBreak: 'break-all', lineHeight: 1.6, fontSize: typeScale.bodySm }}>
            {contract.contractPath}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}