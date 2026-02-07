const express = require("express");
const router = express.Router();
const { signUp, login, getMe } = require("../controllers/AuthController");
const protect = require("../middlewares/authMiddleware");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
