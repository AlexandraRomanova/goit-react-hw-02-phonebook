import React, { Component } from "react";
import { nanoid } from "nanoid";
import PhoneEditor from "./components/PhoneEditor";
import PhoneList from "./components/PhoneList";
import Filter from "./components/Filter";
import PropTypes from "prop-types";

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  };

  static propTypes = {}

  addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    }

    // const duplicateContactName = this.state.contacts.find(contact => contact.name === newContact.name);
    // const duplicateContactNumber = this.state.contacts.find(contact => contact.number === newContact.number);

    //  if (duplicateContactName) {
    //    alert(`${newContact.name} is already in contacts!`);
    //    return;
    // };

    // if (duplicateContactNumber) {
    //    alert(`${newContact.number} is already in contacts! ${duplicateContactNumber.name} has this number`);
    //    return;
    // };


    this.setState(({contacts}) => ({ contacts: [newContact, ...contacts]}))
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }


  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <PhoneEditor onSubmit={this.addContact} contacts={visibleContacts} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter}/>
        <PhoneList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
};

export default App;
