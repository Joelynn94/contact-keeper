import { SET_ALERT, REMOVE_ALERT } from '../types'

export default (state, action) => {
  switch(action.type) {
    case SET_ALERT:
      // returning any state inside the state array 
      // and the action.payload which is the alert that gets sent 
      return [...state, action.payload]
    case REMOVE_ALERT:
      // filter out (delete) alert based on the id
      return state.filter(alert => alert.id !== action.payload)
    default:
      return state
  }
}