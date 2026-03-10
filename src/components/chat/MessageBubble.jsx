import React from 'react';

export default function MessageBubble({ role, text, minimalUi, bareBonesUi = false }) {
  return (
    <div
      style={{
        justifySelf: role === 'user' ? 'end' : 'start',
        maxWidth: role === 'user' ? '78%' : '84%',
        padding: minimalUi ? '11px 13px' : '15px 17px',
        borderRadius: bareBonesUi ? 4 : role === 'user' ? '22px 22px 8px 22px' : '22px 22px 22px 8px',
        background: bareBonesUi ? (role === 'user' ? '#f2f2f2' : '#ffffff') : role === 'user' ? 'linear-gradient(135deg, #4b7077 0%, #335962 100%)' : 'rgba(255,255,255,0.96)',
        color: bareBonesUi ? '#111111' : role === 'user' ? '#f6f4ef' : '#12202b',
        border: bareBonesUi ? '1px solid #d0d0d0' : role === 'user' ? '1px solid rgba(37,108,115,0.08)' : '1px solid rgba(18,32,43,0.08)',
        boxShadow: bareBonesUi ? 'none' : role === 'user' ? '0 14px 28px rgba(37,108,115,0.18)' : '0 10px 20px rgba(18,32,43,0.06)',
        lineHeight: 1.45,
        fontFamily: bareBonesUi ? '"Segoe UI", Arial, sans-serif' : '"Avenir Next", Avenir, Helvetica, Arial, sans-serif',
        fontSize: minimalUi ? 14.5 : 15.5
      }}
    >
      {text}
    </div>
  );
}

