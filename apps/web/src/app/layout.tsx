import type { Metadata } from 'next';
import { Manrope, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';
import './styles.css';

export const metadata: Metadata = {
  description:
    'Objetos cotidianos elegidos por su utilidad, tacto y permanencia.',
  title: { default: 'Casa Nativa', template: '%s | Casa Nativa' },
};

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans' });
const serif = Newsreader({ subsets: ['latin'], variable: '--font-serif' });

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
