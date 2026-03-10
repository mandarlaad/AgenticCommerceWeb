import React from 'react';
import StatPill from '../common/StatPill';
import { palette } from '../../lib/theme';

export default function RouteSummaryCard({ routeMode, orderStatus, plannerStatus, bareBonesUi = false }) {
  const label = routeMode === 'agentcore'
    ? 'Chat surface -> AgentCore runtime -> Gateway contracts -> confirmation'
    : 'Chat surface -> ACP checkout sessions -> FSP tools -> confirmation';

  return (
    <div
      style={{
        background: bareBonesUi
          ? '#ffffff'
          : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(240,248,248,0.92) 100%)',
        border: bareBonesUi ? '1px solid #d0d0d0' : `1px solid ${palette.line}`,
        borderRadius: bareBonesUi ? 4 : 22,
        padding: bareBonesUi ? 14 : 18,
        boxShadow: bareBonesUi ? 'none' : '0 14px 34px rgba(18,32,43,0.08)'
      }}
    >
      <div
        style={{
          fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: palette.slate,
          marginBottom: 10
        }}
      >
        Active route
      </div>
      <div
        style={{
          fontSize: bareBonesUi ? 17 : 19,
          lineHeight: 1.45,
          fontWeight: 600,
          color: palette.ink,
          maxWidth: 560
        }}
      >
        {label}
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <StatPill label={orderStatus || 'Idle'} compact />
        <StatPill label={plannerStatus || 'Awaiting planner'} compact />
      </div>
    </div>
  );
}

