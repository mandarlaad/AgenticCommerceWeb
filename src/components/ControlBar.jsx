// manoj_controlbar
import React from 'react';
import { Box, Button, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { buttonTokens, glassPanelStyle, palette, typeScale } from '../lib/theme';

export default function ControlBar({
  routeMode,
  setRouteMode,
  prompt,
  setPrompt,
  onSend,
  onReset,
  loading,
  lockDemoConfig,
  runtimeReady,
  planState
}) {
  function submitFromTextArea(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }
  function plannerLabel() {
      if (routeMode !== 'agentcore') return 'Conversational commerce assistant';
      if (!lockDemoConfig && !runtimeReady) return 'Planner source: AgentCore runtime (runtime ARN not configured)';
      if (!planState?.source) return 'Planner source: AgentCore runtime';
      const modelId = planState?.plannerModelId ? ` | ${planState.plannerModelId.split('/').slice(-1)[0]}` : '';
      return `Planner source: ${planState.source}${modelId}`;
    }  

  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1.25,
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <ToggleButtonGroup
          exclusive
          value={routeMode}
          onChange={(_, next) => {
            if (next) setRouteMode(next);
          }}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: '999px !important',
              px: 2,
              py: 1,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: typeScale.body,
              borderColor: palette.line,
              background: 'rgba(255,255,255,0.86)',
              color: palette.primarySoft
            },
            '& .Mui-selected': {
              background: 'linear-gradient(135deg, rgba(15,23,42,0.08) 0%, rgba(255,255,255,0.98) 100%) !important',
              color: palette.ink
            }
          }}
        >
          <ToggleButton value="acp">Run ACP flow</ToggleButton>
          <ToggleButton value="agentcore">Run AgentCore flow</ToggleButton>
        </ToggleButtonGroup>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            pr: 0.5,
            fontSize: typeScale.body
          }}
        >
          {plannerLabel()}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          ...glassPanelStyle,
          borderRadius: '28px',
          px: 2,
          pt: 1.25,
          pb: 1.15,
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,250,255,0.90) 100%)'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at 12% 16%, rgba(28,129,149,0.08), transparent 18%), radial-gradient(circle at 88% 22%, rgba(19,41,75,0.06), transparent 20%)'
          }}
        />

        <TextField
          multiline
          minRows={1}
          maxRows={4}
          fullWidth
          variant="standard"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={submitFromTextArea}
          placeholder={
            routeMode === 'agentcore'
              ? 'Ask the runtime to plan and complete the shopping flow'
              : 'Search for products, budgets, financing, or merchant-specific offers'
          }
          InputProps={{
            disableUnderline: true
          }}
          sx={{
            position: 'relative',
            '& .MuiInputBase-root': {
              alignItems: 'flex-start',
              fontSize: '1.1rem',
              lineHeight: 1.75,
              px: 0.75,
              py: 0.05,
              fontWeight: 500,
              color: palette.ink
            },
            '& textarea': {
              padding: '4px 8px 8px 8px',
              minHeight: '36px !important'
            }
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1.25,
            mt: 0.85,
            pt: 0.95,
            borderTop: `1px solid ${palette.softLine}`,
            flexWrap: 'wrap',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              pl: 0.75,
              fontWeight: 500,
              fontSize: typeScale.bodySm
            }}
          >
            Try: “Find me a diamond ring under $1500 and finance it”
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', pr: 0.25 }}>
            <Button
              onClick={onReset}
              disabled={loading}
              variant="outlined"
              startIcon={<RestartAltRoundedIcon />}
              sx={{
                borderColor: buttonTokens.subtle.border,
                background: buttonTokens.subtle.bg,
                color: buttonTokens.subtle.color,
                fontSize: typeScale.bodySm,
                '&:hover': {
                  background: buttonTokens.subtle.hover,
                  borderColor: buttonTokens.subtle.border
                }
              }}
            >
              Reset
            </Button>

            <Button
              onClick={onSend}
              disabled={loading || (routeMode === 'agentcore' && !runtimeReady)}
              variant="contained"
              endIcon={<SendRoundedIcon />}
              sx={{
                background: buttonTokens.neutral.bg,
                color: buttonTokens.neutral.color,
                fontSize: typeScale.bodySm,
                boxShadow: '0 12px 24px rgba(15,23,42,0.18)',
                '&:hover': {
                  background: buttonTokens.neutral.hover
                }
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}