const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser); // For new student members to register
router.post("/login", loginUser); // For officers to log in

// Protected route
router.get("/me", protect, getMe); // To get current logged-in user info

module.exports = router;
