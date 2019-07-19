import React from 'react';
import classes from './Gradient.module.css';

const gradient = (props) => {

    let gradientClasses = [];
    switch( props.color ){
        case 'purple':
            gradientClasses.push(classes.GradientPurple);
            break;
        case 'blue':
            gradientClasses.push(classes.GradientBlue);
            break;
        case 'orange':
            gradientClasses.push(classes.GradientOrange);
            break;
        case 'red':
            gradientClasses.push(classes.GradientRed);
            break;
        case 'start':
        default:
            gradientClasses.push(classes.GradientStart);
            break;
    };

    if( props.active ){
        gradientClasses.push(classes.GradientActive);
    }

    return (
        <div className={gradientClasses.join(' ')}></div>
    );
}

export default gradient;