import React from 'react';
import { palette } from '../../lib/theme';

function statusTone(status) {
  if (!status) return { bg: '#efe4cf', fg: palette.ink };
  if (/CONFIRMED|CAPTURED|DELIVERED|GRANTED|VERIFIED|CLEAR/i.test(status)) {
    return { bg: 'rgba(77,107,87,0.18)', fg: palette.moss };
  }
  if (/READY|AUTHORIZED|CREATED|PENDING|OPEN|MATCHED|BNPL|REVIEW|SHOWING/i.test(status)) {
    return { bg: 'rgba(30,109,116,0.16)', fg: palette.teal };
  }
  if (/DECLINED|FAILED|ERROR/i.test(status)) {
    return { bg: 'rgba(205,91,46,0.18)', fg: palette.ember };
  }
  return { bg: '#efe4cf', fg: palette.ink };
}

export default function StatPill({ label, compact = false }) {
  const tone = statusTone(label);
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: compact ? '5px 10px' : '7px 12px',
        borderRadius: 999,
        background: tone.bg,
        color: tone.fg,
        fontFamily: '"Trebuchet MS", sans-serif',
        fontSize: compact ? 11 : 12,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap'
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: tone.fg,
          flex: '0 0 auto'
        }}
      />
      {label}
    </span>
  );
}
