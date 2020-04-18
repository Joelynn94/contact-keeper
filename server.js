const express = require('express');

// initialize express
const app = express()
// set the port 
const PORT = process.env.PORT || 5000;

// get route
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the contact keep api'})
})

// Define routes 
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

// express server listening 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})