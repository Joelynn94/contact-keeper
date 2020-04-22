

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../types'

// the reducer takes in the state and an action
export default (state, action) => {
  switch(action.type) {
    case ADD_CONTACT:
      return {
        // copy the current state
        ...state,
        // state is immutable so you have to copy the contacts from the state first then make changes 
        contacts: [
          ...state.contacts,
          action.payload
        ]
      };
      case UPDATE_CONTACT:
        return {
          // copy current state
          ...state,
          // take contacts array and set to state.contacts
          // map for each contact - if contact.id is equal to action.payload.id (the action.paylod is the entire contact) so we are just matching the id's
          // if they match return the updated contact otherwise return contact as is
          contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
        };
      case DELETE_CONTACT:
        return {
          // copy current state 
          ...state,
          // get the current array of contacts from state and filter the results 
          // evalute where the contact ID is not equal to the payload - which will return all contacts that are not the current id
          // we want to filter out that specific contact so that is goes away
          contacts: state.contacts.filter(contact => contact.id !== action.payload)
        };
      case SET_CURRENT:
        return {
          // copy current state 
          ...state,
          // set payload to the entire contact object
          current: action.payload
        };
      case CLEAR_CURRENT:
        return {
          // copy current state 
          ...state,
          // set current back to null
          current: null
        };
      case FILTER_CONTACT: 
        return {
          // copy current state 
          ...state,
          // get inital data from contacts in the state but we are filling the filtered value
          filtered: state.contacts.filter(contact => {
            // create regular expression - which is going to be the text - we want to match 
            // the text is coming into the payload
            // regex parameter 'gi' is global and case insensitive
            const regex = new RegExp(`${action.payload}`, 'gi');
            // return the contact name - call .match() methode to match the name that the text that is typed in, matches  
            // or search by email 
            return contact.name.match(regex) || contact.email.match(regex)
          })
        };
      case CLEAR_FILTER:
        return {
          // copy current state 
          ...state,
          // set current back to null
          filtered: null
        };
    default: 
      return state
  }
}
