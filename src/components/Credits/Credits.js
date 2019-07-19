import React from 'react';
import classes from './Credits.module.css';

const credits = () => (
    <div className={classes.Credits}>
        <div className={classes.CreditsText}>
            <span>React Weather App</span>&ensp;/&ensp;
            <a href="http://michaelshores.com" target="_blank" rel="noopener noreferrer">Michael Shores</a>
        </div>
    </div>
);

export default credits;