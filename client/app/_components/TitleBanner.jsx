import Image from "next/image";
import React from "react";

const TitleBanner = ({ src, title }) => {
  return (
    <div className="relative w-full h-[100px] md:h-[150px] mb-10 border rounded-lg overflow-hidden">
      <Image
        src={src}
        alt="Game Banner"
        layout="intrinsic"
        width={1920}
        height={200}
        objectFit="cover"
        className="rounded-lg shadow-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-start px-4 md:px-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-shadow">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TitleBanner;
