import Image from "next/image";
import React from "react";
import Banner from "./_components/Banner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Page = () => {
  const gameList = [
    {
      id: 1,
      title: "Free Fire",
      description: "Garena",
    },
    {
      id: 2,
      title: "Genshin Impact",
      description: "MiHoYo",
    },
    {
      id: 3,
      title: "Fortnite",
      description: "Valve",
    },
    {
      id: 4,
      title: "Minecraft",
      description: "Mojang",
    },
    {
      id: 5,
      title: "Roblox",
      description: "Roblox Corporation",
    },
    {
      id: 6,
      title: "Among Us",
      description: "Innersloth",
    },
  ];

  return (
    <div className="bg-gray-800">
      <div className="max-w-screen-2xl mx-auto px-5 py-10">
        <Banner />
      </div>
      {/* HOT GAMES */}
      <div className="bg-gray-900 py-10">
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
              <Link href={`/game/${game.id}`} key={game.id} className="w-full">
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
                      {game.title}
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
        {/* ALL GAMES */}
        <div className="max-w-screen-2xl mx-auto px-5 py-10">
          <h1 className="text-2xl font-bold text-left text-gray-100">
            Semua Game
          </h1>
          <p className="text-left mb-6 text-sm text-gray-400">
            Semua game yang tersedia
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {gameList.map((game) => (
              <Link href={`/game/${game.id}`} key={game.id} className="w-full">
                <Card className="hover:shadow-lg transition-all duration-300 flex flex-col items-center p-4 gap-4 bg-gray-800 hover:scale-105 border border-gray-700 hover:border-green-500 hover:bg-gray-700 rounded-lg aspect-square min-h-[120px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[250px] w-full max-w-[200px] lg:max-w-[250px] xl:max-w-[300px] relative overflow-hidden group">
                  <Image
                    className="rounded-md object-fill w-full h-full"
                    src="/banner1.jpg"
                    fill
                    alt="background"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col items-center justify-end p-4">
                    <CardTitle className="text-xs md:text-sm lg:text-base font-semibold text-gray-100 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm lg:text-base text-gray-300 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                      {game.description}
                    </CardDescription>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
