import React, { useReducer } from 'react'
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

  // register user 

  // login user 

  // logout 

  // clear erros 

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  ) 
}

export default AuthState