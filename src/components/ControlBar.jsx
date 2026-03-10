import React from 'react';
import { Box, Button, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

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
  bareBonesUi
}) {
  function submitFromTextArea(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <Box sx={{ display: 'grid', gap: 1.25 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
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
              px: 1.5,
              py: 0.75,
              textTransform: 'none',
              fontWeight: 600
            }
          }}
        >
          <ToggleButton value="acp">Run ACP flow</ToggleButton>
          <ToggleButton value="agentcore">Run AgentCore flow</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {routeMode === 'agentcore'
            ? `Planner source: Bedrock runtime${!lockDemoConfig && !runtimeReady ? ' (runtime ARN not configured)' : ''}`
            : 'Chat-guided ACP flow'}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid rgba(24,22,26,0.10)',
          background: 'rgba(255,255,255,0.92)',
          p: 1.25
        }}
      >
        <TextField
          multiline
          minRows={2}
          maxRows={6}
          fullWidth
          variant="standard"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={submitFromTextArea}
          placeholder={
            routeMode === 'agentcore'
              ? 'Ask the runtime to plan and complete the shopping flow'
              : 'Ask for a product, budget, financing, or delivery preference'
          }
          InputProps={{
            disableUnderline: true
          }}
          sx={{
            '& .MuiInputBase-root': {
              alignItems: 'flex-start',
              fontSize: 15,
              lineHeight: 1.5
            }
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mt: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Try prompts like “suggest treadmills under 1200; offer financing”
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              onClick={onReset}
              disabled={loading}
              variant="outlined"
              startIcon={<RestartAltRoundedIcon />}
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 600
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
                borderRadius: '999px',
                px: 2,
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none'
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