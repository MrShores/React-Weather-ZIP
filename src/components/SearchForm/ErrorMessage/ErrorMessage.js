import React from 'react';
import classes from './ErrorMessage.module.css';

const errorMessage = (props) => {

    const errorClasses = [classes.ErrorMessage];
    if( props.show ){
        errorClasses.push(classes.Show);
    };

    return (
        <div className={errorClasses.join(' ')}>
            <span>{props.message}</span>
        </div>
    );
};

export default errorMessage;