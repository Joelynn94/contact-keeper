const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

// @route   POST /api/users
// @desc    Register a user 
// @access  Public
router.post('/', [
  // validating name, email and password
  check('name', 'Please add name')
    .not()
    .isEmpty(),
  check('email', 'Please include a valide email')
    .isEmail(),
  check('password', 'Please enter a password with 6 or more characters')
    .isLength({ min: 6 })
],
async (req, res) => {
  const errors = validationResult(req);
  // check is errors is empty 
  if(!errors.isEmpty()) {
    // sends a status of 400 and sends json data that gives back an array of errors
    return res.status(400).json({ errors: errors.array() })
  }

  // take out name, email and password from the req body
  const { name, email, password } = req.body;

  try {
    // find a user based on any field - we are using email in this case
    let user = await User.findOne({ email })

    // if a user exists - throw an error and send json data
    if(user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    // if the user doesn't exist - created a new instance of a user
    user = new User({
      // ES6 syntax for key - value pairs = name: name
      name,
      email,
      password
    });

    // before saving user to the database we need to encrypt
    // need a salt to encrypt - genSalt returns a promise 
    // genSalt(10) determines how secure the password is 
    const salt = await bcrypt.genSalt(10)

    // take the password and hash it - bcrypt also returns a promise
    // bcrypt.hash() - takes in the plain text password and the salt
    user.password = await bcrypt.hash(password, salt)

    // save the user in the database
    await user.save()

    res.send('User saved')
  } catch (err) {
    // gives us a clear message of what is wrong
    console.error(err.message);
    res.status(500).send('Server error')
  }

})

module.exports = router