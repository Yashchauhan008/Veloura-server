const express = require('express');
const bcrypt  = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const router = express.Router();


//New User Register
router.post('/register', async (req, res) => {
  const { username, email, password,role } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully',userId: user._id });

  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
});

//User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // Create JWT Token
    const token = jwt.sign(
  { userId: user._id, role: user.role }, 
  process.env.JWT_SECRET,
  { expiresIn: '2h' }
);


    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});




module.exports = router;
