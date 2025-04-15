const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../Config/db.cjs");
require("dotenv").config();

// Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
  return refreshToken;
};

// Login controller
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Password check error" });
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const payload = { id: user.id, email: user.email };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      // Store refresh token in HTTP cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // valid for 7 days
      });
      // for frontend uses
      return res.status(200).json({
        message: "Login successful",
        accessToken,
      });
    });
  });
};


//register controller
const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  findUserByEmail(email, (err, existingUser) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Hashing failed" });

      createUser(username, email, hashedPassword, (err, userId) => {
        if (err) return res.status(500).json({ message: "Insert error" });

        res.status(201).json({
          message: "User registered successfully",
          userId,
        });
      });
    });
  });
};

//referesh Token
const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken({ id: user.id, email: user.email });
    res.json({ accessToken: newAccessToken });
  });
};

//Logout controller
const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
};

// Token verify(using in routing)
const verifyToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.status(200).json({ message: "Token is valid", user });
  });
};

//exporting 
module.exports = {
  login,
  register,
  refreshToken,
  logout,
  verifyToken,
};
