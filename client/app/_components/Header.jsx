"use client";
import { Button } from "@/components/ui/button";
import {
  Gamepad,
  Home,
  LogOut,
  Menu,
  Search,
  SearchIcon,
  User,
  User2,
  X,
} from "lucide-react";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "../(store)/useUserContext";
import { useGameContext } from "../(store)/useGameContext";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const { user, logout } = useUserContext();
  const { game, loading, searchGame } = useGameContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef(null);
  const avatarRef = useRef(null);
  const searchContainerRef = useRef(null);

  const filteredGames = useMemo(() => game, [game]);

  // Focus input on searchQuery change
  useEffect(() => {
    inputRef.current?.focus();
  }, [searchQuery]);

  // Search debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      searchGame(searchQuery);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchQuery, searchGame]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Control body overflow based on menu state
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isMenuOpen]);

  // Reset search when query is empty
  useEffect(() => {
    if (!searchQuery.trim()) {
      searchGame("");
    }
  }, [searchQuery, searchGame]);

  // Close mobile UI elements on route change
  useEffect(() => {
    setIsMobileSearchOpen(false);
    setIsMenuOpen(false);
    setIsOpen(false);
    setIsSearchFocused(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      
      // Close search results when clicking outside search container
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuList = [
    { id: 1, name: "Home", icon: Home, href: "/" },
    { id: 2, name: "Semua Game", icon: Gamepad, href: "/game" },
    { id: 3, name: "Cek Transaksi", icon: SearchIcon, href: "/transaction" },
  ];

  const UserAvatar = ({ className = "" }) => (
    user?.image ? (
      <div className={`relative w-full h-full rounded-full overflow-hidden ${className}`}>
        <Image src={user.image} alt={user.username} fill className="object-cover" />
      </div>
    ) : (
      <User className={`text-gray-500 ${className}`} />
    )
  );

  const SearchBar = () => (
    <div className="flex w-full gap-2 border rounded-md p-2 bg-transparent">
      <Search className="h-5 w-5 text-gray-300" />
      <input
        ref={inputRef}
        className="outline-none bg-transparent w-full text-gray-300 placeholder:text-gray-400"
        type="text"
        placeholder="Cari Game"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
      />
    </div>
  );

  const SearchResults = () => (
    <div className="absolute top-full left-0 w-full bg-gray-700 border border-gray-600 rounded-md mt-2 z-50">
      {loading ? (
        <div className="p-4 text-gray-300">Loading...</div>
      ) : filteredGames?.length > 0 ? (
        filteredGames.map((g) => (
          <Link href={`/game/${g.slug}`} key={g._id}>
            <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-600">
              <img
                src={g.image}
                alt={g.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-white">{g.name}</span>
                <p className="text-sm text-gray-300">{g.description}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="p-4 text-gray-300">Game tidak ditemukan</div>
      )}
    </div>
  );

  const UserInfo = ({ isMobile = false }) => (
    <div
      className={`${
        isMobile
          ? "flex flex-col gap-2"
          : "absolute right-0 mt-2 w-48 bg-gray-700 border shadow-lg rounded-lg p-4"
      } z-10`}
    >
      {isMobile ? (
        <>
          <div className="px-4 py-3 bg-gray-600 rounded-md">
            <p className="font-semibold text-gray-200">{user.username}</p>
            <p className="text-sm text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-300">{user.phoneNumber}</p>
          </div>
          <Link
            href="/account"
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-600 rounded-md"
          >
            <User2 className="h-5 w-5" />
            <span>Akun</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-600 rounded-md text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <>
          <p className="font-semibold text-gray-300">{user.username}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-400">{user.phoneNumber}</p>
          <hr className="my-2 border-gray-600" />
          <Link href="/account" className="block w-full">
            <button className="w-full text-left py-1 px-2 text-gray-300 hover:text-green-300 flex items-center">
              <User2 className="mr-2" size={16} />
              Akun
            </button>
          </Link>
          <button
            onClick={logout}
            className="w-full text-left py-1 px-2 text-red-500 hover:text-red-400 flex items-center"
          >
            <LogOut className="mr-2" size={16} />
            Logout
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <div
        className={`sticky top-0 left-0 w-full p-4 transition-all duration-300 z-50 ${
          isScrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-gray-900"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto flex justify-between gap-5 items-center px-5">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold text-green-400">
            GameStore
          </Link>

          {/* Search Box (Desktop Only) */}
          <div 
            className="hidden lg:flex w-1/2 relative" 
            ref={searchContainerRef}
          >
            <SearchBar />
            {searchQuery && isSearchFocused && <SearchResults />}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2"
            >
              <Search className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Menu Buttons (Desktop) */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-1/2 lg:h-10 mx-auto gap-2">
            {menuList.map((menu) => (
              <Link
                href={menu.href}
                key={menu.id}
                className={`text-gray-300 px-2 py-1 rounded-md hover:bg-gray-700 ${
                  pathname === menu.href ? "bg-green-600" : ""
                }`}
              >
                <div className="flex items-center gap-2 px-2">
                  <menu.icon className="h-5 w-5" />
                  <span>{menu.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* User Icon / Login Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={avatarRef}>
                <div
                  className="border rounded-full bg-slate-50 cursor-pointer w-10 h-10 flex items-center justify-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <UserAvatar />
                </div>
                {isOpen && <UserInfo />}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="default">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div 
          className="lg:hidden fixed top-16 left-0 w-full bg-gray-800 p-4 z-50"
          ref={searchContainerRef}
        >
          <SearchBar />
          {searchQuery && isSearchFocused && <SearchResults />}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Side Navigation */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-700 shadow-lg p-5 flex flex-col gap-4 lg:hidden z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white">
            GameStore
          </Link>
          <button
            className="text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
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
        <div className="mt-auto border-t border-gray-600 pt-4">
          {user ? (
            <UserInfo isMobile />
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="w-full">
                <Button variant="default" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;