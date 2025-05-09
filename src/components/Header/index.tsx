"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuPanel } from "../Modal/MenuPanel";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header
        className="uc-header header-two uc-navbar-sticky-wrap z-999 uc-dark"
        data-uc-sticky="start: 100vh; animation: uc-animation-slide-top; sel-target: .uc-navbar-container; cls-active: uc-navbar-sticky; cls-inactive: uc-navbar-transparent; end: !*;"
      >
        <nav
          className="uc-navbar-container bg-transparent mt-2 uc-navbar-float ft-tertiary z-1"
          data-anime="translateY: [-40, 0]; opacity: [0, 1]; duration: 750; delay: 0;"
        >
          <div
            className="uc-navbar-main"
            style={{ "--uc-nav-height": "100px" } as React.CSSProperties}
          >
            <div className="container">
              <div
                className="uc-navbar hstack justify-between min-h-[100px] ps-2 pe-1 lg:px-4 border border-black contrast-shadow-md rounded-2 lg:rounded-3"
                style={{ backgroundColor: "#f4a33a" }}
              >
                <div className="uc-navbar-left">
                  <div className="uc-logo">
                    <Link
                      className="panel text-none w-150px xl:w-auto"
                      href="https://www.caramelocoin.com/"
                    >
                      <Image
                        src="/images/caramelo-icone.png"
                        alt="Caramelo Coin"
                        width={60}
                        height={60}
                      />
                    </Link>
                  </div>
                </div>
                <div className="uc-navbar-center">
                  <ul
                    className="uc-navbar-nav fs-5 xl:fs-4 gap-2 lg:gap-3 d-none lg:d-flex fw-semibold"
                    data-uc-scrollspy-nav="closet: > *; offset: 48; scroll: true;"
                  >
                    <li>
                      <Link href="https://www.caramelocoin.com/#about">Sobre</Link>
                    </li>
                    <li>
                      <Link href="https://www.caramelocoin.com/#features">Vantagens</Link>
                    </li>
                    <li>
                      <Link href="https://www.caramelocoin.com/#roadmap">Roadmap</Link>
                    </li>
                    <li>
                      <Link href="https://www.caramelocoin.com/#tokenomics">Tokenomics</Link>
                    </li>
                    <li>
                      <Link href="https://www.caramelocoin.com/#faq">FAQ</Link>
                    </li>
                  </ul>
                </div>
                <div className="uc-navbar-right hstack gap-2">
                  <div id="connect-wallet">
                    <ConnectButton label="Connect" />
                  </div>
                  <button
                    className="btn btn-md btn-secondary w-48px h-48px p-0 border border-2 border-black contrast-shadow-sm d-inline-flex lg:d-none"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <Image
                      className="icon icon-3"
                      src="/images/icons/menu.svg"
                      alt="menu"
                      width={24}
                      height={24}
                      data-uc-svg
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <MenuPanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="backtotop-wrap position-fixed bottom-0 end-0 z-99 m-2 vstack">
        <Link
          className="btn btn-sm p-0 bg-yellow text-black border border-2 border-black contrast-shadow-sm w-48px h-48px rounded-circle"
          href="#top"
        >
          <Image
            className="icon icon-3"
            src="/images/icons/chevron-up.svg"
            alt="to-top"
            width={24}
            height={24}
            data-uc-svg
          />
        </Link>
      </div>
    </>
  );
}
