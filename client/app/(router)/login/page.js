"use client";
import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/app/(store)/useUserContext";
import { Loader, LogInIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // Jika pengguna sudah login, tampilkan loading atau tidak tampilkan apa-apa
  if (user) {
    return (
      <div className="bg-gray-800 min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 min-h-screen flex items-center px-5 justify-center">
      <Card className="bg-gray-900 border border-gray-700 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-500 text-center">
            Login
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Masuk ke akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-100"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-gray-800 border border-gray-700 text-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-1 bg-gray-800 border border-gray-700 text-gray-100"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <LogInIcon className="h-5 w-5" aria-hidden="true" />
                  Login
                </>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-400">Belum punya akun? </span>
            <Link href="/signup" className="text-green-500 hover:underline">
              Daftar di sini
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;