const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');

const User = require('../models/User')

// @route   GET /api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // get the user from the database by the user id
    // we don't want to send the password - so you need to add a method .select() and pass in '-password'
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

// @route   POST /api/auth
// @desc    Auth user and get token 
// @access  Public
router.post('/', [
  // validating email and password for login
  check('email', 'Please include a valid email')
    .isEmail(),
  check('password', 'Password is required')
    .exists()
], 
async (req, res) => {
  const errors = validationResult(req);
  // check is errors is empty 
  if(!errors.isEmpty()) {
    // sends a status of 400 and sends json data that gives back an array of errors
    return res.status(400).json({ errors: errors.array() })
  }

  // take out (destructure) email and password from the req body
  const { email, password } = req.body;

  try {
    // find a user based on any field - we are using email in this case
    let user = await User.findOne({ email })

    // if there is no user with that email send an error message
    if(!user){
      return res.status(400).json({ msg: 'Invaild credentials' })
    }

    // .compare() returns a promise 
    // takes in plain text password and the hash password (user.password) which is whatever is stored in the database
    const isMatch = await bcrypt.compare(password, user.password)

    // if there the passwords don't match send an error message
    if(!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    // create payload - this is the object you want to send in the token
    const payload = {
      user: {
        id: user.id
      }
    }

    // .sign() takes in a couple parameters 
    // first one is the payload 
    // second is the jwt secrect - get the jwt secret from config
    // next parameter is a object of options 
    jwt.sign(payload, config.get('jwtSecret'), {
      // when the jwt token exipres 
      expiresIn: 360000
      // then we need a callabck function
    }, (err, token) => {
      // if an error occurs - throw the error
      if (err) throw err;
      // this is a json object that will return the token 
      res.json({ token })
    })

  } catch (error) {
    // gives us a clear message of what is wrong
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

module.exports = router