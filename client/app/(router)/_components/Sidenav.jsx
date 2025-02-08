"use client";
import Image from "next/image";
import { useState } from "react";

const Sidenav = () => {
  const [open, setOpen] = useState(false);

  const menu = [
    {
      id: 1,
      name: "All Courses",
    },
    {
      id: 2,
      name: "Membership",
    },
    {
      id: 3,
      name: "Be Instructor",
    },
  ];
  return (
    <div className="p-5 bg-white shadow-sm border h-screen">
      <Image
        src="/icon2.svg"
        className="mx-auto"
        width={170}
        height={80}
        alt="logo"
      />

      <hr className="mt-7" />
      {/* Menu List */}
      <div className="mt-8">
        {menu.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 mt-1 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-primary
            hover:text-white rounded-md transition-all ease-in-out duration-200"
          >
            {/* <item.icon className="group-hover:animate-bounce" /> */}
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidenav;
