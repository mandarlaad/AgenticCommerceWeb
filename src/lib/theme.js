export const palette = {
  ink: '#18161a',
  paper: '#f5efe4',
  ember: '#cd5b2e',
  sand: '#dbc49b',
  moss: '#4d6b57',
  teal: '#1e6d74',
  slate: '#43505e',
  line: 'rgba(24,22,26,0.12)',
  softLine: 'rgba(24,22,26,0.08)',
  surface: 'rgba(255,255,255,0.72)',
  surfaceStrong: 'rgba(255,255,255,0.9)',
  shadow: '0 18px 50px rgba(24,22,26,0.08)'
};

export const shellStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top left, rgba(205,91,46,0.18), transparent 26%), ' +
    'radial-gradient(circle at bottom right, rgba(30,109,116,0.16), transparent 28%), ' +
    'linear-gradient(135deg, #f8f3ea 0%, #f2e9d7 50%, #eadcc2 100%)',
  color: palette.ink,
  fontFamily: '"Inter", "Segoe UI", "Trebuchet MS", Arial, sans-serif'
};

export const panelStyle = {
  background: palette.surface,
  border: `1px solid ${palette.line}`,
  borderRadius: 24,
  boxShadow: palette.shadow,
  backdropFilter: 'blur(12px)'
};