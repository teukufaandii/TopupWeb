import Image from "next/image";
import React from "react";
import Banner from "./_components/Banner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const page = () => {
  const gameList = [
    {
      id: 1,
      title: "Game 1",
      description: "This is a game.",
    },
    {
      id: 2,
      title: "Game 2",
      description: "This is a game.",
    },
    {
      id: 3,
      title: "Game 3",
      description: "This is a game.",
    },
  ];

  return (
    <div>
      <div>
        <Banner />
      </div>
      {/* HOT GAMES */}
      <div className="mt-10 px-5">
        <h1 className="text-2xl font-bold">Hot Games</h1>

        {/* Game Card */}
        <div className="flex flex-wrap mt-5 gap-5">
          {gameList.map((game) => (
            <Link href={`/game/${game.id}`} key={game.id} className="mt-5">
              <Card>
                <CardHeader>
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    className="rounded-md"
                    src="/background1.jpg"
                    width={300}
                    height={200}
                    alt="background"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
