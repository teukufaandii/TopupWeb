"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload, Loader2 } from "lucide-react";
import { useUserContext } from "@/app/(store)/useUserContext";

const SettingsPage = () => {
  const { user, loading, updateUser, isEmailVerified, updatePassword, uploadImage } =
    useUserContext();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("/dummyprofile.png");
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    setUsername(user.username || "");
    setEmail(user.email || "");
    setPhone(user.phoneNumber || "");
    setImage(user.image || "/dummyprofile.png");
  }, [user, router]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUser({ username, email, phone });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    updatePassword({ currentPassword, newPassword, confirmPassword });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleUploadConfirm = async () => {
    if (!previewImage) return;
    setIsUploading(true);

    await uploadImage({ image: previewImage });
    setImage(previewImage);
    setPreviewImage(null);
    setIsUploading(false);
  };

  return (
    <div className="bg-gray-800 min-h-screen pb-10">
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

      <div className="relative w-32 h-32 mx-auto -mt-16 mb-6 border-4 border-gray-900 rounded-full overflow-hidden group">
        <label htmlFor="profile-upload" className="cursor-pointer">
          {isUploading ? (
            <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <Loader2 className="animate-spin w-10 h-10 text-white" />
            </div>
          ) : (
            <>
              <Image
                src={previewImage || image}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </>
          )}
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {previewImage && (
        <div className="flex justify-center mb-6">
          <Button
            onClick={handleUploadConfirm}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isUploading}
          >
            {isUploading ? "Mengunggah..." : "Upload Gambar"}
          </Button>
        </div>
      )}

      <div className="max-w-screen-md mx-auto px-5">
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
              <Button type="submit" className="bg-green-500 hover:bg-green-600 w-full">
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