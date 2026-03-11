import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ControlBar from '../ControlBar';
import MessageBubble from './MessageBubble';
import ProductInlineCard from './ProductInlineCard';
import StageActionCard from './StageActionCard';
import OrderConfirmationCard from './OrderConfirmationCard';

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
  const isComplete = stageProps?.stage === 'complete';

  return (
    <Paper
      elevation={0}
      sx={{
        background: bareBonesUi
          ? '#ffffff'
          : 'linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(246,250,255,0.62) 100%)',
        border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(15,23,42,0.08)',
        borderRadius: bareBonesUi ? '6px' : '30px',
        p: minimalUi ? 1.75 : 2.25,
        display: 'grid',
        gap: 1.75,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        gridTemplateRows: '1fr auto',
        boxShadow: bareBonesUi ? 'none' : '0 24px 52px rgba(15,23,42,0.10)',
        backdropFilter: 'blur(18px)',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 15% 12%, rgba(28,129,149,0.10), transparent 18%), radial-gradient(circle at 82% 18%, rgba(19,41,75,0.08), transparent 20%)'
        }}
      />

      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          background: bareBonesUi
            ? '#ffffff'
            : 'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(243,248,255,0.76) 100%)',
          border: bareBonesUi ? '1px solid #d8d8d8' : '1px solid rgba(15,23,42,0.06)',
          borderRadius: bareBonesUi ? '4px' : '24px',
          p: 2,
          display: 'grid',
          gap: 1.5,
          minHeight: 0,
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1.25,
            alignItems: 'center',
            flexWrap: 'wrap',
            pb: 0.75
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: '#1C8195',
                letterSpacing: '0.16em',
                fontWeight: 800,
                fontSize: '0.82rem'
              }}
            >
              Bread AI commerce assistant
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                mt: 0.25,
                fontSize: '1rem',
                lineHeight: 1.6
              }}
            >
              Discover products, compare financing, and complete checkout in one conversation.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 1.75,
            alignContent: 'start',
            overflow: 'auto',
            pr: 0.5,
            minHeight: 0
          }}
        >
          {isComplete ? (
            <OrderConfirmationCard
              product={product}
              artwork={artwork}
              order={stageProps?.order}
              paymentDraft={stageProps?.paymentDraft}
              cartDraft={stageProps?.cartDraft}
              currentProfile={stageProps?.currentProfile}
            />
          ) : (
            <>
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
            </>
          )}
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