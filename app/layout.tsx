'use client'
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/app/components/ui/Sidebar";
import { AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import { Toaster } from "sonner";
import { NoiseFilter } from "@/app/components/ui/NoiseFilter";
import Link from 'next/link';
import { InfoIcon, User2, MenuIcon, XIcon } from "lucide-react";
import Script from 'next/script';

interface TelegramGameEvent {
  eventName: string;
  score?: number;
  data?: Record<string, unknown>;
}

interface TelegramGameProxy {
  receiveEvent: (eventName: string, eventData: TelegramGameEvent) => void;
}

declare global {
  interface Window {
    TelegramGameProxy: TelegramGameProxy;
  }
}

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isLandingPage = pathname === '/landing';
  const isPartnershipPage = pathname === '/partnership';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Initialize TelegramGameProxy
    if (typeof window !== 'undefined') {
      window.TelegramGameProxy = {
        receiveEvent: function (eventName: string, eventData: TelegramGameEvent) {
          // Handle events if needed
          console.log('Telegram event received:', eventName, eventData);
        },
      };
    }
  }, []);

  return (
    <html lang="ru" className="dark">
      <head>
        <Script src="https://telegram.org/js/games.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen bg-black">
          {!isLandingPage && <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />}
          <AnimatePresence mode="wait">
            <main className={!isLandingPage ? "flex-1" : "flex-1"}>
              <div className="relative min-h-screen max-lg:mt-24 pb-24 ">
                <div className="fixed inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black to-zinc-900/50" />
                </div>
                <div className="flex min-h-screen">
                  {!isLandingPage && <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />}
                  <div className={`flex-1 ${!isLandingPage ? 'lg:ml-64' : ''}`}>
                    {/* Profile Button */}
                    {!isLandingPage && !isPartnershipPage && (
                      <div className="fixed top-4 right-4 z-50 flex items-end flex-col gap-2 max-lg:mt-24">
                        <div className="flex gap-2">

                          <Link
                            href="/"
                            className="flex items-center backdrop-blur-lg justify-center text-[#F1DA8B] flex w-fit gap-4 px-2 items-center h-10 rounded-full bg-[#F1DA8B]/10 hover:bg-[#F1DA8B]/20 border border-[#F1DA8B]/20 transition-all duration-200"
                          >
                            <InfoIcon className="w-5 h-5" /> инструкция
                          </Link>

                          <Link
                            href="/profile"
                            className="flex items-center backdrop-blur-lg justify-center w-10 h-10 rounded-full bg-[#F1DA8B]/10 hover:bg-[#F1DA8B]/20 border border-[#F1DA8B]/20 transition-all duration-200"
                          >
                            <User2 className="w-5 h-5 text-[#F1DA8B]" />
                          </Link>
                        </div>


                        <button
                          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          className="lg:hidden flex items-center backdrop-blur-lg justify-center w-10 h-10 rounded-full bg-[#F1DA8B]/10 hover:bg-[#F1DA8B]/20 border border-[#F1DA8B]/20 transition-all duration-200"
                        >
                          {isMobileMenuOpen ? (
                            <XIcon className="w-5 h-5 text-[#F1DA8B]" />
                          ) : (
                            <MenuIcon className="w-5 h-5 text-[#F1DA8B]" />
                          )}
                        </button>
                      </div>
                    )}
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </AnimatePresence>
        </div>
        <NoiseFilter />
        <Toaster richColors position="top-right" className="mt-24" />
      </body>
    </html >
  );
}
