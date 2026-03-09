import React from 'react';
import StatPill from '../common/StatPill';

export default function RouteSummaryCard({ routeMode, orderStatus, plannerStatus, bareBonesUi = false }) {
  return (
    <div style={{ background: '#ffffff', border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.12)', borderRadius: bareBonesUi ? 4 : 20, padding: 14 }}>
      <div style={{ fontFamily: '"Trebuchet MS", sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#43505e' }}>
        Active route
      </div>
      <div style={{ marginTop: 8, fontSize: 18, lineHeight: 1.35 }}>
        {routeMode === 'agentcore'
          ? 'Chat surface -> AgentCore runtime -> Gateway contracts -> confirmation'
          : 'Chat surface -> ACP checkout sessions -> FSP tools -> confirmation'}
      </div>
      <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <StatPill label={orderStatus || 'Idle'} compact />
        <StatPill label={plannerStatus || 'Awaiting planner'} compact />
      </div>
    </div>
  );
}
