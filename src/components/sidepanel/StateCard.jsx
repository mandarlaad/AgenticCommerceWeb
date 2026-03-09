import React from 'react';
import StatPill from '../common/StatPill';

export default function StateCard({ title, status, lines, emphasis = false, bareBonesUi = false }) {
  return (
    <div
      style={{
        padding: emphasis ? 14 : 12,
        borderRadius: bareBonesUi ? 4 : 16,
        background: '#ffffff',
        border: bareBonesUi ? '1px solid #d0d0d0' : emphasis ? '1px solid rgba(24,22,26,0.16)' : '1px solid rgba(24,22,26,0.1)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: emphasis ? 16 : 15, fontWeight: emphasis ? 600 : 500 }}>{title}</div>
        <StatPill label={status} compact />
      </div>
      <div style={{ marginTop: 8, display: 'grid', gap: 4, color: 'rgba(24,22,26,0.75)', lineHeight: 1.38, fontSize: 13.5 }}>
        {lines.filter(Boolean).map((line, index) => <div key={`${title}-${index}`}>{line}</div>)}
      </div>
    </div>
  );
}
