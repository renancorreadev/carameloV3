'use client';

import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
import { Container } from '@/components/Container';
import PresaleForm from '@/components/PresaleForm';
import { useAccount } from 'wagmi';

import { usePathname } from 'next/navigation';
import { initFacebookPixel } from '@/utils/bpixel';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BsShieldCheck } from 'react-icons/bs';
import { useIsMobile } from '@/hooks/useMobile';

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
const TOKEN_ADDRESS = "0xe600b09584619274984cb58a2c2ac9a954d6e349";
const BSC_SCAN_URL =
  "https://bscscan.com/token/0xe600b09584619274984cb58a2c2ac9a954d6e349";



export default function Home() {
  const { isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    initFacebookPixel(FACEBOOK_PIXEL_ID);
  }, [pathname]);


  if (!isClient) {
    return <div className="loading-spinner">Carregando...</div>;
  }

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return isConnected ? (
    <div id="connected">
      <Container>
        <div className="overflow-hidden">
          <PresaleForm />
          {/* Bloco responsivo do contrato */}
      {/* Informação do Contrato */}
            <div className="flex flex-col items-center gap-3 mb-6 w-full">
              <div className="flex items-center justify-center w-full gap-2">
                <BsShieldCheck className="text-[#F4A339] text-2xl flex-shrink-0" />
                <h3 className="text-[#F4A339] text-1xl font-semibold flex items-center m-0" style={{ textShadow: '1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000' }}>
                  Endereço do Contrato Verificado
                </h3>
              </div>
              <a 
                href={BSC_SCAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-[#2D2D2D] p-2 rounded-lg hover:bg-[#3D3D3D] transition-colors cursor-pointer group no-underline"
                onClick={() => {}}
              >
                <span className="text-[#F4A339] text-1xl text-center group-hover:text-[#FEE8C0] transition-colors font-family-tertiary">
                  {isMobile ? truncateAddress(TOKEN_ADDRESS) : TOKEN_ADDRESS}
                </span>
                <div className="flex items-center ml-2">
                  <img src="/bscscan.svg" alt="BSCScan" className="h-5 w-5" />
                </div>
              </a>
            </div>
  
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
                {/* Bloco responsivo do contrato (visível mesmo desconectado) */}
              {/* Informação do Contrato */}
              <div className="flex flex-col items-center gap-3 mb-6 w-full">
              <div className="flex items-center justify-center w-full gap-2">
                <BsShieldCheck className="text-[#F4A339] text-2xl flex-shrink-0" />
                <h3 className="text-[#F4A339] text-1xl font-semibold flex items-center m-0" style={{ textShadow: '1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000' }}>
                  Endereço do Contrato Verificado
                </h3>
              </div>
              <a 
                href={BSC_SCAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-[#2D2D2D] p-2 rounded-lg hover:bg-[#3D3D3D] transition-colors cursor-pointer group no-underline"
                onClick={() => {}}
              >
                <span className="text-[#F4A339] text-1xl text-center group-hover:text-[#FEE8C0] transition-colors font-family-tertiary">
                  {isMobile ? truncateAddress(TOKEN_ADDRESS) : TOKEN_ADDRESS}
                </span>
                <div className="flex items-center ml-2">
                  <img src="/bscscan.svg" alt="BSCScan" className="h-5 w-5" />
                </div>
              </a>
            </div>
                
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
