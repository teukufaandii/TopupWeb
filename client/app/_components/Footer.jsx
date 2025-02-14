import { Github, Instagram, MailIcon, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 print:hidden border-t">
      <div className="container max-w-screen-2xl mx-auto px-5 py-12">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 flex flex-col justify-center">
            <span className="text-2xl font-bold text-pretty text-primary text-gray-400">
              GamerStore
            </span>
            <p className="text-sm leading-6 text-gray-200">
              Tempat topup abal abal jangan mau beli di sini
            </p>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com"
                className="text-murky-400 hover:text-murky-500"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                className="text-murky-400 hover:text-murky-500"
              >
                <span className="sr-only">Github</span>
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                className="text-murky-400 hover:text-murky-500"
              >
                <span className="sr-only">Youtube</span>
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                className="text-murky-400 hover:text-murky-500"
              >
                <span className="sr-only">Email</span>
                <MailIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-primary">
                Peta Situs
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="/"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    <span className="text-gray-200">Beranda</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/transaction"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    <span className="text-gray-200">Transaksi</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/game"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    <span className="text-gray-200">Semua Game</span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-primary">
                Dukungan
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="https://api.whatsapp.com/send/?phone=6282211696095&text&type=phone_number&app_absent=0"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    <span className="text-gray-200">Whatsapp</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/teukufaandii"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    <span className="text-gray-200">Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:tfandiahmad32@gmail.com"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    <span className="text-gray-200">Email</span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-primary">
                Legalitas
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="/"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    <span className="text-white">Ga ada</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    <span className="text-white">Sumpah ga ada</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-background/50 pt-8 sm:mt-20 lg:mt-24"></div>
      </div>
    </footer>
  );
};

export default Footer;
