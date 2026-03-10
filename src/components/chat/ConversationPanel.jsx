import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ControlBar from '../ControlBar';
import MessageBubble from './MessageBubble';
import ProductInlineCard from './ProductInlineCard';
import StageActionCard from './StageActionCard';

export default function ConversationPanel({
  minimalUi,
  bareBonesUi,
  routeMode,
  setRouteMode,
  prompt,
  setPrompt,
  onSend,
  onReset,
  loading,
  runtimeReady,
  messages,
  product,
  summary,
  artwork,
  planState,
  stageProps
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        background: bareBonesUi ? '#ffffff' : 'rgba(255,255,255,0.68)',
        border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.10)',
        borderRadius: bareBonesUi ? '6px' : '24px',
        p: minimalUi ? 1.5 : 2,
        display: 'grid',
        gap: 1.5,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        gridTemplateRows: '1fr auto',
        boxShadow: bareBonesUi ? 'none' : '0 16px 40px rgba(24,22,26,0.06)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          background: bareBonesUi ? '#ffffff' : 'rgba(255,255,255,0.72)',
          border: bareBonesUi ? '1px solid #d8d8d8' : '1px solid rgba(24,22,26,0.08)',
          borderRadius: bareBonesUi ? '4px' : '20px',
          p: 1.5,
          display: 'grid',
          gap: 1.25,
          minHeight: 0,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            alignItems: 'center',
            flexWrap: 'wrap',
            pb: 0.5
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'text.secondary',
                letterSpacing: '0.14em',
                fontWeight: 700
              }}
            >
              AI commerce assistant
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discover products, surface offers, and guide checkout in one conversation.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            alignContent: 'start',
            overflow: 'auto',
            pr: 0.5,
            minHeight: 0
          }}
        >
          {messages.map((message, index) => (
            <MessageBubble
              key={`${message.role}-${index}`}
              role={message.role}
              text={message.text}
              minimalUi={minimalUi}
              bareBonesUi={bareBonesUi}
            />
          ))}

          <ProductInlineCard
            product={product}
            summary={summary}
            artwork={artwork}
            minimalUi={minimalUi}
            routeMode={routeMode}
            planState={planState}
            bareBonesUi={bareBonesUi}
          />

          <StageActionCard {...stageProps} bareBonesUi={bareBonesUi} />
        </Box>
      </Paper>

      <ControlBar
        routeMode={routeMode}
        setRouteMode={setRouteMode}
        prompt={prompt}
        setPrompt={setPrompt}
        onSend={onSend}
        onReset={onReset}
        loading={loading}
        lockDemoConfig={true}
        runtimeReady={routeMode !== 'agentcore' || runtimeReady}
        bareBonesUi={bareBonesUi}
      />
    </Paper>
  );
}