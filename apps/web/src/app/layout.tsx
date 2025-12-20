import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AppProviders } from './providers';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '27th Web Team',
  description: 'Turbo monorepo with Next.js, React Native, and shared tooling.',
};

const enableMocking = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProviders enableMocking={enableMocking}>{children}</AppProviders>
      </body>
    </html>
  );
}
