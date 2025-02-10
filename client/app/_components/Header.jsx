"use client";
import { Button } from "@/components/ui/button";
import {
  Gamepad,
  Home,
  LogOut,
  Menu,
  Search,
  SearchIcon,
  Settings,
  User,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "n2a6M@example.com",
    phoneNumber: "1234567890",
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuList = [
    {
      id: 1,
      name: "Home",
      icon: Home,
      href: "/",
    },
    {
      id: 2,
      name: "Semua Game",
      icon: Gamepad,
      href: "/game",
    },
    {
      id: 3,
      name: "Cek Transaksi",
      icon: SearchIcon,
      href: "/transaction",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  // Search bar component to avoid repetition
  const SearchBar = () => (
    <div className="flex w-full gap-2 border rounded-md p-2 bg-transparent">
      <Search className="h-5 w-5 text-gray-300" />
      <input 
        className="outline-none bg-transparent w-full text-gray-300 placeholder:text-gray-400" 
        type="text" 
        placeholder="Cari Game" 
      />
    </div>
  );

  return (
    <div
      className={`sticky top-0 left-0 w-full p-4 transition-all duration-300 z-50 ${
        isScrolled ? "bg-gray/80 backdrop-blur-md shadow-md" : "bg-gray-900"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between gap-1 items-center px-5">
        {/* LOGO */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-green-400">
            GameStore
          </Link>
        </div>

        {/* Search Box (Desktop Only) */}
        <div className="hidden lg:flex w-1/2">
          <SearchBar />
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <div className="lg:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Menu Buttons (Desktop) */}
        <div className="hidden lg:flex gap-2">
          {menuList.map((menu) => (
            <Link
              href={menu.href}
              key={menu.id}
              className={`text-gray-300 px-2 py-1 rounded-md hover:bg-gray-700 ${pathname === menu.href ? "bg-green-600" : ""}`}
            >
              <div className="flex items-center gap-2 px-2">
                <menu.icon className="h-5 w-5" />
                <span className="text-gray-300">{menu.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Overlay for mobile menu */}
        <div 
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Side Navigation */}
        <div 
          className={`fixed top-0 left-0 w-64 h-screen bg-gray-700 shadow-lg p-5 flex flex-col gap-4 lg:hidden z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-white">
              GameStore
            </Link>
            <button className="text-gray-300" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Search Bar in Mobile Menu */}
          <div className="mb-2">
            <SearchBar />
          </div>
          
          {menuList.map((menu) => (
            <Link
              href={menu.href}
              key={menu.id}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-gray-300 hover:bg-gray-600 ${
                pathname === menu.href ? "bg-gray-600" : ""
              }`}
            >
              <menu.icon className="h-5 w-5" />
              <span>{menu.name}</span>
            </Link>
          ))}
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
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 border shadow-lg rounded-lg p-4 z-10">
                  <p className="font-semibold text-gray-300">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-400">{user.phoneNumber}</p>
                  <hr className="my-2 border-gray-600" />
                  <button className="w-full text-left py-1 px-2 text-gray-300 hover:text-green-300">
                    <div className="flex items-center">
                      <Settings className="mr-2" size={16} />
                      Settings
                    </div>
                  </button>
                  <button
                    className="w-full text-left py-1 px-2 text-red-500 hover:text-red-400"
                    onClick={() => setUser(null)}
                  >
                    <div className="flex items-center">
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </div>
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
    </div>
  );
};

export default Header;