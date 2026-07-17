import localFont from 'next/font/local';

// Self-hosted, latin-subset woff2. Archivo and Manrope are variable (one file
// covers the weight range); IBM Plex Mono is static per weight. Each exposes a
// CSS variable consumed by the design tokens. Headings use Archivo SemiBold
// (600) by default, set in global.css, not the heavy weights.

export const archivo = localFont({
  src: '../../public/fonts/archivo-var-latin.woff2',
  variable: '--font-archivo',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

export const manrope = localFont({
  src: '../../public/fonts/manrope-var-latin.woff2',
  variable: '--font-manrope',
  weight: '200 800',
  display: 'swap',
  preload: true,
});

export const plexMono = localFont({
  src: [
    { path: '../../public/fonts/ibm-plex-mono-400-latin.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/ibm-plex-mono-500-latin.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-plex-mono',
  display: 'swap',
  preload: false,
});
