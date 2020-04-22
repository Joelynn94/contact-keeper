import React, { useState } from 'react'

function Register() {
  // set inital state 
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  // destructure user 
  const { name, email, password, password2 } = user

  const onChange = event => {
    setUser({
      // copy the user state 
      ...user,
      // grab the name and values dynamically
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    console.log('Register submit')
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text"
            name="name"
            value={name}
            onChnage={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="text"
            name="email"
            value={email}
            onChnage={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="text"
            name="password"
            value={password}
            onChnage={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input 
            type="text"
            name="password2"
            value={password2}
            onChnage={onChange}
          />
        </div>
        <input 
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  )
}

export default Register
