const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const token = generateToken();
  res.status(201).send({ user, token });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !await bcrypt.compare(req.body.password, user.password)) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }
  const token = generateToken();
  res.send({ user, token });
});
router.get('/p',protect,(req,res)=>{
    res.send({message:"sucessfully authenticated"})
})



module.exports = router;