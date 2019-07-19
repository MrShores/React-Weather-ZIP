import React from 'react';
import classes from './ZipCode404.module.css';
import './ZipCode404.animation.css';
import trex from '../../assets/images/dinosaur--t-rex.png';

const zipCode404 = (props) => {
    return (
        <div className={classes.ZipCode404} onClick={props.close404}>
            <div className={classes.ZipCode404Background}></div>

            <img className={classes.Trex} src={trex} alt="" />

            <button className={classes.TryAgain} onClick={props.close404}>
                T-Rex ate that ZIP code!
            </button>

            <div className={classes.Attribution}>
                Vector Art by <a target="_blank" rel="noopener noreferrer" href="https://www.vecteezy.com/">Vecteezy!</a>
            </div>
        </div>
    );
};

export default zipCode404;