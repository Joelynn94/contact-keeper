import React, { useState } from 'react'

function Login() {
  // set inital state 
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  // destructure user 
  const { email, password } = user

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
    console.log('Login submit')
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
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
        <input 
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  )
}

export default Login
