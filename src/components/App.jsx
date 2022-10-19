import { Component } from 'react';
import { FormPhone } from './Form/Form';
import { TodoList } from './TodoList/TodoList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import React from 'react';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    if (this.isExistContact(name)) {
      alert`Such a contact has already been added`;
      return false;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = TodoId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(todo => todo.id !== TodoId),
    }));
  };

  isExistContact = name => {
    return this.state.contacts.some(item => item.name === name);
  };

  onSubmitHandel = data => {
    setTimeout(() => {
      console.log(data);
    }, 2000);
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const normolizeVisibleContact = filter.toLowerCase();

    const visibleContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizeVisibleContact)
    );

    return (
      <>
        <FormPhone
          contacts={contacts}
          onSubmit={this.addContact}
          onTest={this.componentDidUpdate}
        />
        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          contacts={visibleContact}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
