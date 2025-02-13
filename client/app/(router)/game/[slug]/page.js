"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGameContext } from "@/app/(store)/useGameContext";
import Image from "next/image";
import { DollarSign, Shield, ShieldPlus, ThumbsUp } from "lucide-react";

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
        <Image
          src={game.image}
          alt="Game Banner"
          layout="intrinsic"
          width={1920}
          height={400}
          objectFit="cover"
          className="shadow-lg"
        />
      </div>

      {/* TITLE WRAPPER */}
      <div className="flex min-h-32 w-full items-center border-b bg-gradient-to-br from-green-600 to-green-800 lg:min-h-[160px]">
        <div className="container flex items-center gap-6 mx-auto px-2 h-[160px]">
          {/* IMAGE */}
          <div>
            <div className="flex items-start gap-4">
              <div className="relative -top-28">
                <Image
                  loading="lazy"
                  src={game.image}
                  height={300}
                  width={300}
                  alt="Game Banner"
                  sizes="100vw"
                  className="z-20 -mb-14 aspect-square w-32 h-32 rounded-2xl object-cover shadow-2xl md:-mb-20 md:w-60"
                />
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
                <span className="text-sm/7 font-medium text-gray-300">Terpercaya</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span className="text-sm/7 font-medium text-gray-300">Aman</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                <span className="text-sm/7 font-medium text-gray-300">Murah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* WRAPPER */}
        <div className="mt-4 lg:mt-8">
          {/* FORM SECTION */}
          <div className="col-span-3 col-start-1 flex flex-col gap-4 lg:col-span-2 lg:gap-8"></div>
        </div>
      </div>
    </>
  );
};

export default GameDetailPage;
