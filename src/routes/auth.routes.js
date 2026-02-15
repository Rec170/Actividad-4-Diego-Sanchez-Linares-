const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    const user = new User({
      username,
      password,
      role: "user" 
    });

    await user.save();

    res.status(201).json({
      message: "Usuario creado correctamente"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Usuario no existe" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Credenciales inválidas" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
