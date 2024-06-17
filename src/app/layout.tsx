import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryProvider from '@/QueryProvider';
import './globals.css';
import KakaoScript from '@/components/KakaoScript';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KakaoScript />
        <QueryProvider>
          <main className="max-w-sm m-auto">{children}</main>
          <div id="modal" />
        </QueryProvider>
      </body>
    </html>
  );
}
