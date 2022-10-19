import css from './TodoList.module.css';
import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ contacts, onDeleteContact }) => (
  <ul className={css.todoList}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={css.todoList__item}>
        <p className={css.todoList__text}>{name}</p>
        <p className={css.todoList__text}>{number}</p>
        <button
          className={css.todoList__button}
          onClick={() => onDeleteContact(id)}
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
