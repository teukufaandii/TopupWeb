import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useGameContext } from "../(store)/useGameContext";

const HotGamesCard = () => {
  const { popularGame, loading, getGamesByPopularity } = useGameContext();

  useEffect(() => {
    getGamesByPopularity();
  }, [getGamesByPopularity]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const gameList = popularGame ? popularGame : [];
  
  return (
    <div className="max-w-screen-2xl mx-auto px-5">
      <h1 className="text-2xl font-bold text-left text-green-500">
        Paling Sering Dicari
      </h1>
      <p className="text-left mb-6 text-sm text-gray-400">
        Game yang paling sering dicari
      </p>

      {/* Game Card */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {gameList.map((game) => (
          <Link href={`/game/${game.slug}`} key={game._id} className="w-full">
            <Card className="hover:shadow-lg transition-all duration-300 flex flex-row items-center p-4 gap-4 bg-gray-800 border border-gray-700 hover:border-green-500 hover:bg-gray-700 rounded-lg">
              <Image
                className="rounded-md object-cover w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                src="/banner1.jpg"
                width={96}
                height={96}
                alt="background"
              />
              <div className="flex flex-col">
                <CardTitle className="text-xs md:text-sm lg:text-base font-semibold text-gray-100">
                  {game.name}
                </CardTitle>
                <CardDescription className="text-xs md:text-sm lg:text-base text-gray-400">
                  {game.description}
                </CardDescription>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotGamesCard;
