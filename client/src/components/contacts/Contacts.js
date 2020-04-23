import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'
import Spinner from '../layout/Spinner'

function Contacts() {
  // bring in the context - which will give us access to any state or action associated with the context (ContactContext)
  const contactContext = useContext(ContactContext)

  // pull out the contacts from the Context
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, [])

  // if there are not contacts, display a message to add contacts
  if(contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>
  }

  return (
    <Fragment>
      {/* If filtered is not equal to null - take each filtered contact and load the contactitem component on to the page */}
      {/* Else, loop over the contacts, for each contact pass in the prop of contact that ContactItem component will use */}
      {contacts !== null && !loading ? 
      (<TransitionGroup>
        {filtered !== null 
          ? filtered.map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
            ))
          : contacts.map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem contact={contact}/>
            </CSSTransition>
            ))}
      </TransitionGroup>) 
      : <Spinner />}
    </Fragment>
  )
}

export default Contacts