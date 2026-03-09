import React from 'react';
import RouteSummaryCard from './RouteSummaryCard';
import FlowStatePanel from './FlowStatePanel';
import ContractSurfacePanel from './ContractSurfacePanel';
import ProtocolTracePanel from './ProtocolTracePanel';

export default function SideWorkspace({
  bareBonesUi = false,
  routeMode,
  orderStatus,
  plannerStatus,
  showContractSurface,
  setShowContractSurface,
  showProtocolTrace,
  setShowProtocolTrace,
  activePanel,
  setActivePanel,
  flowProps,
  contracts,
  trace,
  base
}) {
  const tabs = [
    { key: 'state', label: 'Flow state', visible: true },
    { key: 'contracts', label: 'Contract surface', visible: showContractSurface },
    { key: 'trace', label: 'Protocol trace', visible: showProtocolTrace }
  ].filter((tab) => tab.visible);

  return (
    <div
      style={{
        background: '#ffffff',
        border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.12)',
        borderRadius: bareBonesUi ? 6 : 24,
        padding: 12,
        display: 'grid',
        gap: 10,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        gridTemplateRows: 'auto auto 1fr'
      }}
    >
      <RouteSummaryCard routeMode={routeMode} orderStatus={orderStatus} plannerStatus={plannerStatus} bareBonesUi={bareBonesUi} />

      <div style={{ display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActivePanel(tab.key)}
                style={{
                  padding: '8px 12px',
                  borderRadius: bareBonesUi ? 4 : 10,
                  border: bareBonesUi ? '1px solid #bdbdbd' : '1px solid rgba(24,22,26,0.12)',
                  background: activePanel === tab.key ? (bareBonesUi ? '#efefef' : '#3e6d6b') : 'rgba(255,255,255,0.78)',
                  color: activePanel === tab.key ? (bareBonesUi ? '#111111' : '#f5efe4') : '#243039',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontFamily: '"Trebuchet MS", sans-serif', fontSize: 12.5, color: '#43505e' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={showContractSurface} onChange={(e) => setShowContractSurface(e.target.checked)} />
            Contract surface
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={showProtocolTrace} onChange={(e) => setShowProtocolTrace(e.target.checked)} />
            Protocol trace
          </label>
        </div>
      </div>

      <div
        style={{
          overflow: 'hidden',
          minHeight: 0,
          paddingRight: 0,
          background: '#ffffff',
          border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.1)',
          borderRadius: bareBonesUi ? 4 : 18,
          padding: 10,
          height: '100%'
        }}
      >
        <div style={{ overflowY: 'auto', overflowX: 'hidden', minHeight: 0, height: '100%', paddingRight: 4 }}>
          {activePanel === 'state' ? <FlowStatePanel {...flowProps} bareBonesUi={bareBonesUi} /> : null}
          {activePanel === 'contracts' && showContractSurface ? <ContractSurfacePanel contracts={contracts} /> : null}
          {activePanel === 'trace' && showProtocolTrace ? <ProtocolTracePanel trace={trace} base={base} /> : null}
        </div>
      </div>
    </div>
  );
}
