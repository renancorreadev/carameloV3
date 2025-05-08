'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuPanel({ isOpen, onClose }: MenuPanelProps) {
  if (!isOpen) return null;

  return (
    <div id="uc-menu-panel" className={`fixed inset-0 z-[9999] bg-black bg-opacity-50 ${isOpen ? 'uc-open' : ''}`} data-uc-offcanvas="overlay: true;">
      <div className="uc-offcanvas-bar uc-offcanvas-bar-animation bg-secondary-200 m-1 rounded-2 border border-2 border-black contrast-shadow-md text-dark">
        <header className="uc-offcanvas-header hstack justify-between items-center pb-2">
          <div className="uc-logo">
            <Link href="/" className="h5 text-none text-gray-900">
              <Image 
                src="/images/caramelo-icone.png" 
                alt="Caramelo" 
                width={40} 
                height={40} 
              />
            </Link>
          </div>
          <button 
            className="uc-offcanvas-close rtl:end-auto rtl:start-0 m-1 mt-2 p-0 btn border-0 hover:text-primary hover:rotate-90 duration-150 transition-all" 
            type="button"
            onClick={onClose}
          >
            <Image 
              width={24} 
              height={24} 
              className="icon icon-3" 
              src="/images/icons/close.svg" 
              alt="close" 
              data-uc-svg 
            />
          </button>
        </header>

        <div className="panel">
          <ul className="nav-y gap-narrow fw-medium fs-6" data-uc-nav>
            <li><Link href="#about" onClick={onClose} className="text-dark">Sobre</Link></li>
            <li><Link href="#features" onClick={onClose} className="text-dark">Vantagens</Link></li>
            <li><Link href="#roadmap" onClick={onClose} className="text-dark">Roadmap</Link></li>
            <li><Link href="#tokenomics" onClick={onClose} className="text-dark">Tokenomics</Link></li>
            <li><Link href="#faq" onClick={onClose} className="text-dark">FAQ</Link></li>
            <li><Link href="#contact" onClick={onClose} className="text-dark">Contato</Link></li>
            <li className="hr opacity-10 my-1"></li>
     
          </ul>
          <ul className="nav-x gap-1 mt-4">
            <li>
              <Link className="w-32px hover:-rotate-3" href="#"><Image width={32} height={32} src="/images/common/twitter.svg" alt="twitter" /></Link>
            </li>
            <li>
              <Link className="w-32px hover:-rotate-3" href="#"><Image width={32} height={32} src="/images/common/facebook.svg" alt="facebook" /></Link>
            </li>
            <li>
              <Link className="w-32px hover:-rotate-3" href="#"><Image width={32} height={32} src="/images/common/youtube.svg" alt="youtube" /></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 