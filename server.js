const express = require('express');
const connectDB = require('./config/db')

// initialize express
const app = express()
// set the port 
const PORT = process.env.PORT || 5000;

// connect database 
connectDB();

// init middleware
app.use(express.json({ extended: true }))

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