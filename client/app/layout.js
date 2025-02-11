"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useUserContext } from "./(store)/useUserContext";
import { useEffect } from "react";
import { motion } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const { checkAuth, checkingAuth } = useUserContext();

  useEffect(() => {
    checkAuth();
  }, []);

  const shouldRenderHeader = !["/login", "/signup"].includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen flex items-center justify-center`}
      >
        {checkingAuth ? (
          <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400">
            <motion.div
              className="w-14 h-14 border-4 border-green-400 border-t-transparent rounded-full animate-spin"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="mt-4 text-sm text-gray-400">Loading...</p>
          </div>
        ) : (
          <div className="w-full h-full text-green-400">
            {shouldRenderHeader && <Header />}
            <main className="bg-gradient-to-b from-black to-black/95 min-h-screen">
              {children}
            </main>
            <Toaster />
          </div>
        )}
      </body>
    </html>
  );
}
