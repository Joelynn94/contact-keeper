import React, { useReducer } from 'react'
import {v4 as uuidv4} from 'uuid'
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types'

// create initial state 
const AlertState = props => {
  // array of objects 
  const initialState = []
  // pull out state and dispatch from reducer 
  // state allows us to access anything in our state 
  // dispatch allows us to dispatch objects to the reducer 
  const [state, dispatch] = useReducer(alertReducer, initialState)

  // set alert
  const setAlert = (msg, type) => {
    // get a random id
    const id = uuidv4();
    // send a dispatch to out reducer with the type and send a payload - which is an object with the msg, type and id
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }  
    })

    // so alert disapears 
    // payload will be the id because we need to know which alert to remove 
    setTimeout(() => dispatch({ type: REMOVE_ALERT, paylod: id }), 5000)
  }

  // return our provider to wrap the application
  return (
    <AlertContext.Provider
      // anything you want to be able to access from other components needs to go here 
      // which includes state and actions
      value={{
        // state vlaues 
        // the entire array is our state value here 
        alerts: state,
        // methods 
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  ) 
}

export default AlertState