import { Component } from 'react';
import { Form } from './FormApp';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import propTypes from 'prop-types';


class Application extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  filterInput = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  onFilterSearch = () => {
    return this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
  };

  deleteUser = userId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.number !== userId),
    }));
  };

  dataFormSubmit = data => {
    const searchName = this.state.contacts.map(contact => contact.name);
    if (searchName.includes(data.name)) {
      alert('Не получится добавить такое имя:(');
    } else {
      this.setState({ contacts: [data, ...this.state.contacts] });
    }
  };

  // componentDidMount() {
  //   const contactStorage = localStorage.getItem('contacts');
  //   const contactParse = JSON.parse(contactStorage);
  //   if (contactParse) {
  //     return this.setState({ contact: contactParse});
  //   }
  // }

  componentDidMount() {
    const contactStorage = localStorage.getItem('contacts');
    const contactParse = JSON.parse(contactStorage);
    if (contactParse) {
      return this.setState({ contacts: contactParse });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts.length !== prevState.contacts.length) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.dataFormSubmit} />
        <h2>Contacts</h2>
        <Filter onChange={this.filterInput} value={this.state.filter} />
        <ContactList
          listsContact={this.onFilterSearch()}
          onDelete={this.deleteUser}
        />
      </div>
    );
  }
}

export const App = () => {
  return <Application />;
};

Application.propTypes = {
  filterInput: propTypes.func,
  onFilterSearch: propTypes.func,
  deleteUser: propTypes.func,
  dataFormSubmit: propTypes.func,
  state: propTypes.object,
  contacts: propTypes.array,
}