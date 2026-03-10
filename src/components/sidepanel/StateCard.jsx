import React from 'react';
import StatPill from '../common/StatPill';
import { palette } from '../../lib/theme';

export default function StateCard({ title, status, lines, emphasis = false, bareBonesUi = false }) {
  return (
    <div
      style={{
        padding: emphasis ? 15 : 13,
        borderRadius: bareBonesUi ? 4 : 18,
        background: bareBonesUi
          ? '#ffffff'
          : emphasis
            ? 'linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(220,235,239,0.36) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,252,252,0.92) 100%)',
        border: bareBonesUi
          ? '1px solid #d0d0d0'
          : emphasis
            ? '1px solid rgba(37,108,115,0.18)'
            : `1px solid ${palette.line}`,
        boxShadow: bareBonesUi ? 'none' : emphasis ? '0 14px 28px rgba(37,108,115,0.1)' : '0 8px 18px rgba(18,32,43,0.05)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
        <div>
          <div style={{ fontSize: emphasis ? 16 : 15, fontWeight: 700, color: palette.ink }}>{title}</div>
        </div>
        <StatPill label={status} compact />
      </div>
      <div
        style={{
          marginTop: 9,
          display: 'grid',
          gap: 5,
          color: 'rgba(18,32,43,0.72)',
          lineHeight: 1.45,
          fontSize: 13.5
        }}
      >
        {lines.filter(Boolean).map((line, index) => (
          <div key={`${title}-${index}`}>{line}</div>
        ))}
      </div>
    </div>
  );
}

