import React, { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";;

class PhoneEditor extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        name: '',
        number: ''
    }

    nameInputId = nanoid();
    numberInputId = nanoid();

    handleChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    };

    findContactName = contactName => {
        return this.props.contacts.some(({ name }) => name === contactName)
    };

    handleSubmit = e => {
        e.preventDefault();
        const { name } = this.state;

        if (this.findContactName(name)) {
            alert(`${name} is already in contacts!`);
            return;
        }

        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({ name: '', number: '' });
    }

    render() {
        const { name, number } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor={this.nameInputId}>
                    <span>Name</span>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        id={this.nameInputId}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </label>
                <label htmlFor={this.numberInputId}>
                    <span>Number</span>
                    <input
                        type="tel"
                        name="number"
                        value={number}
                        onChange={this.handleChange}
                        id={this.numberInputId}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
                <button type="submit" className="addButton">Add contact</button>
            </form>
        );
    }
}

export default PhoneEditor;