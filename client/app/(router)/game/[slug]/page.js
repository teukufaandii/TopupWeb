"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGameContext } from "@/app/(store)/useGameContext";
import Image from "next/image";
import { DollarSign, Loader, Shield, ThumbsUp } from "lucide-react";

const GameDetailPage = () => {
  const params = useParams();
  const { game, loading, getGameBySlug } = useGameContext();

  useEffect(() => {
    if (params.slug) {
      getGameBySlug(params.slug);
    }
  }, [params.slug, getGameBySlug]);

  console.log(game);

  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          </div>
        </div>
      </>
    );
  }

  if (!game) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-300">Game tidak ditemukan</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
        {game?.image ? (
          <Image
            src={game.image}
            alt="Game Banner"
            layout="intrinsic"
            width={1920}
            height={400}
            objectFit="cover"
            className="shadow-lg"
          />
        ) : null}
      </div>

      {/* TITLE WRAPPER */}
      <div className="flex min-h-32 w-full items-center border-b bg-gradient-to-br from-green-600 to-green-800 lg:min-h-[160px]">
        <div className="container flex items-center gap-6 mx-auto px-2 h-[160px]">
          {/* IMAGE */}
          <div>
            <div className="flex items-start gap-4">
              <div className="relative -top-28">
                {game?.image ? (
                  <Image
                    loading="lazy"
                    src={game?.image}
                    height={300}
                    width={300}
                    alt="Game Banner"
                    sizes="100vw"
                    className="z-20 -mb-14 aspect-square w-32 h-32 rounded-2xl object-cover shadow-2xl md:-mb-20 md:w-60"
                  />
                ) : null}
              </div>
            </div>
          </div>
          {/* TITLE AND DETAILS */}
          <div className="py-4 sm:py-0">
            <h1 className="text-xs font-bold text-gray-300 uppercase leading-7 tracking-wider sm:text-lg">
              {game.name}
            </h1>
            <p className="text-xs text-gray-300 font-medium sm:text-base/6">
              {game.description}
            </p>
            <div className="mt-4 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-8 sm:text-sm/6">
              <div className="flex items-center gap-2">
                <ThumbsUp size={16} />
                <span className="text-sm/7 font-medium text-gray-300">
                  Terpercaya
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span className="text-sm/7 font-medium text-gray-300">
                  Aman
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                <span className="text-sm/7 font-medium text-gray-300">
                  Murah
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {/* WRAPPER */}
        <div className="mt-4 lg:mt-8">
          {/* TITLE */}
          <div className="container flex w-full flex-col gap-4">
            <div className="h-10 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground flex w-full">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm w-full">
                Transaksi
              </div>
            </div>
          </div>
          {/* FORM SECTION */}
          <div className="mt-0 lg:block">
            <form
              onSubmit={console.log("Halo")}
              className="container relative mt-4 grid grid-cols-2 gap-4 md:gap-8 lg:mt-8"
            >
              <div className="col-span-3 col-start-1 flex flex-col gap-4 lg:col-span-2 lg:gap-8">
                {/* GAME DATA SECTION */}
                <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]">
                  <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
                    <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">
                      1
                    </div>
                    <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">
                      Masukkan Data Akun
                    </h2>
                  </div>
                  <div className="overflow-hidden p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="id"
                            className="block text-xs font-medium text-foreground pb-2"
                          >
                            ID
                          </label>
                          <div className="flex flex-col items-start">
                            <input
                              placeholder="Ketikkan ID"
                              name="id"
                              id="id"
                              min="0"
                              type="number"
                              className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                            ></input>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="server"
                            className="block text-xs font-medium text-foreground pb-2"
                          >
                            Server
                          </label>
                          <div className="flex flex-col items-start">
                            <input
                              placeholder="Ketikkan Server"
                              name="server"
                              type="text"
                              className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 cursor-pointer rounded border bg-background text-primary focus:ring-primary focus:ring-offset-background"
                            checked
                            onChange={() => {}}
                          ></input>
                          <label htmlFor="" className="block text-xs font-medium text-foreground ml-3 block select-none text-sm text-foreground">Save Data untuk nanti</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* SELECTED ITEMS SECTION */}
                <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]"></section>
                {/* PURCHASE TOTAL SECTION */}
                <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]"></section>
                {/* CONTACT DETAIL */}
                <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]"></section>
              </div>
              <div className="fixed inset-x-0 bottom-0 z-40 block w-full space-y-4 rounded-t-md bg-secondary p-4">
                Terpilih
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetailPage;
