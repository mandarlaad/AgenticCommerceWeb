import React from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import RouteSummaryCard from './RouteSummaryCard';
import FlowStatePanel from './FlowStatePanel';
import ContractSurfacePanel from './ContractSurfacePanel';
import ProtocolTracePanel from './ProtocolTracePanel';
import { glassPanelStyle, palette, typeScale } from '../../lib/theme';

export default function SideWorkspace({
  bareBonesUi = false,
  routeMode,
  orderStatus,
  plannerStatus,
  showContractSurface,
  showProtocolTrace,
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
        ...glassPanelStyle,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(244,248,253,0.82) 100%)',
        borderRadius: bareBonesUi ? '8px' : '30px',
        p: 1.75,
        display: 'grid',
        gap: 1.35,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        gridTemplateRows: 'auto auto 1fr',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 80% 10%, rgba(28,129,149,0.06), transparent 18%), radial-gradient(circle at 14% 86%, rgba(19,41,75,0.05), transparent 22%)'
        }}
      />

      <Box sx={{ position: 'relative' }}>
        <RouteSummaryCard
          routeMode={routeMode}
          orderStatus={orderStatus}
          plannerStatus={plannerStatus}
          bareBonesUi={bareBonesUi}
        />
      </Box>

      <Box sx={{ display: 'grid', gap: 1.1, position: 'relative' }}>
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: palette.breadCard,
              fontWeight: 800,
              letterSpacing: '0.14em',
              fontSize: typeScale.label
            }}
          >
            Behind the scenes
          </Typography>
          <Typography
            sx={{
              color: palette.muted,
              mt: 0.35,
              fontSize: typeScale.body,
              lineHeight: 1.65,
              fontWeight: 500
            }}
          >
            Review the journey, contract surfaces, and request trace for this flow.
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
            minHeight: 44,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 999,
              background: 'linear-gradient(90deg, #13294B 0%, #1C8195 100%)'
            },
            '& .MuiTab-root': {
              minHeight: 44,
              textTransform: 'none',
              fontWeight: 800,
              fontSize: typeScale.bodySm,
              color: palette.primarySoft,
              px: 1.5
            },
            '& .Mui-selected': {
              color: palette.ink
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
          position: 'relative',
          overflow: 'hidden',
          minHeight: 0,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(247,250,253,0.90) 100%)',
          border: `1px solid ${palette.softLine}`,
          borderRadius: bareBonesUi ? '6px' : '22px',
          p: 1.35,
          height: '100%',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.72)'
        }}
      >
        <Box
          sx={{
            overflowY: 'auto',
            overflowX: 'hidden',
            minHeight: 0,
            height: '100%',
            pr: 0.5
          }}
        >
          {activePanel === 'state' ? <FlowStatePanel {...flowProps} bareBonesUi={bareBonesUi} /> : null}
          {activePanel === 'contracts' && showContractSurface ? <ContractSurfacePanel contracts={contracts} /> : null}
          {activePanel === 'trace' && showProtocolTrace ? <ProtocolTracePanel trace={trace} base={base} /> : null}
        </Box>
      </Paper>
    </Paper>
  );
}