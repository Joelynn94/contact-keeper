import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case USER_LOADED: 
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case REGISTER_SUCCESS:
      // put the token we get back - inside of localstorage
      // we want to set a item called token and we want to get it from action.payload which is the object 
      localStorage.setItem('token', action.payload.token)
      return {
        // spread current state 
        ...state,
        // put the token into state
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      // remove the token form localstorage on any failed register
      localStorage.removeItem('token')
      return {
        ...state,
        // here we want to reset the state
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        // the error message from the auth action will be sent from the payload so we can see the message 
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}