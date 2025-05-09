/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ethers, formatUnits } from "ethers";
import {
  useWalletClient,
  useAccount,
  useBalance,
  useAccountEffect,
  useWatchAsset,
} from "wagmi";
import {
  CarameloPreSale__factory,
  Caramelo__factory,
} from "../../utils/typechain";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  BsCurrencyBitcoin,
  BsBoxArrowUpRight,
  BsShieldCheck,
} from "react-icons/bs";
import { useIsMobile } from "@/hooks/useMobile";
import toast from "react-hot-toast";
import TutorialModal from "./Modal";
import { trackEvent } from "@/utils/bpixel";
import "./index.css";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CARAMELO_PRESALE_CONTRACT || "";
const TOKEN_ADDRESS = "0xe600b09584619274984cb58a2c2ac9a954d6e349";
const BSC_SCAN_URL =
  "https://bscscan.com/token/0xe600b09584619274984cb58a2c2ac9a954d6e349";

const PresaleForm = () => {
  const { data: walletClient } = useWalletClient();
  const { watchAsset, isError, isSuccess } = useWatchAsset();
  const { data } = useBalance();
  const { isConnected, address } = useAccount();
  const [isModalOpen, setModalOpen] = useState(false);

  const [contract, setContract] = useState<any>(null);
  const [amount, setAmount] = useState<string>("");
  const [remaining, setRemaining] = useState<string>("0");
  const [totalRaised, setTotalRaised] = useState<string>("0");
  const [carameloBalance, setCarameloBalance] = useState<string>("0");
  const [tokenContract, setTokenContract] = useState<any>(null);
  const [BNBBalance, setBNBBalance] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const allowedAddresses = [
    "0xdCA1b295fAb25ebCFA1BF3834599Bd8606A64bF6".toLowerCase(),
    "0x14864Bc81FEed0ec2AA2E1826f82b1801D55C47f".toLowerCase(),
    "0x5707595910eC3D839d8348720E9C7E1d47784457".toLowerCase(),
    "0x5C63ccd7eA8f1676F7A8E20C0084De8e7d98E419".toLowerCase(),
  ];

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useAccountEffect({
    onConnect({ address, connector, isReconnected }) {
      console.log("Conectado", { address, connector, isReconnected });
      toast.success("Carteira conectada com sucesso!");
    },
    onDisconnect() {
      toast.success("Carteira desconectada com sucesso!");
      window.location.reload();
    },
  });

  useEffect(() => {
    try {
      if (!walletClient) return;
      const setupContract = async () => {
        const provider = new ethers.BrowserProvider(walletClient);
        const signer = await provider.getSigner();
        const contractInstance = CarameloPreSale__factory.connect(
          CONTRACT_ADDRESS,
          signer
        );

        const tokenContractInstance = Caramelo__factory.connect(
          TOKEN_ADDRESS,
          signer
        );
        setContract(contractInstance);
        setTokenContract(tokenContractInstance);

        const balance = await provider.getBalance(walletClient.account.address);
        setBNBBalance(Number(formatUnits(balance, 18)));
      };

      setupContract();
    } catch (error) {
      toast.error("Erro ao carregar informações.");
      console.error("Erro ao carregar informações:", error);
    }
  }, [walletClient, data, address]);

  const loadPresaleInfo = useCallback(async () => {
    if (!contract) return;

    try {
      const remainingTokens = await contract.tokensRemaining();
      const totalRaisedBNB = await contract.totalBNBReceived();
      const carameloTokenBalance = await tokenContract.balanceOf(
        walletClient?.account.address
      );

      setRemaining(ethers.formatUnits(remainingTokens, 6));
      setTotalRaised(ethers.formatUnits(totalRaisedBNB, 18));
      setCarameloBalance(ethers.formatUnits(carameloTokenBalance, 9));
    } catch (error) {
      await toast.error("Erro ao carregar informações da pré-venda.");
      console.error("Erro ao carregar informações:", error);
    }
  }, [contract, tokenContract, walletClient]);

  const handleBuy = async () => {
    trackEvent("Purchase");

    if (!contract) {
      toast.error("Conecte sua carteira antes de comprar.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Por favor, insira um valor válido de BNB.");
      return;
    }

    if (BNBBalance && parseFloat(amount) > BNBBalance) {
      toast.error("Saldo insuficiente de BNB.");
      return;
    }

    try {
      toast.loading("Processando compra...");

      const tx = await contract.buyTokens({
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      await toast.dismiss();
      toast.success("Compra realizada com sucesso!");
      loadPresaleInfo();
    } catch (error) {
      console.error("Erro ao comprar tokens:", error);
      toast.error(parseContractError(error));
    }
  };

  const parseErrorMessage = (errorMsg: string): string => {
    const errorMessages = {
      InsufficientFunds:
        "Saldo insuficiente para compra. Verifique seu saldo e tente novamente.",
      InvalidPhase:
        "A pré-venda não está ativa no momento. Aguarde a fase correta.",
      PreSaleNotActive:
        "A pré-venda ainda não está ativa. Tente novamente mais tarde.",
      NoTokensAvailable:
        "Não há tokens suficientes disponíveis para compra. Tente um valor menor.",
      InvalidTokenAmount:
        "A quantidade de tokens inserida é inválida. Insira um valor válido.",
      PreSaleAlreadyInitialized:
        "A pré-venda já foi inicializada. Não é possível reiniciá-la.",
      ZeroAddress:
        "Endereço de destino inválido. Verifique os dados e tente novamente.",
      WithdrawalFailed:
        "Falha ao tentar sacar os fundos. Entre em contato com o suporte.",
      MaxTokensBuyExceeded:
        "Você excedeu o limite máximo de tokens permitidos. Tente um valor menor.",
      InvalidPhaseRate:
        "Taxa de fase inválida. Entre em contato com o suporte para mais informações.",
    };

    for (const [key, message] of Object.entries(errorMessages)) {
      if (errorMsg.includes(key)) return message;
    }
    return "Erro desconhecido. Por favor, tente novamente mais tarde.";
  };

  const parseContractError = (error: any): string => {
    if (error?.data?.message) {
      return parseErrorMessage(error.data.message);
    }

    if (error?.code === "CALL_EXCEPTION" && !error.reason && !error.data) {
      return "Saldo insuficiente para pagar o gás da transação. Deposite BNB em sua carteira.";
    }

    if (error?.message?.includes("insufficient funds")) {
      return "Saldo insuficiente na carteira para completar a transação.";
    }

    return "Erro desconhecido. Por favor, tente novamente mais tarde.";
  };

  useEffect(() => {
    if (contract) loadPresaleInfo();
  }, [contract, loadPresaleInfo]);

  useEffect(() => {
    if (!isConnected) {
      setContract(null);
      setTokenContract(null);
      setBNBBalance(null);
      setRemaining("0");
      setTotalRaised("0");
      setCarameloBalance("0");
      setAmount("");
      toast.success("Carteira desconectada com sucesso!");
      window.location.reload();
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="presale-container flex-1">
        <div className="presale-wrapper">
          <div className="presale-form">
            <h2 className="presale-title">Conecte sua carteira</h2>
            <p className="text-gray-600 text-center text-lg font-family-tertiary">
              Para acessar a pré-venda, conecte sua carteira usando o botão
              acima.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToken = async () => {
    trackEvent("Add Token", { method: "handleAddToken" });

    if (isMobile) {
      setModalOpen(true);
    } else {
      try {
        await watchAsset({
          type: "ERC20",
          options: {
            address: TOKEN_ADDRESS,
            symbol: "CARAMELO",
            decimals: 9,
            image: "https://i.postimg.cc/wB37FMbj/caramelo-Token.png",
          },
        });
        toast.success("Token adicionado à carteira com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar token:", error);
        toast.error("Erro ao adicionar o token. Verifique sua carteira.");
      }
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(TOKEN_ADDRESS);
    toast.success("Endereço copiado!");
    trackEvent("Copy Contract Address");
  };

  return (
    <div className="presale-container flex-1 pb-10">
      <div className="presale-wrapper">
        <div className="presale-form">
          {/* Título */}
          <h2 className="presale-title flex items-center justify-center gap-2">
            Pré-venda Caramelo
          </h2>

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
              onClick={() => trackEvent("BSCScan View")}
            >
              <span className="text-[#F4A339] text-1xl text-center group-hover:text-[#FEE8C0] transition-colors font-family-tertiary">
                {isMobile ? truncateAddress(TOKEN_ADDRESS) : TOKEN_ADDRESS}
              </span>
              <div className="flex items-center ml-2">
                <img src="/bscscan.svg" alt="BSCScan" className="h-5 w-5" />
              </div>
            </a>
          </div>

          {/* Informações do Presale */}
          <div className="presale-stats">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <BsCurrencyBitcoin className="text-[#FFD200] text-3xl" />
                  <span className="presale-label mb-0">Tokens Disponíveis</span>
                </div>
                <div className="presale-progress">
                  <div
                    className="presale-progress-bar"
                    style={{ width: `${(Number(remaining) / 1000000) * 100}%` }}
                  />
                </div>
                <div className="presale-info-row">
                  <div
                    className="presale-info-label"
                    style={{ marginRight: "10px" }}
                  >
                    Tokens:{" "}
                  </div>
                  <div className="presale-info-value large-number">
                    {remaining}
                  </div>
                </div>
              </div>

              {isConnected &&
                allowedAddresses.includes(address?.toLowerCase() || "") && (
                  <div className="presale-info-row">
                    <div className="presale-info-label flex items-center gap-2">
                      <img src="/bnb.png" alt="BNB" className="w-6 h-6" />
                      <span>BNB Arrecadados</span>
                    </div>
                    <span className="presale-info-value">
                      {Number(totalRaised).toFixed(1)} BNB
                    </span>
                  </div>
                )}

              <div className="presale-info-row">
                <div className="presale-info-label flex items-center gap-2">
                  <img src="/dog.png" alt="Caramelo" className="w-6 h-6" />
                  <span>Saldo Caramelo</span>
                </div>
                <div className="token-balance">
                  <span className="token-amount">{carameloBalance}</span>
                  <span className="token-symbol">CARAMELO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Compra */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="bnb"
                className="presale-label w-full  items-center gap-2"
                style={{ display: "flex" }}
              >
                <img src="/bnb.png" alt="BNB" className="w-6 h-6" />
                <span>Quantidade em BNB</span>
              </label>
              <input
                id="bnb"
                type="number"
                placeholder="Digite a quantidade de BNB"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="presale-input"
              />
            </div>

            {!isMobile && (
              <div
                id="connect-wallet"
                onClick={() => trackEvent("Connect Wallet")}
                className="mb-4"
              >
                <ConnectButton label="Connectar" />
              </div>
            )}

            {isMobile && (
              <div className="presale-info-row">
                <div className="presale-info-label flex items-center gap-2">
                  <img src="/bnb.png" alt="BNB" className="w-6 h-6" />
                  <span>Saldo BNB</span>
                </div>
                <span className="presale-info-value">
                  {Number(BNBBalance).toFixed(8)} BNB
                </span>
              </div>
            )}

            <div className="grid gap-4 mt-8">
              <button
                id="buy-tokens"
                onClick={handleBuy}
                className="presale-button"
              >
                <span>Comprar Tokens</span>
                <img src="/dog.png" alt="Caramelo" className="w-6 h-6" />
              </button>

              <button
                id="add-token"
                onClick={handleAddToken}
                className="presale-button"
              >
                <span>Adicionar Token à Carteira</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            {isMobile && (
              <TutorialModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleForm;
