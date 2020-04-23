import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

function Login(props) {
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    // if authenticated - redirect 
    if(isAuthenticated) {
      props.history.push('/')
    }

    // checking to see if the error message matches 
    if(error === 'Invaild credentials') {
      setAlert(error, 'danger')
      clearErrors()
    } 
    // error is a dependancy for this useEffect hook
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])


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
    if(email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger')
    } else {
      login({
        email,
        password
      })
    }
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
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
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
