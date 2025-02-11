"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  const images = [
    "/banner1.jpg",
    "/background2.jpg",
    "/background3.jpg",
    "/background4.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-md overflow-hidden bg-gray-700">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              fill
              priority={index === 0}
              alt={`background ${index + 1}`}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevImage}
        className="hidden sm:flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-1.5 sm:p-2 rounded-full text-white hover:bg-opacity-75"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextImage}
        className="hidden sm:flex absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-1.5 sm:p-2 rounded-full text-white hover:bg-opacity-75"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Dots Indicator - Smaller on mobile */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-700 transition-all duration-300 ${
              currentImageIndex === index ? "bg-opacity-100" : "bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;