import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../types'

// create initial state 
const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  }
  // pull out state and dispatch from reducer 
  // state allows us to access anything in our state 
  // dispatch allows us to dispatch objects to the reducer 
  const [state, dispatch] = useReducer(contactReducer, initialState)

  // get contacts 
  const getContacts = async () => {

    try {
      const response = await axios.get('/api/contacts')
      // dispatch the type and payload to the reducer 
      // getting all of the contacts (response.data) to the payload
      dispatch({ 
        type: GET_CONTACTS, 
        payload: response.data 
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }

  }

  // add contact - takes in a contact 
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.post('/api/contacts', contact, config)
      // dispatch the type and payload to the reducer 
      // sending the new contact (response.data) to the payload
      dispatch({ 
        type: ADD_CONTACT, 
        payload: response.data 
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }

  }

  // delete contact using the id
  const deleteContact = id => {
    // dispatch the type and payload to the reducer 
    // sending the id to the payload
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  // clear contacts 
  const clearContacts = () => {
    // dispatch the type and payload to the reducer 
    // don't need to send a pyalod because we are setting this back to null
    dispatch({ type: CLEAR_CONTACTS })
  }

  // set current contact 
  const setCurrent = contact => {
    // dispatch the type and payload to the reducer 
    // sending the contact to the payload
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  // clear current contact 
  const clearCurrent = () => {
    // dispatch the type and payload to the reducer 
    // don't need to send a pyalod because we are setting this back to null
    dispatch({ type: CLEAR_CURRENT })
  }

  // update contact 
  const updateContact = contact => {
    // dispatch the type and payload to the reducer 
    // sending the contact to the payload
    dispatch({ type: UPDATE_CONTACT , payload: contact })
  }

  // filter contacts - take in text to filter 
  const filterContacts = text => {
    // dispatch the type and payload to the reducer 
    // sending the text as the payload
    dispatch({ type: FILTER_CONTACT , payload: text })
  }

  // clear filter 
  const clearFilter = () => {
    // dispatch the type and payload to the reducer 
    // don't need to send a pyalod because we are setting this back to null
    dispatch({ type: CLEAR_FILTER })
  }

  // return our provider to wrap the application
  return (
    <ContactContext.Provider
      // anything you want to be able to access from other components needs to go here 
      // which includes state and actions
      value={{
        // state vlaues 
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        // methods used 
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  ) 
}

export default ContactState