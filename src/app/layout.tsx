import Script from 'next/script';
import type { Metadata } from 'next';
import { Comic_Neue } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import ClientPreloader from '../components/ClientPreloader';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import ClientOnly from '../components/ClientOnly';

import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

// CSS Core
import "../css/magic-cursor.min.css";
import "../css/prettify.min.css";
import "../css/swiper-bundle.min.css";
import "../css/unicons.min.css";
import "../css/theme/theme-two.min.purge.css";

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Caramelo Coin - Pré-venda',
  description: 'Participe da pré-venda do token Caramelo e faça parte desta revolução',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Core Libraries */}
        <Script src="/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        
        {/* Additional Libraries */}
        <Script src="/js/libs/gsap.min.js" strategy="afterInteractive" />
        <Script src="/js/libs/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/js/libs/split-type.min.js" strategy="afterInteractive" />
        
        {/* Main Application Scripts */}
        <Script src="/js/app.js" strategy="afterInteractive" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          <ClientPreloader />
          <Toaster position="top-right" reverseOrder={false} />
          <Header />
          <main className="flex-1 flex flex-col">
            <ClientOnly>
              {children}
            </ClientOnly>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
