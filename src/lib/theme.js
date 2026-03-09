export const palette = {
  ink: '#18161a',
  paper: '#f5efe4',
  ember: '#cd5b2e',
  sand: '#dbc49b',
  moss: '#4d6b57',
  teal: '#1e6d74',
  slate: '#43505e',
  line: 'rgba(24,22,26,0.12)'
};

export const shellStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top left, rgba(205,91,46,0.22), transparent 26%), ' +
    'radial-gradient(circle at bottom right, rgba(30,109,116,0.18), transparent 28%), ' +
    'linear-gradient(135deg, #f5efe4 0%, #efe4cf 48%, #e6d6ba 100%)',
  color: palette.ink,
  fontFamily: 'Georgia, "Trebuchet MS", serif'
};

export const panelStyle = {
  background: 'rgba(255,255,255,0.62)',
  border: `1px solid ${palette.line}`,
  borderRadius: 24,
  boxShadow: '0 18px 50px rgba(24,22,26,0.08)',
  backdropFilter: 'blur(10px)'
};
