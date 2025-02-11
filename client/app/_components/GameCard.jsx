"use client";
import React, { useEffect } from "react";
import { useGameContext } from "../(store)/useGameContext";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const GameCard = () => {
  const { game, getAllGames, loading } = useGameContext();

  useEffect(() => {
    getAllGames();
  }, [getAllGames]);

  const gameList = game ? game : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {gameList.map((game) => (
        <Link href={`/game/${game.slug}`} key={game._id} className="w-full">
          <Card className="hover:shadow-lg transition-all duration-300 flex flex-col items-center p-4 gap-4 bg-gray-800 hover:scale-105 border border-gray-700 hover:border-green-500 hover:bg-gray-700 rounded-lg aspect-square min-h-[120px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[250px] w-full max-w-[200px] lg:max-w-[250px] xl:max-w-[300px] relative overflow-hidden group">
            <Image
              className="rounded-md object-fill w-full h-full"
              src="/banner1.jpg"
              fill
              alt="background"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col items-center justify-end p-4">
              <CardTitle className="text-xs md:text-sm lg:text-base font-semibold text-gray-100 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                {game.name}
              </CardTitle>
              <CardDescription className="text-xs md:text-sm lg:text-base text-gray-300 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                {game.description}
              </CardDescription>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default GameCard;
