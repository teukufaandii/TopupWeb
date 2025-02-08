"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Banner = () => {
  const images = [
    "/background1.jpg",
    "/background2.jpg",
    "/background3.jpg",
    "/background4.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-screen bg-black h-[400px] relative overflow-hidden">
      {/* Wrapper untuk semua gambar */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <Image
              src={image}
              width={1920}
              height={400}
              alt={`background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
