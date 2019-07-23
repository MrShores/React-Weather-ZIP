import React from 'react';
import classes from './Credits.module.css';

const credits = (props) => {
    
    let cssClasses = [classes.Credits];
    if( props.isError && props.currentView === 'zipCode404' ){
        cssClasses.push(classes.Error);
    }

    return (
        <div className={cssClasses.join(' ')}>
            <div className={classes.CreditsText}>
                <span>React Weather App</span>&ensp;/&ensp;
                <a href="https://github.com/MrShores/react-weather-zip" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        </div>
    );
};

export default credits;