import React from 'react';
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
    <div
      style={{
        background: bareBonesUi ? '#ffffff' : 'rgba(255,255,255,0.58)',
        border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.12)',
        borderRadius: bareBonesUi ? 6 : 24,
        padding: minimalUi ? 14 : 18,
        display: 'grid',
        gap: 12,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        gridTemplateRows: '1fr auto'
      }}
    >
      <div
        style={{
          background: bareBonesUi ? '#ffffff' : 'rgba(255,255,255,0.55)',
          border: bareBonesUi ? '1px solid #d8d8d8' : '1px solid rgba(24,22,26,0.12)',
          borderRadius: bareBonesUi ? 4 : 20,
          padding: 12,
          display: 'grid',
          gap: 10,
          minHeight: 0,
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'grid', gap: 12, alignContent: 'start', overflow: 'auto', paddingRight: 6, minHeight: 0 }}>
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
