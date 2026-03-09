import React from 'react';
import StatPill from '../common/StatPill';

export default function ContractSurfacePanel({ contracts }) {
  if (!contracts.length) {
    return <div style={{ color: 'rgba(24,22,26,0.65)' }}>Contract target summary appears after the first flow execution.</div>;
  }
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {contracts.map((contract) => (
        <div key={`${contract.targetName}-${contract.operationId}`} style={{ border: '1px solid rgba(24,22,26,0.12)', borderRadius: 16, padding: 12, background: 'rgba(255,255,255,0.78)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: '"Trebuchet MS", sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#43505e' }}>
                {contract.targetName}
              </div>
              <div style={{ marginTop: 4, fontSize: 15 }}>{contract.operationId}</div>
            </div>
            <StatPill label={contract.surfaceMode || 'direct_http'} compact />
          </div>
          <div style={{ marginTop: 8, color: 'rgba(24,22,26,0.72)', wordBreak: 'break-all' }}>{contract.contractPath}</div>
        </div>
      ))}
    </div>
  );
}
