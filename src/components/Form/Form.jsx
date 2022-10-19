import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import React from 'react';
import css from './Form.module.css';

export class FormPhone extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { name: '', number: '' };

  handelChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  onSubmitnForm = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const nameInputId = nanoid();
    const numberInputId = nanoid();

    return (
      <div className={css.sectionForm}>
        <h2>PhoneBook</h2>

        <form className={css.form} onSubmit={this.onSubmitnForm}>
          <label htmlFor={nameInputId} className={css.label}>
            <span className={css.name}>Name</span>
            <input
              className={css.input}
              id={nameInputId}
              value={this.state.name}
              type="text"
              name="name"
              required
              onChange={this.handelChange}
            />
          </label>
          <label htmlFor={numberInputId} className={css.label}>
            <span className={css.name}>Number</span>
            <input
              className={css.input}
              id={numberInputId}
              value={this.state.number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handelChange}
            />
          </label>
          <button type="submit" className={css.click}>
            Add a contact
          </button>
        </form>
      </div>
    );
  }
}
