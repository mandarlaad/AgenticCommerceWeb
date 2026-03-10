import React from 'react';
import StatPill from '../common/StatPill';
import { palette } from '../../lib/theme';

export default function ProductInlineCard({ product, summary, artwork, minimalUi, routeMode, planState, bareBonesUi = false }) {
  if (!product) return null;
  return (
    <div
      style={{
        justifySelf: 'start',
        width: '100%',
        maxWidth: '92%',
        background: bareBonesUi
          ? '#ffffff'
          : 'linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(245,250,250,0.94) 100%)',
        border: bareBonesUi ? '1px solid #d0d0d0' : `1px solid ${palette.line}`,
        borderRadius: bareBonesUi ? 4 : 22,
        padding: minimalUi ? 12 : 16,
        boxShadow: bareBonesUi ? 'none' : '0 12px 24px rgba(18,32,43,0.06)'
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: bareBonesUi ? '1fr' : minimalUi ? '120px 1fr' : '154px 1fr', gap: 14, alignItems: 'center' }}>
        {!bareBonesUi ? (
          <img
            src={artwork}
            alt={product.name}
            style={{
              width: '100%',
              height: minimalUi ? 90 : 116,
              objectFit: 'cover',
              borderRadius: 18,
              border: `1px solid ${palette.line}`,
              boxShadow: '0 10px 22px rgba(18,32,43,0.08)'
            }}
          />
        ) : null}
        <div style={{ display: 'grid', gap: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: minimalUi ? 24 : 28, fontWeight: 700, color: palette.ink }}>{product.name}</div>
            <StatPill label={product.category || 'Uncategorized'} compact />
          </div>
          <div style={{ fontFamily: '"Avenir Next", Avenir, Helvetica, Arial, sans-serif', fontSize: 12.5, color: palette.slate }}>
            SKU {product.sku} | {product.category}
          </div>
          <div style={{ fontSize: minimalUi ? 28 : 32, color: palette.ember, fontWeight: 700 }}>${product.price}</div>
          {summary ? <div style={{ color: 'rgba(18,32,43,0.74)', lineHeight: 1.42 }}>{summary}</div> : null}
          {routeMode === 'agentcore' && planState ? (
            <div style={{ fontFamily: '"Avenir Next", Avenir, Helvetica, Arial, sans-serif', fontSize: 11.5, color: palette.slate }}>
              Planner: {planState.source}
              {planState.plannerModelId ? ` | ${planState.plannerModelId.split('/').slice(-1)[0]}` : ''}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

