import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function MessageBubble({ role, text, minimalUi, bareBonesUi = false }) {
  const isUser = role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: '84%',
          px: minimalUi ? 1.5 : 2,
          py: minimalUi ? 1.25 : 1.5,
          borderRadius: bareBonesUi
            ? '4px'
            : isUser
              ? '22px 22px 8px 22px'
              : '22px 22px 22px 8px',
          background: bareBonesUi
            ? (isUser ? '#f2f2f2' : '#ffffff')
            : isUser
              ? 'linear-gradient(135deg, #365f69 0%, #4c7a7f 100%)'
              : 'rgba(255,255,255,0.95)',
          color: bareBonesUi ? '#111111' : isUser ? '#f8f6f1' : '#18161a',
          border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.06)',
          boxShadow: bareBonesUi ? 'none' : '0 10px 24px rgba(24,22,26,0.06)'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mb: 0.5,
            color: bareBonesUi
              ? '#5f6b76'
              : isUser
                ? 'rgba(248,246,241,0.78)'
                : 'rgba(24,22,26,0.52)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          {isUser ? 'You' : 'Assistant'}
        </Typography>

        <Typography
          sx={{
            lineHeight: 1.55,
            fontSize: minimalUi ? 15 : 16,
            fontWeight: 400,
            whiteSpace: 'pre-wrap'
          }}
        >
          {text}
        </Typography>
      </Paper>
    </Box>
  );
}