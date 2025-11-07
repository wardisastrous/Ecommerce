// src/utils/auth.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 🔐 Hash password before saving
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// 🔑 Compare plain vs hashed password
export const comparePassword = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};

// 🪪 Generate JWT
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // 7 days validity
  );
};

// ✅ Verify JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
