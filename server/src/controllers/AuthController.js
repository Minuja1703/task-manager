const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

//Sign Up
const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hasedPassword });

    await user.save();

    return res.status(201).json({
      message: "User created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(401).json({
        message: "Invalid Credentials.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid Credentials.",
      });
    }

    const token = generateToken(userExists);
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Login successful.",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

//Check for authenticated user
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login, getMe };
