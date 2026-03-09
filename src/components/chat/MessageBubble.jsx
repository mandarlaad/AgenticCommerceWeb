import React from 'react';

export default function MessageBubble({ role, text, minimalUi, bareBonesUi = false }) {
  return (
    <div
      style={{
        justifySelf: role === 'user' ? 'end' : 'start',
        maxWidth: '84%',
        padding: minimalUi ? '10px 12px' : '14px 16px',
        borderRadius: bareBonesUi ? 4 : role === 'user' ? '22px 22px 8px 22px' : '22px 22px 22px 8px',
        background: bareBonesUi ? (role === 'user' ? '#f2f2f2' : '#ffffff') : role === 'user' ? '#456871' : 'rgba(255,255,255,0.92)',
        color: bareBonesUi ? '#111111' : role === 'user' ? '#f5efe4' : '#18161a',
        border: bareBonesUi ? '1px solid #d0d0d0' : 'none',
        boxShadow: bareBonesUi ? 'none' : '0 8px 24px rgba(24,22,26,0.06)',
        lineHeight: 1.45,
        fontFamily: bareBonesUi ? '"Segoe UI", Arial, sans-serif' : role === 'user' ? '"Trebuchet MS", sans-serif' : 'Georgia, serif',
        fontSize: minimalUi ? 15 : 16
      }}
    >
      {text}
    </div>
  );
}
