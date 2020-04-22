import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

function ContactForm() {
  // will give us access to any methods or state from the context
  // the reason we are using this is to call the method addContact from the context
  const contactContext = useContext(ContactContext)
  // destructor from the context 
  const { addContact, updateContact, clearCurrent, current } = contactContext

  useEffect(() => {
    // if current is not equal to null
    if(current !== null) {
      // setContact (set the form) will fill the form with whatever we want (its the state) - we are going to set the contact to the current object - its the complete contact of whatever contact we clicked on the edit 
      setContact(current)
    } else {
      // set current state back to an empty object
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      })
    }
    // adding contactContext and current as dependancies - because we only want this to happen on certain occasions (hence - dependant) if one of these were changed 
  }, [contactContext, current])

  // instead of writing state for each field, just going to have a single object with all the fields
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  })

  // pull the values out of contact state 
  const { name, email, phone, type } = contact

  const onChange = event => {
    // have to put the object - first need to copy the state using the spread operator 
    // then dynamically grab the name (put the key in brackets [] ) and values using the event.target
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    // prevent default behavior 
    event.preventDefault()
    // call the addContact method from the contact - and pass in the state of the form fields using (contact)
    if(current === null) {
      addContact(contact)
    } else {
      // submit whatever is currently in the form 
      updateContact(contact)
    }
    // set/clear form back to default state 
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    })
  }

  const clearAll = () => {
    clearCurrent();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input 
        type="text" 
        placeholder="Name" 
        name="name" 
        value={name}
        onChange={onChange}
      />
      <input 
        type="email" 
        placeholder="Email" 
        name="email" 
        value={email}
        onChange={onChange}
      />
      <input 
        type="phone" 
        placeholder="Phone" 
        name="phone" 
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input 
        type="radio" 
        name="type" 
        value="personal" 
        checked={type === 'personal'}
        onChange={onChange}
      /> Personal{' '}
      <input 
        type="radio" 
        name="type" 
        value="professional" 
        checked={type === 'professional'}
        onChange={onChange}
      /> Professional{' '}
      <div>
        <input 
          type="submit" 
          value={current ? 'Update Contact' : 'Add Contact'} 
          className="btn btn-primary btn-block"
        />
      </div>
      {current && <div>
        <button 
          className="btn btn-light btn-block"
          onClick={clearAll}>
            Clear
        </button>  
      </div>}
    </form>
  )
}

export default ContactForm
