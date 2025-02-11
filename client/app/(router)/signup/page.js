import React from "react";
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

const Signup = () => {
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <Card className="bg-gray-900 border border-gray-700 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-500 text-center">
            Daftar
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Buat akun baru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-100">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                className="mt-1 bg-gray-800 border border-gray-700 text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="mt-1 bg-gray-800 border border-gray-700 text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="mt-1 bg-gray-800 border border-gray-700 text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-100">
                Konfirmasi Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Konfirmasi Password"
                className="mt-1 bg-gray-800 border border-gray-700 text-gray-100"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Daftar
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-400">Sudah punya akun? </span>
            <Link href="/login" className="text-green-500 hover:underline">
              Login di sini
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;