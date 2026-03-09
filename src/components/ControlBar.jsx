import React from 'react';

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
    <div style={{ display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[
          { key: 'acp', label: 'Run ACP flow' },
          { key: 'agentcore', label: 'Run AgentCore flow' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setRouteMode(tab.key)}
            style={{
              padding: '9px 13px',
              borderRadius: bareBonesUi ? 4 : 999,
              border: bareBonesUi ? '1px solid #bdbdbd' : '1px solid rgba(24,22,26,0.12)',
              background: routeMode === tab.key ? (bareBonesUi ? '#e6e6e6' : '#3e6d6b') : 'rgba(255,255,255,0.78)',
              color: routeMode === tab.key ? (bareBonesUi ? '#111111' : '#f5efe4') : '#243039',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        style={{
          border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.12)',
          borderRadius: bareBonesUi ? 4 : 18,
          background: '#ffffff',
          padding: 10,
          display: 'grid',
          gap: 8
        }}
      >
        <textarea
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={submitFromTextArea}
          placeholder={routeMode === 'agentcore' ? 'Ask the runtime to plan and complete the shopping flow' : 'Ask for a product, budget, financing, or delivery preference'}
          style={{ border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: 15, lineHeight: 1.45, minHeight: 78 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: '"Trebuchet MS", sans-serif', fontSize: 12, color: '#43505e' }}>
            {routeMode === 'agentcore'
              ? `Planner source: Bedrock runtime${!lockDemoConfig && !runtimeReady ? ' (runtime ARN not configured)' : ''}`
              : 'Chat-guided ACP flow'}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={onReset}
              disabled={loading}
              style={{
              padding: '9px 12px',
                borderRadius: bareBonesUi ? 4 : 999,
                border: bareBonesUi ? '1px solid #bdbdbd' : '1px solid rgba(24,22,26,0.12)',
                background: bareBonesUi ? '#f4f4f4' : 'rgba(242,236,226,0.92)',
                color: '#40515d',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 12.5,
                fontWeight: 600
              }}
              aria-label="Reset conversation"
              title="Reset conversation"
            >
              Reset
            </button>
            <button
              onClick={onSend}
              disabled={loading || (routeMode === 'agentcore' && !runtimeReady)}
              style={{
                width: 40,
                height: 40,
                borderRadius: bareBonesUi ? 4 : '50%',
                border: bareBonesUi ? '1px solid #bdbdbd' : 'none',
                background: routeMode === 'agentcore' ? (bareBonesUi ? '#efefef' : '#3d8588') : bareBonesUi ? '#efefef' : '#486d73',
                color: bareBonesUi ? '#111111' : '#f5efe4',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 18,
                lineHeight: 1,
                fontWeight: 700
              }}
              aria-label="Send prompt"
              title="Send prompt"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
