import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import StatPill from '../common/StatPill';

export default function RouteSummaryCard({ routeMode, orderStatus, plannerStatus, bareBonesUi = false }) {
  return (
    <Paper
      elevation={0}
      sx={{
        background: '#ffffff',
        border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.10)',
        borderRadius: bareBonesUi ? '4px' : '20px',
        p: 1.75
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: 'text.secondary',
          letterSpacing: '0.16em',
          fontWeight: 700
        }}
      >
        Active route
      </Typography>

      <Typography sx={{ mt: 1, fontSize: 18, lineHeight: 1.45, fontWeight: 600 }}>
        {routeMode === 'agentcore'
          ? 'Chat surface → AgentCore runtime → Gateway contracts → confirmation'
          : 'Chat surface → ACP checkout sessions → FSP tools → confirmation'}
      </Typography>

      <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.5 }}>
        This panel summarizes the current execution path and outcome signals for the order journey.
      </Typography>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.5 }}>
        <StatPill label={orderStatus || 'Idle'} compact />
        <StatPill label={plannerStatus || 'Awaiting planner'} compact />
      </Stack>
    </Paper>
  );
}