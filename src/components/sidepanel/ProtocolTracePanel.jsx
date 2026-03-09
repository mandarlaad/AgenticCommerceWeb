import React from 'react';
import StatPill from '../common/StatPill';

export default function ProtocolTracePanel({ trace, base }) {
  if (!trace.length) {
    return <div style={{ color: 'rgba(24,22,26,0.65)' }}>Tool and endpoint trace will appear here after the flow starts.</div>;
  }
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {trace.map((entry, index) => (
        <div key={`${entry.tool}-${index}`} style={{ border: '1px solid rgba(24,22,26,0.12)', borderRadius: 16, padding: 12, background: 'rgba(255,255,255,0.78)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: '"Trebuchet MS", sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#43505e' }}>
                {entry.tool}
              </div>
              <div style={{ marginTop: 4, fontSize: 14, wordBreak: 'break-all' }}>
                {entry.method} {String(entry.endpoint || entry.path || '').replace(base, '')}
              </div>
            </div>
            <StatPill label={String(entry.status || entry.statusCode || (entry.ok ? 'OK' : 'ERROR'))} compact />
          </div>
          {(entry.targetName || entry.operationId) ? (
            <div style={{ marginTop: 8, display: 'grid', gap: 3, fontFamily: '"Trebuchet MS", sans-serif', fontSize: 11, color: '#43505e' }}>
              {entry.targetName ? <div>Target: {entry.targetName}</div> : null}
              {entry.operationId ? <div>Operation: {entry.operationId}</div> : null}
              {entry.contractPath ? <div>Contract: {entry.contractPath}</div> : null}
              {entry.surfaceMode ? <div>Transport: {entry.surfaceMode}</div> : null}
            </div>
          ) : null}
          {entry.idempotencyKey ? (
            <div style={{ marginTop: 8, fontFamily: '"Trebuchet MS", sans-serif', fontSize: 11, color: '#43505e' }}>
              Idempotency-Key: {entry.idempotencyKey}
            </div>
          ) : null}
          <div style={{ marginTop: 6, fontFamily: '"Trebuchet MS", sans-serif', fontSize: 11, color: '#43505e' }}>
            {entry.at}
          </div>
        </div>
      ))}
    </div>
  );
}
