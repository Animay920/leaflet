const express = require("express");
const {
  login,
  register,
  refreshToken,
  logout,
  verifyToken,
} = require("../controllers/authController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/refresh-token", refreshToken);
router.get("/verify-token", authenticateJWT, verifyToken);
router.post("/logout", logout);



module.exports = router;
