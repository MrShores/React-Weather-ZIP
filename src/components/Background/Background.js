import React from 'react';
import classes from './Background.module.css';

const background = (props) => {
 
    let bgClasses = [classes.Background, classes.Blue];

    return (
        <div className={bgClasses.join(' ')}>
            <div className={classes.BackgroundInner}></div>
        </div>
    );
}

export default background;