import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

function ContactFilter() {
  // use the context 
  const contactContext = useContext(ContactContext);
  // set ref value to an empty string by default
  const text = useRef('')

  const { filterContacts, clearFilter, filtered } = contactContext

  // to make sure the input does not keep text inside of it
  useEffect(() => {
    if(filtered === null) {
      // can access the text value since we used useRef
      text.current.value = ''
    }
  })

  //
  const onChange = event => {
    // text.current.value will get us the current value of the input 
    // check the value is not equal to an empty string
    if(text.current.value !== '') {
      // get the filterContacts method fron the context store
      // event.target.value will be actual text value
      filterContacts(event.target.value)
    } else {
      // call clearFilter method from the context stor 
      clearFilter()
    }
  }

  return (
    <form>
      <input 
        ref={text} 
        type="text" 
        placeholder="Filter contacts..."
        onChange={onChange}
      />
    </form>
  )
}

export default ContactFilter
