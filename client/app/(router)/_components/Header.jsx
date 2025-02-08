"use client";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import React, { useState } from "react";

const Header = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "n2a6M@example.com",
    phoneNumber: "1234567890",
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 bg-white flex justify-between items-center relative">
      {/* Search Box */}
      <div className="flex gap-2 border rounded-md p-2">
        <Search className="h-5 w-5" />
        <input className="outline-none" type="text" placeholder="Search..." />
      </div>

      {/* User Icon / Login Buttons */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            {/* User Icon */}
            <div
              className="border rounded-full p-2 bg-slate-50 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <User className="text-gray-500" />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-4 z-10">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phoneNumber}</p>
                <hr className="my-2" />
                <button className="w-full text-left py-1 px-2 hover:bg-gray-100">
                  ⚙️ Settings
                </button>
                <button
                  className="w-full text-left py-1 px-2 text-red-500 hover:bg-gray-100"
                  onClick={() => user ? setUser(null) : setUser(user)}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline">Login</Button>
            <Button variant="default">Register</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
