import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import StatPill from '../common/StatPill';
import { palette, typeScale } from '../../lib/theme';

export default function RouteSummaryCard({ routeMode, orderStatus, plannerStatus, bareBonesUi = false }) {
  return (
    <Paper
      elevation={0}
      sx={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(246,250,253,0.92) 100%)',
        border: `1px solid ${palette.softLine}`,
        borderRadius: bareBonesUi ? '6px' : '22px',
        p: 2,
        boxShadow: '0 12px 24px rgba(15,23,42,0.05)'
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: palette.breadCard,
          letterSpacing: '0.16em',
          fontWeight: 800,
          fontSize: typeScale.label
        }}
      >
        Active route
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: typeScale.title,
          lineHeight: 1.55,
          fontWeight: 800,
          color: palette.ink
        }}
      >
        {routeMode === 'agentcore'
          ? 'Chat surface → AgentCore runtime → Gateway contracts → confirmation'
          : 'Chat surface → ACP checkout sessions → FSP tools → confirmation'}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: palette.muted,
          lineHeight: 1.65,
          fontSize: typeScale.bodySm,
          fontWeight: 500
        }}
      >
        This panel summarizes the current execution path and outcome signals for the order journey.
      </Typography>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.75 }}>
        <StatPill label={orderStatus || 'Idle'} compact />
        <StatPill label={plannerStatus || 'Awaiting planner'} compact />
      </Stack>
    </Paper>
  );
}