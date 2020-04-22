import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

// create initial state 
const AuthState = props => {
  const initialState = {
    // access the browset localstorage to get the user token 
    token: localStorage.getItem('token'),   
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  }
  // pull out state and dispatch from reducer 
  // state allows us to access anything in our state 
  // dispatch allows us to dispatch objects to the reducer 
  const [state, dispatch] = useReducer(authReducer, initialState)

  // load user 
  const loadUser = () => {
    console.log('load user')
  }

  // register user 
  const register = async formData => {
    // axios config object - with the headers you want to include 
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      // response will return a promise 
      // which takes in the url, the formData and the config object
      const response = await axios.post('/api/users', formData, config)
      // dispatch to the reducer with the type and payload
      // payload in the response - which is the token
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      })
    } catch (err) {
      // if there is an error 
      // send the err.response data  - with a message (msg)
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.masg
      })
      
    }
  }

  // login user 
  const login = () => {
    console.log('load user')
  }

  // logout 
  const logout = () => {
    console.log('load user')
  }

  // clear errors 
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }

  // return our provider to wrap the application
  return (
    <AuthContext.Provider
      // anything you want to be able to access from other components needs to go here 
      // which includes state and actions
      value={{
        // state vlaues 
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        // methods used 
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  ) 
}

export default AuthState