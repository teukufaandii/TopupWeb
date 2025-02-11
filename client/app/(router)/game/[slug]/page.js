"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGameContext } from '@/app/(store)/useGameContext';

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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Game Image */}
          <div className="relative">
            {game.image && (
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Game Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-100">{game?.name || 'Game Name' }</h1>
            <p className="text-gray-300">{game?.description || 'Game Description' }</p>

            {/* Additional game details */}
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-100 mb-2">Detail Game</h2>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <span className="font-medium">Status:</span>{' '}
                    {game.isActive ? 'Aktif' : 'Tidak Aktif'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Popular:</span>{' '}
                    {game.isPopular ? 'Ya' : 'Tidak'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Dibuat pada:</span>{' '}
                    {new Date(game.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Diperbarui pada:</span>{' '}
                    {new Date(game.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Items Section */}
              {game.items && game.items.length > 0 && (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-100 mb-2">Items</h2>
                  <div className="space-y-2">
                    {game.items.map((item, index) => (
                      <div key={index} className="text-gray-300">
                        <p>
                          <span className="font-medium">Nama Item:</span> {item.name}
                        </p>
                        <p>
                          <span className="font-medium">Harga:</span> Rp{' '}
                          {item.price?.toLocaleString('id-ID')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetailPage;