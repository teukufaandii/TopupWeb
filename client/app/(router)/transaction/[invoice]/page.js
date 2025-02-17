"use client";

import {
  Copy,
  LucideBadgeCheck,
  LucideClock,
  LucideLoader,
  Printer,
  RefreshCcw,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const InvoiceDetail = () => {
  const params = useParams();

  //   const { invoice } = useTransactionContext();

  const invoiceDetails = {
    invoiceId: "INV-1234567890",
    name: "John Doe",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    items: [
      { name: "Item 1", price: 10.99 },
      { name: "Item 2", price: 5.99 },
    ],
    itemPrice: 10.99,
    status: "success",
    createdAt: "2022-01-01T00:00:00.000Z",
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-3">
      <div className="flex flex-1 flex-col w-full lg:w-auto">
        <div className="grow py-3">
          <div className="flex flex-col gap-3 px-3 flex-1">
            <div className="flex flex-col gap-3 flex-1 overflow-hidden relative ove lg:rounded-lg rounded-none shadow-inner bg-card">
              {/* TITLE BANNER */}
              <div className="flex flex-row lg:rounded-lg rounded-none shadow-inner p-4 overflow-hidden bg-green-900 relative">
                <div className="flex flex-col gap-2 justify-end w-full ">
                  <div className="flex flex-row justify-between gap-2">
                    <span className="text-3xl text-darkColor font-bold">
                      Invoice
                    </span>
                    <div className="inline-flex">
                      <button className="px-4 bg-green-500 text-darkColor text-xs  h-9 rounded-lg text-sm h-auto py-2.5 hover:opacity-80  justify-center items-center gap-2 flex select-none no-underline ">
                        <Printer className="w-4 h-4 text-white" />
                        <span className="font-medium line-clamp-1 text-white">
                          Cetak Invoice
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-4 pt-0">
                {/* TRANSACTION DETAIL SECTION */}
                <div className="flex lg:flex-row flex-col gap-3">
                  <div className="flex justify-between flex-1 flex-col sm:flex-row gap-2 sm:items-center">
                    <div className="flex  flex-row items-center gap-2">
                      <span className="text-xl font-semibold line-clamp-1">
                        {invoiceDetails.invoiceId}
                      </span>
                      <Copy className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-normal text-sm opacity-70">
                      Tanggal Transaksi: {invoiceDetails.createdAt}
                    </span>
                  </div>
                  <div className="flex justify-between items-center flex-row gap-2 sm:items-center">
                    <span className="font-normal text-sm opacity-70"></span>
                    <div
                      className={`flex py-2 px-4 rounded-full ${
                        invoiceDetails.status === "success"
                          ? "bg-[#0ABE5D]"
                          : "bg-red-500"
                      }`}
                    >
                      <span className="text-white font-bold text-sm">
                        {invoiceDetails.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full border-b-[1px] border-[#21212118]" />
                {/* TRANSACTION DATA SECTION */}
                <div className="flex flex-col sm:flex-row rounded-lg overflow-clip gap-2  sm:skew-x-[-16deg]">
                  {/* PENDING */}
                  <div className="p-3 bg-[#FF9800] text-gray-100 flex flex-row gap-2 flex-1 justify-center rounded-lg">
                    <LucideClock className="w-5 h-5 sm:skew-x-[16deg]" />
                    <span className="text-sm font-semibold line-clamp-1 sm:skew-x-[16deg]">
                      Pending
                    </span>
                  </div>
                  {/* PROCESS */}
                  <div className="p-3  bg-[#2196F3] text-gray-100 flex flex-row gap-2 flex-1 justify-center  rounded-lg">
                    <RefreshCcw className="w-5 h-5 sm:skew-x-[16deg]" />
                    <span className="text-sm font-semibold line-clamp-1 sm:skew-x-[16deg]">
                      Process
                    </span>
                  </div>
                  {/* SUCCESS */}
                  <div className="p-3 bg-[#4CAF50] text-gray-100 flex flex-row gap-2 flex-1 justify-center rounded-lg">
                    <LucideBadgeCheck className="w-5 h-5 sm:skew-x-[16deg]" />
                    <span className="text-sm font-semibold line-clamp-1 sm:skew-x-[16deg]">Success</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
