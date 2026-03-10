import React from 'react';
import RouteSummaryCard from './RouteSummaryCard';
import FlowStatePanel from './FlowStatePanel';
import ContractSurfacePanel from './ContractSurfacePanel';
import ProtocolTracePanel from './ProtocolTracePanel';
import { palette } from '../../lib/theme';

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
        background: bareBonesUi
          ? '#ffffff'
          : 'linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(248,244,237,0.94) 100%)',
        border: bareBonesUi ? '1px solid #d0d0d0' : `1px solid ${palette.line}`,
        borderRadius: bareBonesUi ? 6 : 28,
        padding: 12,
        display: 'grid',
        gap: 12,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        gridTemplateRows: 'auto auto 1fr',
        boxShadow: bareBonesUi ? 'none' : '0 24px 48px rgba(18,32,43,0.08)'
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
                  padding: '9px 13px',
                  borderRadius: bareBonesUi ? 4 : 12,
                  border: bareBonesUi ? '1px solid #bdbdbd' : `1px solid ${palette.line}`,
                  background:
                    activePanel === tab.key
                      ? bareBonesUi
                        ? '#efefef'
                        : `linear-gradient(135deg, ${palette.teal} 0%, ${palette.tealDeep} 100%)`
                      : 'rgba(255,255,255,0.84)',
                  color: activePanel === tab.key ? (bareBonesUi ? '#111111' : '#f7f4ed') : palette.ink,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow: activePanel === tab.key && !bareBonesUi ? '0 12px 24px rgba(37,108,115,0.16)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontFamily: '"Avenir Next", Avenir, Helvetica, Arial, sans-serif', fontSize: 12.5, color: palette.slate }}>
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
          background: bareBonesUi ? '#ffffff' : 'rgba(255,255,255,0.94)',
          border: bareBonesUi ? '1px solid #d0d0d0' : `1px solid ${palette.line}`,
          borderRadius: bareBonesUi ? 4 : 20,
          padding: 10,
          height: '100%',
          boxShadow: bareBonesUi ? 'none' : 'inset 0 1px 0 rgba(255,255,255,0.92)'
        }}
      >
        <div style={{ overflowY: 'auto', overflowX: 'hidden', minHeight: 0, height: '100%', paddingRight: 6, scrollbarGutter: 'stable' }}>
          {activePanel === 'state' ? <FlowStatePanel {...flowProps} bareBonesUi={bareBonesUi} /> : null}
          {activePanel === 'contracts' && showContractSurface ? <ContractSurfacePanel contracts={contracts} /> : null}
          {activePanel === 'trace' && showProtocolTrace ? <ProtocolTracePanel trace={trace} base={base} /> : null}
        </div>
      </div>
    </div>
  );
}

