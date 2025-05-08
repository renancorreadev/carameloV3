'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const tabs = [
    { id: 'metamask', label: 'MetaMask', content: MetaMaskTutorial() },
    { id: 'trustwallet', label: 'Trust', content: TrustWalletTutorial() },
  ];

  const [activeTab, setActiveTab] = useState('metamask');

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center top-[12vh]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform bg-[#FEE8C0] p-6 text-left align-middle shadow-xl transition-all rounded-2xl border-2 border-black">
              <Dialog.Title
                as="h3"
                className="presale-title text-center mb-6"
              >
                Adicionar Token à Wallet
              </Dialog.Title>

              <div className="mt-4 flex justify-center space-x-2 border-b-2 border-black">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-family-tertiary text-sm h-12 mb-3 w-full font-bold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-black border-b-2 border-[#FFD200]'
                        : 'text-gray-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-900 overflow-y-auto max-h-[60vh] font-family-tertiary">
                {tabs.find((tab) => tab.id === activeTab)?.content}
              </div>

              <div className="mt-6 text-right">
                <button
                  type="button"
                  className="presale-button"
                  onClick={onClose}
                >
                  Fechar
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const MetaMaskTutorial = () => (
  <div id="tutorial-metamask" className="space-y-4">
    <p className="font-semibold">1. Abra o aplicativo MetaMask no seu celular.</p>
    <p className="font-semibold">
      2. Vá para os 3 pontinhos no canto superior direito e clique em
      &ldquo;Importar Token&rdquo;.
    </p>
    <div className="flex justify-center my-4">
      <Image
        src="/images/set.png"
        className="w-full rounded-lg border-2 border-black"
        alt="MetaMask"
        width={100}
        height={40}
      />
    </div>
    <div className="space-y-2">
      <p className="font-semibold">
        3. Clique no endereço abaixo para copiar e vá em Token Personalizado e
        adicione o endereço do token:
      </p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            '0xe600B09584619274984CB58a2C2ac9A954D6e349'
          );
          toast.success('Endereço copiado!');
        }}
        className="flex items-center gap-2 px-4 py-2 bg-[#FFD200] rounded-lg hover:bg-yellow-400 transition-colors border-2 border-black font-semibold w-full justify-center"
      >
        <span>0xe60...D6e349</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>

    <p className="font-semibold">4. Clique em Seguinte e em seguida clique em Importar e pronto!</p>
  </div>
);

const TrustWalletTutorial = () => (
  <div className="space-y-4" id="tutorial-trust">
    <p className="font-semibold">1. Abra o aplicativo Trust Wallet.</p>
    <p className="font-semibold">
      2. <span>Clique em Gerir criptomoedas</span> e em seguida clique em{' '}
      <span>Não viste as tuas criptomoedas? Importar</span>{' '}
    </p>
    <p className="font-semibold">3. Selecione a rede Binance</p>
    <div className="space-y-2">
      <p className="font-semibold">
        4. Copie o endereço do token clicando no botão abaixo e cole em{' '}
        <span>Endereço do contrato</span>
      </p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            '0xe600B09584619274984CB58a2C2ac9A954D6e349'
          );
          toast.success('Endereço copiado!');
        }}
        className="flex items-center gap-2 px-4 py-2 bg-[#FFD200] rounded-lg hover:bg-yellow-400 transition-colors border-2 border-black font-semibold w-full justify-center"
      >
        <span>0xe60...D6e349</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>

    <div className="bg-white p-4 rounded-lg border-2 border-black">
      <p className="font-semibold mb-4">
        5. Clique em Adicionar Token manualmente e preencha com os dados do
        token:
      </p>
      <div className="space-y-2">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <span className="font-medium">Nome do token:</span>
          <span className="text-[#FFD200] font-bold">Caramelo Coin</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <span className="font-medium">Símbolo do token:</span>
          <span className="text-[#FFD200] font-bold">CARAMELO</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Decimais:</span>
          <span className="text-[#FFD200] font-bold">9</span>
        </div>
      </div>
    </div>

    <p className="font-semibold">6. Clique em Adicionar Token e pronto!</p>
  </div>
);

export default TutorialModal;
