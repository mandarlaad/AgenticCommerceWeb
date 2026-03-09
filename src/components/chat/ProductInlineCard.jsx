import React from 'react';
import StatPill from '../common/StatPill';

export default function ProductInlineCard({ product, summary, artwork, minimalUi, routeMode, planState, bareBonesUi = false }) {
  if (!product) return null;
  return (
    <div
      style={{
        justifySelf: 'start',
        width: '100%',
        maxWidth: '92%',
        background: '#ffffff',
        border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.12)',
        borderRadius: bareBonesUi ? 4 : 20,
        padding: minimalUi ? 12 : 16
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: bareBonesUi ? '1fr' : minimalUi ? '116px 1fr' : '150px 1fr', gap: 14, alignItems: 'center' }}>
        {!bareBonesUi ? (
          <img
            src={artwork}
            alt={product.name}
            style={{
              width: '100%',
              height: minimalUi ? 88 : 110,
              objectFit: 'cover',
              borderRadius: 16,
              border: '1px solid rgba(24,22,26,0.12)'
            }}
          />
        ) : null}
        <div style={{ display: 'grid', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: minimalUi ? 22 : 26, fontWeight: 600 }}>{product.name}</div>
            <StatPill label={product.category || 'Uncategorized'} compact />
          </div>
          <div style={{ fontFamily: '"Trebuchet MS", sans-serif', fontSize: 12, color: '#43505e' }}>
            SKU {product.sku} | {product.category}
          </div>
          <div style={{ fontSize: minimalUi ? 26 : 30, color: '#cd5b2e' }}>${product.price}</div>
          {summary ? <div style={{ color: 'rgba(24,22,26,0.72)', lineHeight: 1.4 }}>{summary}</div> : null}
          {routeMode === 'agentcore' && planState ? (
            <div style={{ fontFamily: '"Trebuchet MS", sans-serif', fontSize: 11, color: '#43505e' }}>
              Planner: {planState.source}
              {planState.plannerModelId ? ` | ${planState.plannerModelId.split('/').slice(-1)[0]}` : ''}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
