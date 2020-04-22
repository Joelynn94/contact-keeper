import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'

function Contacts() {
  // bring in the context - which will give us access to any state or action associated with the context (ContactContext)
  const contactContext = useContext(ContactContext)

  // pull out the contacts from the Context
  const { contacts, filtered } = contactContext;

  // if there are not contacts, display a message to add contacts
  if(contacts.length === 0) {
    return <h4>Please add a contact</h4>
  }

  return (
    <Fragment>
      {/* If filtered is not equal to null - take each filtered contact and load the contactitem component on to the page */}
      {/* Else, loop over the contacts, for each contact pass in the prop of contact that ContactItem component will use */}
      <TransitionGroup>
      {filtered !== null 
        ? filtered.map(contact => (
          <CSSTransition key={contact.id} timeout={500} classNames='item'>
            <ContactItem contact={contact} />
          </CSSTransition>
          ))
        : contacts.map(contact => (
          <CSSTransition key={contact.id} timeout={500} classNames='item'>
            <ContactItem contact={contact}/>
          </CSSTransition>
          ))}
      </TransitionGroup>
    </Fragment>
  )
}

export default Contacts