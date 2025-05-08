'use client';

import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
import { Container } from '@/components/Container';
import PresaleForm from '@/components/PresaleForm';
import { useAccount } from 'wagmi';

import { usePathname } from 'next/navigation';
import { initFacebookPixel } from '@/utils/bpixel';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const FACEBOOK_PIXEL_ID = '552697117164331';
// Desativando SSR para os componentes propensos a problemas
// const DynamicPageContent = dynamic(
//   () => import('@/components/HomeContent').then((mod) => mod.PageContent),
//   { ssr: false }
// );
// const DynamicWhitePaper = dynamic(
//   () => import('@/components/HomeContent').then((mod) => mod.WhitePaper),
//   { ssr: false }
// );

export default function Home() {
  const { isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    initFacebookPixel(FACEBOOK_PIXEL_ID);
  }, [pathname]);


  if (!isClient) {
    return <div className="loading-spinner">Carregando...</div>;
  }

  return isConnected ? (
    <div id="connected">
      <Container>
        <div className="overflow-hidden">
          <PresaleForm />
        </div>
      </Container>
    </div>
  ) : (
    <div id="disconnected">
      <Container>
        <div className="overflow-hidden">
          <div className="presale-container" style={{ marginLeft: 0, marginRight: 0}}>
            <div className="presale-wrapper">
              <div className="presale-form">
                <h2 className="presale-title">
                  Bem-vindo ao Caramelo
                </h2>
                
                <div className="connect-box">
                  <div className="connect-content">
                    <img src="/images/caramelo-coin.png" alt="Caramelo" className="connect-logo" />
                    <div className="connect-text">
                      <strong>Conecte sua carteira para participar</strong>
                      <p>Para participar da pré-venda do token Caramelo, você precisa conectar sua carteira. Clique no botão abaixo para começar.</p>
                    </div>
                    <ConnectButton label="Conectar Carteira" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
