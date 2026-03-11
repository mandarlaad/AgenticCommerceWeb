export const palette = {
  ink: '#0F172A',
  text: '#1E293B',
  muted: '#64748B',

  paper: '#F4F8FC',
  canvas: '#EEF4FA',
  canvasSoft: '#F7FAFD',

  line: 'rgba(15,23,42,0.08)',
  softLine: 'rgba(15,23,42,0.05)',

  panel: 'rgba(255,255,255,0.78)',
  panelStrong: 'rgba(255,255,255,0.92)',
  panelTint: 'rgba(247,250,253,0.88)',

  shadow: '0 24px 60px rgba(15,23,42,0.10)',
  shadowSoft: '0 14px 30px rgba(15,23,42,0.06)',

  // Generic UI accents
  primary: '#0F172A',
  primarySoft: '#334155',
  accent: '#F08A4B',
  success: '#4D6B57',

  // Bread product colors - use ONLY for financing-specific surfaces
  breadPay: '#13294B',
  breadCard: '#1C8195'
};

export const typeScale = {
  hero: '3.25rem',
  h1: '2.4rem',
  h2: '1.85rem',
  h3: '1.45rem',
  title: '1.2rem',
  body: '1rem',
  bodyLg: '1.06rem',
  bodySm: '0.95rem',
  label: '0.82rem',
  micro: '0.74rem'
};

export const shellStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at 8% 10%, rgba(28,129,149,0.16), transparent 20%), ' +
    'radial-gradient(circle at 86% 12%, rgba(19,41,75,0.14), transparent 20%), ' +
    'radial-gradient(circle at 78% 84%, rgba(240,138,75,0.12), transparent 22%), ' +
    'linear-gradient(145deg, #EEF4FA 0%, #EAF2FA 38%, #E6EEF8 68%, #F3F7FB 100%)',
  color: palette.ink,
  fontFamily: '"Inter", "Segoe UI", Arial, sans-serif'
};

export const panelStyle = {
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(248,251,255,0.76) 100%)',
  border: `1px solid ${palette.line}`,
  borderRadius: 30,
  boxShadow: palette.shadow,
  backdropFilter: 'blur(18px)'
};

export const glassPanelStyle = {
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(245,249,253,0.74) 100%)',
  border: `1px solid ${palette.softLine}`,
  borderRadius: 24,
  boxShadow: palette.shadowSoft,
  backdropFilter: 'blur(14px)'
};

export const buttonTokens = {
  neutral: {
    bg: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    hover: 'linear-gradient(135deg, #0B1220 0%, #172030 100%)',
    color: '#FFFFFF'
  },
  subtle: {
    bg: 'rgba(255,255,255,0.84)',
    hover: 'rgba(255,255,255,0.98)',
    color: palette.ink,
    border: 'rgba(15,23,42,0.10)'
  },
  breadCard: {
    bg: 'linear-gradient(135deg, #1C8195 0%, #176D7E 100%)',
    hover: 'linear-gradient(135deg, #176D7E 0%, #145E6D 100%)',
    color: '#FFFFFF'
  },
  breadPay: {
    bg: 'linear-gradient(135deg, #13294B 0%, #10233F 100%)',
    hover: 'linear-gradient(135deg, #10233F 0%, #0B1730 100%)',
    color: '#FFFFFF'
  }
};