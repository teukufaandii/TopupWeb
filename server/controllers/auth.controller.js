import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { redis } from "../lib/redis.js";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "../lib/nodeMailer.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7 days
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);

      setCookies(res, accessToken, refreshToken);

      res.json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          token: accessToken,
          isVerified: user.isVerified,
          email: user.email,
          role: user.role,
        },
        message: "User logged in successfully",
      });
    } else {
      res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in login controller",
      error: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    let { username, email, password, confirmPassword, phoneNumber } = req.body;

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const phoneNumberExists = await User.findOne({ phoneNumber });
    if (phoneNumberExists) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (phoneNumber.startsWith("08")) {
      phoneNumber = phoneNumber.replace(/^08/, "+628");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        isVerified: user.isVerified,
        token: accessToken,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error creating user", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error logging out user", error.message);
    res
      .status(500)
      .json({ message: "Error logging out user", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    if (storedToken !== refreshToken) {
      return res
        .status(401)
        .json({ error: "Refresh token invalid or has expired" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Refresh token successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error refreshing token", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("Error in getProfile controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email, phone } = req.body;

    if (!username || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: req.user._id },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already in use" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { username, email, phoneNumber: phone } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be the same as current password",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and confirmation password do not match",
      });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log("Error in changePassword controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    const { image } = req.body;
    let cloudinaryRes = null;
    const user = await User.findById(req.user._id);

    if (image) {
      cloudinaryRes = await cloudinary.uploader.upload(image, {
        folder: "users",
      });
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    if (user.image) {
      const publicId = user.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`users/${publicId}`);
        console.log("deleted image from cloduinary");
      } catch (error) {
        console.log("error deleting image from cloduinary", error);
      }
    }

    const imageLink = cloudinaryRes?.secure_url ? cloudinaryRes.secure_url : "";

    user.image = imageLink;
    await user.save();

    const imageRes = {
      imageLink,
    };

    res.status(200).json({
      message: "Profile image uploaded successfully",
      image: imageRes,
    });
  } catch (error) {
    console.log("Error in uploadProfileImage controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const checkEmailVerified = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const checkVerify = await User.findOne({
      email: userEmail,
      isVerified: true,
    });

    if (checkVerify) {
      res
        .status(200)
        .json({ verified: true, message: "Email already verified" });
    } else {
      res.status(200).json({ verified: false, message: "Email not verified" });
    }
  } catch (error) {
    console.log("Error in checkEmailVerified controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const sendVerificationToken = async (req, res) => {
  const user = req.user;
  try {
    if (!user.email) {
      return res.status(400).json({ message: "Email not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const token = tokenGenerator();

    user.verificationToken = token;
    await user.save();

    await sendVerificationEmail(user.email, token);

    res.status(200).json({ message: "Verification token sent successfully" });
  } catch (error) {
    console.log("Error in sendVerificationToken controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const sendResetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user.resetPasswordToken && user.resetPasswordExpires > Date.now()) {
      return res.status(400).json({
        message:
          "You are already have a reset password request, please check your email",
      });
    }

    if (user.resetPasswordToken && user.resetPasswordExpires < Date.now()) {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = tokenGenerator();
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();

      await sendResetPasswordEmail(user.email, resetToken);
    }

    res.status(200).json({
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    console.log("Error in sendResetPasswordRequest controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = req.user;

    const userToken = await User.findOne({
      email: user.email,
      verificationToken: token,
    });

    if (userToken) {
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();

      res.status(200).json({
        message: "Email verified successfully",
      });
    } else {
      return res.status(400).json({ message: "Invalid token brok" });
    }
  } catch (error) {
    console.log("Error in verifyEmail controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const changeForgotPassword = async (req, res) => {
  const { token } = req.query;
  const { newPassword, confirmPassword } = req.body;
  try {
    if (!token) {
      return res.status(400).json({ message: "Token is required or invalid" });
    }

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log("Error in changeForgotPassword controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const tokenGenerator = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 6; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};
