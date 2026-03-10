import React from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
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
    { key: 'state', label: 'Journey', visible: true },
    { key: 'contracts', label: 'Contracts', visible: showContractSurface },
    { key: 'trace', label: 'Trace', visible: showProtocolTrace }
  ].filter((tab) => tab.visible);

  const tabIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.key === activePanel)
  );

  return (
    <Paper
      elevation={0}
      sx={{
        background: '#ffffff',
        border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.10)',
        borderRadius: bareBonesUi ? '6px' : '24px',
        p: 1.5,
        display: 'grid',
        gap: 1.25,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        gridTemplateRows: 'auto auto 1fr',
        boxShadow: bareBonesUi ? 'none' : '0 16px 40px rgba(24,22,26,0.06)'
      }}
    >
      <RouteSummaryCard
        routeMode={routeMode}
        orderStatus={orderStatus}
        plannerStatus={plannerStatus}
        bareBonesUi={bareBonesUi}
      />

      <Box sx={{ display: 'grid', gap: 1 }}>
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.14em',
              fontWeight: 700
            }}
          >
            Behind the scenes
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Review the journey, contract surfaces, and request trace for the current flow.
          </Typography>
        </Box>

        <Tabs
          value={tabIndex}
          onChange={(_, nextIndex) => {
            const nextTab = tabs[nextIndex];
            if (nextTab) setActivePanel(nextTab.key);
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 40,
            '& .MuiTab-root': {
              minHeight: 40,
              textTransform: 'none',
              fontWeight: 700
            }
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <Paper
        elevation={0}
        sx={{
          overflow: 'hidden',
          minHeight: 0,
          background: '#ffffff',
          border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.08)',
          borderRadius: bareBonesUi ? '4px' : '18px',
          p: 1.25,
          height: '100%'
        }}
      >
        <Box sx={{ overflowY: 'auto', overflowX: 'hidden', minHeight: 0, height: '100%', pr: 0.5 }}>
          {activePanel === 'state' ? <FlowStatePanel {...flowProps} bareBonesUi={bareBonesUi} /> : null}
          {activePanel === 'contracts' && showContractSurface ? <ContractSurfacePanel contracts={contracts} /> : null}
          {activePanel === 'trace' && showProtocolTrace ? <ProtocolTracePanel trace={trace} base={base} /> : null}
        </Box>
      </Paper>
    </Paper>
  );
}