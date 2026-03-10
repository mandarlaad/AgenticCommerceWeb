import React from 'react';
import ControlBar from '../ControlBar';
import MessageBubble from './MessageBubble';
import ProductInlineCard from './ProductInlineCard';
import StageActionCard from './StageActionCard';
import { palette } from '../../lib/theme';

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
    <div
      style={{
        background: bareBonesUi
          ? '#ffffff'
          : 'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(248,244,237,0.96) 100%)',
        border: bareBonesUi ? '1px solid #d0d0d0' : `1px solid ${palette.line}`,
        borderRadius: bareBonesUi ? 6 : 28,
        padding: minimalUi ? 14 : 18,
        display: 'grid',
        gap: 14,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        gridTemplateRows: '1fr auto',
        boxShadow: bareBonesUi ? 'none' : '0 24px 48px rgba(18,32,43,0.08)'
      }}
    >
      <div
        style={{
          background: bareBonesUi
            ? '#ffffff'
            : 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(249,252,252,0.95) 100%)',
          border: bareBonesUi ? '1px solid #d8d8d8' : `1px solid ${palette.line}`,
          borderRadius: bareBonesUi ? 4 : 24,
          padding: 16,
          display: 'grid',
          gap: 12,
          minHeight: 0,
          overflow: 'hidden',
          boxShadow: bareBonesUi ? 'none' : 'inset 0 1px 0 rgba(255,255,255,0.92)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 12,
            alignContent: 'start',
            overflow: 'auto',
            paddingRight: 8,
            minHeight: 0,
            scrollbarGutter: 'stable'
          }}
        >
          {messages.map((message, index) => (
            <MessageBubble key={`${message.role}-${index}`} role={message.role} text={message.text} minimalUi={minimalUi} bareBonesUi={bareBonesUi} />
          ))}
          <ProductInlineCard product={product} summary={summary} artwork={artwork} minimalUi={minimalUi} routeMode={routeMode} planState={planState} bareBonesUi={bareBonesUi} />
          <StageActionCard {...stageProps} bareBonesUi={bareBonesUi} />
        </div>
      </div>

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
    </div>
  );
}

