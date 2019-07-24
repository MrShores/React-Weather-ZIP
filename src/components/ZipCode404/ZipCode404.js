import React from 'react';
import classes from './ZipCode404.module.css';
import './ZipCode404.animation.css';
import trex from '../../assets/images/dinosaur--t-rex.png';

const zipCode404 = (props) => {

    const cssClasses = props.show
        ? [classes.ZipCode404, classes.Show]
        : [classes.ZipCode404];

    return (
        <div className={cssClasses.join(' ')} onClick={props.close404}>
            <div className={classes.ZipCode404Background}></div>

            <div className={classes.Trex}>
                <img src={trex} alt="" />
            </div>

            <div className={classes.TryAgain}>
                <button onClick={props.close404}>T-Rex ate your ZIP code!</button>
            </div>

            <div className={classes.Attribution}>
                Vector Art by <a target="_blank" rel="noopener noreferrer" href="https://www.vecteezy.com/">Vecteezy!</a>
            </div>
        </div>
    );
};

export default zipCode404;