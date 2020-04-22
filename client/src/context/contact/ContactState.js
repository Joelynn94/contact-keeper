import React, { useReducer } from 'react'
import {v4 as uuidv4} from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../types'

// create initial state 
const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Johnson',
        email: 'sara@gmail.com',
        phone: '111-111-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Jane Johnson',
        email: 'jane@gmail.com',
        phone: '111-111-3333',
        type: 'professional'
      }
    ],
    current: null,
    filtered: null
  }
  // pull out state and dispatch from reducer 
  // state allows us to access anything in our state 
  // dispatch allows us to dispatch objects to the reducer 
  const [state, dispatch] = useReducer(contactReducer, initialState)

  // add contact - takes in a contact 
  const addContact = contact => {
    contact.id = uuidv4();
    // dispatch the type and payload to the reducer 
    // sending the contact to the payload
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // delete contact using the id
  const deleteContact = id => {
    // dispatch the type and payload to the reducer 
    // sending the id to the payload
    dispatch({ type: DELETE_CONTACT, payload: id })
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
        // methods used 
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  ) 
}

export default ContactState