"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";
import { useUserContext } from "@/app/(store)/useUserContext";

const SettingsPage = () => {
  // unfinished issue: data is removed when refresh

  const { user, updateUser, isEmailVerified, updatePassword } = useUserContext();
  const router = useRouter();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || "/dummyprofile.png"
  );

  console.log(isEmailVerified);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUser({ username, email, phone });
    console.log("Profile updated successfully");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    updatePassword({ currentPassword, newPassword, confirmPassword });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-gray-800 min-h-screen pb-10">
      {/* Banner */}
      <div className="relative w-full h-64 mb-10">
        <Image
          src="/profile-banner.jpg"
          alt="Game Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Pengaturan Akun</h1>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="relative w-32 h-32 mx-auto -mt-16 mb-6 border-4 border-gray-900 rounded-full overflow-hidden">
        <Image
          src={profilePicture}
          alt="Profile Picture"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex justify-center mb-6">
        <label
          htmlFor="profile-upload"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          <Upload className="w-5 h-5" />
          Unggah Gambar
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="max-w-screen-md mx-auto px-5">
        {/* User Info Form */}
        <Card className="bg-gray-900 border border-gray-700 p-5 mb-6">
          <CardHeader>
            <CardTitle className="text-gray-100">Informasi Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
                required
              />
              {isEmailVerified === true ? (
                <p className="text-green-500 text-lg font-semibold">
                  Email telah diverifikasi
                </p>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-red-500 text-lg font-semibold">
                    Email belum diverifikasi
                  </p>
                  <Button
                    onClick={() => router.push("/verify-email")}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Verifikasi Sekarang
                  </Button>
                </div>
              )}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
                required
              />
              <Input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
                required
              />
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 w-full"
              >
                Simpan Perubahan
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Change Password Form */}
        <Card className="bg-gray-900 border border-gray-700 p-5">
          <CardHeader>
            <CardTitle className="text-gray-100">Ubah Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input
                type="password"
                placeholder="Password Sekarang"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
                required
              />
              <Input
                type="password"
                placeholder="Password Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
                required
              />
              <Input
                type="password"
                placeholder="Konfirmasi Password Baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
                required
              />
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 w-full"
              >
                Simpan Perubahan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
