const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied" });
  }

  // Extract token from "Bearer YOUR_TOKEN"
  const token = authHeader.split(" ")[1]; // Get the token part after "Bearer"

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = user; // Attach user information to the request
    next();
  });
};

module.exports = authenticateJWT;
