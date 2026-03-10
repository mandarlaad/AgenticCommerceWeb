import React from 'react';
import { palette } from '../lib/theme';

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
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[
          { key: 'acp', label: 'Run ACP flow' },
          { key: 'agentcore', label: 'Run AgentCore flow' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setRouteMode(tab.key)}
            style={{
              padding: '10px 14px',
              borderRadius: bareBonesUi ? 4 : 999,
              border: bareBonesUi ? '1px solid #bdbdbd' : '1px solid rgba(18,32,43,0.12)',
              background:
                routeMode === tab.key
                  ? bareBonesUi
                    ? '#e6e6e6'
                    : `linear-gradient(135deg, ${palette.teal} 0%, ${palette.tealDeep} 100%)`
                  : 'rgba(255,255,255,0.82)',
              color: routeMode === tab.key ? (bareBonesUi ? '#111111' : '#f7f4ed') : '#243039',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              boxShadow: routeMode === tab.key && !bareBonesUi ? '0 12px 24px rgba(37,108,115,0.18)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        style={{
          border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(18,32,43,0.12)',
          borderRadius: bareBonesUi ? 4 : 22,
          background: bareBonesUi ? '#ffffff' : 'rgba(255,255,255,0.94)',
          padding: 12,
          display: 'grid',
          gap: 10,
          boxShadow: bareBonesUi ? 'none' : '0 16px 28px rgba(18,32,43,0.06)'
        }}
      >
        <textarea
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={submitFromTextArea}
          placeholder={routeMode === 'agentcore' ? 'Ask the runtime to plan and complete the shopping flow' : 'Ask for a product, budget, financing, or delivery preference'}
          style={{
            border: 'none',
            outline: 'none',
            resize: 'none',
            background: 'transparent',
            fontSize: 15,
            lineHeight: 1.5,
            minHeight: 78,
            color: '#12202b',
            fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 12.5, color: '#556473' }}>
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
                border: bareBonesUi ? '1px solid #bdbdbd' : '1px solid rgba(18,32,43,0.12)',
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
                minWidth: 72,
                height: 40,
                padding: '0 16px',
                borderRadius: bareBonesUi ? 4 : 999,
                border: bareBonesUi ? '1px solid #bdbdbd' : 'none',
                background:
                  routeMode === 'agentcore'
                    ? bareBonesUi
                      ? '#efefef'
                      : `linear-gradient(135deg, ${palette.teal} 0%, ${palette.tealDeep} 100%)`
                    : bareBonesUi
                      ? '#efefef'
                      : 'linear-gradient(135deg, #54777d 0%, #36555d 100%)',
                color: bareBonesUi ? '#111111' : '#f5efe4',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 14,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '0.02em',
                boxShadow: bareBonesUi ? 'none' : '0 12px 24px rgba(37,108,115,0.18)'
              }}
              aria-label="Send prompt"
              title="Send prompt"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

