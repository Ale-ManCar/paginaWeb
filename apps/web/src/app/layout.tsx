import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './styles.css';

export const metadata: Metadata = {
  description: 'Tienda en línea segura y preparada para crecer.',
  title: { default: 'Grupo 1 Store', template: '%s | Grupo 1 Store' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
