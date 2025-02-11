"use client";
import React, { useEffect } from "react";
import Banner from "./_components/Banner";
import LoadingSpinner from "./_components/LoadingSpinner";
import { useUserContext } from "./(store)/useUserContext";
import GameCard from "./_components/GameCard";
import HotGamesCard from "./_components/HotGamesCard";

const Page = () => {
  const { checkAuth, checkingAuth } = useUserContext();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-800">
      <div className="max-w-screen-2xl mx-auto px-5 py-10">
        <Banner />
      </div>
      {/* HOT GAMES */}
      <div className="bg-gray-900 py-10">
        <HotGamesCard />
        {/* ALL GAMES */}
        <div className="max-w-screen-2xl mx-auto px-5 py-10">
          <h1 className="text-2xl font-bold text-left text-primary">
            Semua Game
          </h1>
          <p className="text-left mb-6 text-sm text-gray-400">
            Semua game yang tersedia
          </p>
          <GameCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
