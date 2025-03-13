"use client";
import { LucideTextSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  const [invoice, setInvoice] = React.useState("");
  const handleSearchInvoice = (e) => {
    e.preventDefault();
    router.push(`/transaction/${invoice}`);
  };
  return (
    <div className="relative w-full bg-gray-800 py-4 px-3 h-screen">
      <div className="m-4 rounded-3xl bg-primary/10 max-w-screen-2xl mx-auto px-5 py-3">
        <div className="container flex flex-col items-center justify-center gap-3 pb-4 pt-12 text-center md:py-32">
          <h1 className="text-3xl font-bold lg:text-4xl">Cek Invoice</h1>
          <p className="text-sm font-medium md:text-base">
            Lihat detail pembelian kamu menggunakan nomor Invoice.
          </p>
          <form
            onSubmit={handleSearchInvoice}
            className="mt-8 w-full max-w-xl rounded-3xl bg-background p-6 text-left shadow-md"
          >
            <h3 className="text-sm font-semibold">
              Cari detail pembelian kamu disini
            </h3>
            <div className="py-4">
              <div className="relative">
                <div className="flex flex-col items-start">
                  <input
                    name="invoice"
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                    className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75 h-10"
                    placeholder="Masukkan nomor invoice"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap transition-all rounded-lg shadow-sm text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full gap-2 pl-2 pr-5"
            >
              <LucideTextSearch className="w-4 h-4" />
              <span>Cari Invoice</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
