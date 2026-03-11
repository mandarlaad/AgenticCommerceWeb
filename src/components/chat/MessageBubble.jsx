import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { glassPanelStyle, palette, typeScale } from '../../lib/theme';

export default function MessageBubble({ role, text }) {
  const isUser = role === 'user';
  const [visible, setVisible] = useState(isUser);
  const [showThinking, setShowThinking] = useState(!isUser);

  useEffect(() => {
    if (isUser) {
      setVisible(true);
      setShowThinking(false);
      return;
    }

    setVisible(false);
    setShowThinking(true);

    const timer = setTimeout(() => {
      setShowThinking(false);
      setVisible(true);
    }, 450);

    return () => clearTimeout(timer);
  }, [text, isUser]);

  if (showThinking && !isUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Paper
          elevation={0}
          sx={{
            ...glassPanelStyle,
            maxWidth: '84%',
            px: 2.4,
            py: 1.7,
            borderRadius: '26px 26px 26px 10px',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,249,253,0.94) 100%)'
          }}
        >
          <Typography
            sx={{
              display: 'block',
              mb: 0.75,
              color: 'rgba(15,23,42,0.52)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: typeScale.label
            }}
          >
            Assistant
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Typography
              sx={{
                color: palette.muted,
                fontWeight: 600,
                fontSize: typeScale.body
              }}
            >
              Thinking
            </Typography>

            <Box sx={{ display: 'flex', gap: 0.55 }}>
              {[0, 1, 2].map((dot) => (
                <Box
                  key={dot}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background:
                      dot === 0
                        ? palette.breadCard
                        : dot === 1
                          ? palette.breadPay
                          : palette.accent,
                    animation: `pulseDots 1.15s ${dot * 0.15}s infinite ease-in-out`,
                    '@keyframes pulseDots': {
                      '0%, 80%, 100%': { opacity: 0.3, transform: 'scale(0.85)' },
                      '40%': { opacity: 1, transform: 'scale(1)' }
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 240ms ease, transform 240ms ease'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: '84%',
          px: 2.4,
          py: 1.75,
          borderRadius: isUser ? '26px 26px 10px 26px' : '26px 26px 26px 10px',
          background: isUser
            ? 'linear-gradient(135deg, #FFF 0%, #FFF 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,249,253,0.94) 100%)',
          color: isUser ? '#F8FAFC' : palette.ink,
          border: `1px solid ${palette.softLine}`,
          boxShadow: isUser
            ? '0 14px 30px rgba(19,41,75,0.18)'
            : '0 14px 28px rgba(15,23,42,0.06)'
        }}
      >
        <Typography
          sx={{
            display: 'block',
            mb: 0.8,
            color: isUser ? 'rgba(248,250,252,0.80)' : 'rgba(15,23,42,0.52)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontSize: typeScale.label
          }}
        >
          {isUser ? 'You' : 'Assistant'}
        </Typography>

        <Typography
          sx={{
            lineHeight: 1.82,
            fontSize: '1.08rem',
            fontWeight: 500,
            whiteSpace: 'pre-wrap'
          }}
        >
          {text}
        </Typography>
      </Paper>
    </Box>
  );
}