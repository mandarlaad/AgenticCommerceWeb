import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import StatPill from '../common/StatPill';

export default function StateCard({ title, status, lines, emphasis = false, bareBonesUi = false }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: emphasis ? 1.75 : 1.5,
        borderRadius: bareBonesUi ? '4px' : '16px',
        background: '#ffffff',
        border: bareBonesUi
          ? '1px solid #d0d0d0'
          : emphasis
            ? '1px solid rgba(24,22,26,0.14)'
            : '1px solid rgba(24,22,26,0.08)',
        boxShadow: emphasis ? '0 10px 24px rgba(24,22,26,0.04)' : 'none'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <Typography sx={{ fontSize: emphasis ? 16 : 15, fontWeight: emphasis ? 700 : 600 }}>
          {title}
        </Typography>
        <StatPill label={status} compact />
      </Box>

      <Box sx={{ mt: 1, display: 'grid', gap: 0.5 }}>
        {lines.filter(Boolean).map((line, index) => (
          <Typography
            key={`${title}-${index}`}
            sx={{
              color: 'rgba(24,22,26,0.75)',
              lineHeight: 1.45,
              fontSize: 13.5
            }}
          >
            {line}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}