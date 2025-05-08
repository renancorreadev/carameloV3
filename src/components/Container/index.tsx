'use client';

import React from 'react';
import { useIsMobile } from '@/hooks/useMobile';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const CONTRACT_ADDRESS = '0xe600B09584619274984CB58a2C2ac9A954D6e349';
const BSC_SCAN_URL = `https://bscscan.com/address/${CONTRACT_ADDRESS}`;

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
 
  return (
    <div
      className={`bg-[#ffe7c0] w-full text-white flex flex-col items-center  ${className}`}
    >
 
      {/* Contêiner para o conteúdo */}
      <div className="relative z-10 flex">
        {children}
      </div>

      {/* Rodapé com link para o contrato na BSC */}
      {/* <div className="relative z-10 w-full flex justify-center py-4 bg-gray-800">
        <span className="comic-neue font-bold mr-2">📜 Endereço do Token: </span>
        <a
          href={BSC_SCAN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 text-sm font-semibold hover:underline flex items-center gap-2"
        >
          {isMobile ? (
            <span className="comic-neue  block font-bold">
              {`${CONTRACT_ADDRESS.substring(0, 6)}...${CONTRACT_ADDRESS.slice(
                -6
              )}`}
            </span>
          ) : (
            <span className="comic-neue font-bold">{CONTRACT_ADDRESS}</span>
          )}
        </a>
      </div> */}
    </div>
  );
};
