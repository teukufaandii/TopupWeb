"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

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

  const shouldRenderHeader = !["/login", "/signup"].includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen`}
      >
        <div className="w-full h-full text-green-400">
          {shouldRenderHeader && <Header />}{" "}
          <main className="bg-gradient-to-b from-black to-black/95 min-h-screen">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
