import { Box } from './App.styled';
import propTypes from 'prop-types';


const { Component } = require('react');


export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  inputChange = event => {
    // const { name, value } = event.currentTarget;
    this.setState({
      [ event.currentTarget.name]:  event.currentTarget.value,
    });
  };

  formSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };


  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <Box>
          <label >
            Name:{' '}
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.inputChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label >
            Number:{' '}
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.inputChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit"> Add contact🆕</button>
        </Box>
      </form>
    );
  }
}

Form.propTypes = {
  state: propTypes.object,
  name: propTypes.string,
  number: propTypes.number,
  formSubmit: propTypes.func,
  inputChange: propTypes.func,
};
