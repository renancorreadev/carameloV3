import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <div className="w-full flex justify-center bg-[#FEE8C0] py-6">
        <div className="w-full max-w-[1140px] flex justify-center px-4">
          <ul className="flex gap-4">
            <li>
              <Link href="https://x.com/caramelocoinofc" target="_blank" className="block w-[36px] sm:w-[48px] hover:-rotate-3 transition-transform">
                <Image src="/images/common/3.png" alt="x" width={48} height={48} className="w-full h-auto" />
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com/caramelocoincripto" target="_blank" className="block w-[36px] sm:w-[48px] hover:-rotate-3 transition-transform">
                <Image src="/images/common/1.png" alt="instagram" width={48} height={48} className="w-full h-auto" />
              </Link>
            </li>
            <li>
              <Link href="https://youtube.com/caramelocoin" target="_blank" className="block w-[36px] sm:w-[48px] hover:-rotate-3 transition-transform">
                <Image src="/images/common/youtube.svg" alt="youtube" width={48} height={48} className="w-full h-auto" />
              </Link>
            </li>
            <li>
              <Link href="https://t.me/caramelocoincripto" target="_blank" className="block w-[36px] sm:w-[48px] hover:-rotate-3 transition-transform">
                <Image src="/images/common/2.png" alt="telegram" width={48} height={48} className="w-full h-auto" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <footer className="w-full flex justify-center" style={{backgroundColor: '#f4a33a'}}>
        <div className="w-full max-w-[1140px] flex flex-col sm:flex-row justify-between items-center px-4 py-4 gap-4 sm:gap-0">
          <div className="text-white text-center sm:text-left text-[18px] sm:text-[20px]">
            Caramelo Coin © 2025 | Todos os direitos reservados
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <Link href="https://www.caramelocoin.com/#roadmap" className="text-white hover:opacity-80 no-underline text-[18px] sm:text-[20px]">
              Roadmap
            </Link>
            <Link href="https://www.caramelocoin.com/#tokenomics" className="text-white hover:opacity-80 no-underline text-[18px] sm:text-[20px]">
              Tokenomics
            </Link>
            <Link href="https://prevenda.caramelocoin.com" className="text-white hover:opacity-80 no-underline text-[18px] sm:text-[20px]">
              Pré-venda
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
} 