import React from 'react';
import { palette } from '../../lib/theme';

function statusTone(status) {
  if (!status) return { bg: '#efe4cf', fg: palette.ink };
  if (/CONFIRMED|CAPTURED|DELIVERED|GRANTED|VERIFIED|CLEAR/i.test(status)) {
    return { bg: 'rgba(82,113,101,0.16)', fg: palette.moss };
  }
  if (/READY|AUTHORIZED|CREATED|PENDING|OPEN|MATCHED|BNPL|REVIEW|SHOWING/i.test(status)) {
    return { bg: 'rgba(37,108,115,0.14)', fg: palette.teal };
  }
  if (/DECLINED|FAILED|ERROR/i.test(status)) {
    return { bg: 'rgba(201,102,61,0.14)', fg: palette.ember };
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
        padding: compact ? '5px 10px' : '7px 13px',
        borderRadius: 999,
        background: tone.bg,
        color: tone.fg,
        fontFamily: '"Avenir Next", Avenir, Helvetica, Arial, sans-serif',
        fontSize: compact ? 10.5 : 11.5,
        fontWeight: 600,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        border: `1px solid ${tone.bg}`
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

