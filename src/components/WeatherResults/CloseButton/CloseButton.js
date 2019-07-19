import React from 'react';
import classes from './CloseButton.module.css';

const closeButton = (props) => (
    <button className={classes.CloseButton} onClick={props.click}>
        <span>&times;</span>
    </button>
);

export default closeButton;
