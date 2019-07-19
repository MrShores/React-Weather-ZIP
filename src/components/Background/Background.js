import React from 'react';
import classes from './Background.module.css';
import Gradient from './Gradient/Gradient';

const background = (props) => {

    const colors = [
        'start',
        'purple',
        'blue',
        'blueLight',
        'orange',
        'red',
    ];

    let gradients = colors.map((color, index) => {
        const active = color === props.gradientColor ? true : false;
        return <Gradient key={index} color={color} active={active} />;
    });

    return (
        <div className={classes.Background}>
            {gradients}
            <div className={classes.BackgroundScreen}></div>
        </div>
    );
}

export default background;