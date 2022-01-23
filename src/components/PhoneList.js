import React from "react";
import PropTypes from "prop-types";

const PhoneList = ({ contacts, onDeleteContact }) =>
    <ul>
        {contacts.map(({ id, name, number }) =>
            <li key={id}>
                <p>{name}</p>
                <p>{number}</p>
                <button type="button" onClick={() => onDeleteContact(id)}>Delete</button>
            </li>)}
    </ul>

PhoneList.propTypes = {
    onDeleteContact: PropTypes.func,
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })
    )
};

export default PhoneList;