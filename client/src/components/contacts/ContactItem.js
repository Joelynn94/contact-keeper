import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

function ContactItem({ contact }) {
  // pull in contact context to use 
  const contactContext = useContext(ContactContext);
  // pull the action deleteContact, setCurrent, clearCurrent from the context 
  const { deleteContact, setCurrent, clearCurrent } = contactContext
  // pull id, name, email, phone, type from the contact prop that is passed in
  const { id, name, email, phone, type } = contact

  // call deleteContact
  const onDelete = () => {
    // pulling the id out of contact that's passed into the props 
    deleteContact(id)
    // call clearCurrent from the context
    clearCurrent()
  }

  return (
    <div className="card bg-light">
      {/* If type is = professional, display the class badge-success otherwise display the class badge-primary */}
      <h3 className="text-primary text-left">
        {name}
        <span 
          style={{ float: 'right'}} 
          className={
            'badge ' + 
            (type === 'professional' ? 'badge-success' : 'badge-primary')}
        >
          {/* to get the first letter to uppsercase, user charAt(0) to get the first letter and then toUpperCase() method - however this will return only the first letter */}
          {/* Need to use .slice(1) on the type to leave off the first character because we already have that returned */}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {/* if there is an email display it with the value and an icon*/}
        {email && (
        <li>
          <i className="fas fa-envelope-open" /> {email}
        </li>
        )}
        {/* If there is a phone number display it with the value and an icon */}
        {phone && (
        <li>
          <i className="fas fa-phone" /> {phone}
        </li>
        )}
      </ul>
      <p>
        {/* Call setCurrent directly - setting current to the current contact which is coming from props*/}
        <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
        {/* Call onDelete function */}
        <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
      </p>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
}

export default ContactItem
