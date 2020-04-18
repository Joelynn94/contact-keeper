const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

const User = require('../models/User')
const Contact = require('../models/Contact')

// @route   GET /api/contacts
// @desc    Get all users contact
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // find by anything - in this case find by req.user.id - which is the object id
    // sort by date - date -1 makes it the most recent contacts first
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
    // send the json - contacts array 
    res.json(contacts)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server error')
  }
})

// @route   POST /api/contacts
// @desc    Add new contact
// @access  Private
// checking the auth middleware and express validator
router.post('/', 
[ 
  auth, [
  check('name', 'Name is required')
    .not()
    .isEmpty()
  ] 
], 
async (req, res) => {
  const errors = validationResult(req);
  // check is errors is empty 
  if(!errors.isEmpty()) {
    // sends a status of 400 and sends json data that gives back an array of errors
    return res.status(400).json({ errors: errors.array() })
  }

  // take out (destructure) name, email, phone and type from the req body
  const { name, email, phone, type } = req.body;

  try {
    // if the contact doesn't exist - created a new instance of a contact
    const newContact = new Contact({
      // ES6 syntax for key - value pairs = name: name
      name,
      email,
      phone,
      type,
      user: req.user.id
    })

    // save the new contact to the database
    const contact = await newContact.save()

    // send the conatct 
    res.json(contact)

  } catch (err) {
    // gives us a clear message of what is wrong
    console.error(err.message);
    // send status of 500 (server erro) and send a message
    res.status(500).send('Server error');
  }
})

// @route   UPDATE /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  // take out (destructure) name, email, phone and type from the req body
  const { name, email, phone, type } = req.body;

  // Build a contact object
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try {
    // get the contact by id using req.params.id
    let contact = await Contact.findById(req.params.id);

    // if the contact is not found 
    if(!contact) {
      return res.status(404).json({ msg: 'Contact not found' })
    }

    // make sure the user owns the contact 
    // start with comparing the contact with the user token
    // contact.user by default is not a string - have to add toString() method to turn into a string
    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    // want to update by id using req.params.id 
    // add more option objects 
    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, 
    { new: true });

    // send the updated contact
    res.json(contact)

  } catch (error) {
    // gives us a clear message of what is wrong
    console.error(err.message);
    // send status of 500 (server erro) and send a message
    res.status(500).send('Server error');
  }
})

// @route   DELETE /api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // get the contact by id using req.params.id
    let contact = await Contact.findById(req.params.id);

    // if the contact is not found 
    if(!contact) {
      return res.status(404).json({ msg: 'Contact not found' })
    }

    // make sure the user owns the contact 
    // start with comparing the contact with the user token
    // contact.user by default is not a string - have to add toString() method to turn into a string
    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    // want to delete by id using req.params.id 
    await Contact.findByIdAndRemove(req.params.id)

    // send a message saying the contact was deleted
    res.json({ msg: 'Contact removed' })
    
  } catch (error) {
    // gives us a clear message of what is wrong
    console.error(err.message);
    // send status of 500 (server erro) and send a message
    res.status(500).send('Server error');
  }
})

module.exports = router