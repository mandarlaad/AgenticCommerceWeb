export const palette = {
  ink: '#12202b',
  paper: '#f6f4ef',
  cloud: '#fffdf9',
  ember: '#c9663d',
  sand: '#ddd1bb',
  moss: '#527165',
  teal: '#256c73',
  tealDeep: '#1b5058',
  sky: '#dcebef',
  slate: '#556473',
  line: 'rgba(18,32,43,0.12)'
};

export const shellStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top left, rgba(201,102,61,0.18), transparent 22%), ' +
    'radial-gradient(circle at 82% 10%, rgba(37,108,115,0.12), transparent 16%), ' +
    'linear-gradient(180deg, #faf7f2 0%, #f4efe6 44%, #ece4d6 100%)',
  color: palette.ink,
  fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif'
};

export const panelStyle = {
  background: 'rgba(255,255,255,0.74)',
  border: `1px solid ${palette.line}`,
  borderRadius: 28,
  boxShadow: '0 18px 45px rgba(18,32,43,0.08)',
  backdropFilter: 'blur(12px)'
};

