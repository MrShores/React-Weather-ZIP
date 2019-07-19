import React from 'react';
import classes from './WeatherResult.module.css';
import './WeatherResult.animation.css';

import { CSSTransition } from 'react-transition-group';

const result = (props) => {

    const style = {
        transition: 'opacity 300ms ' + (300 + 60 * props.index) + 'ms ease-out'
    }

    return (
        <CSSTransition
            in={true}
            timeout={2000}
            appear={true}
            classNames="weatherResult"
            mountOnEnter
            unmountOnExit
        >
            <div
                className={classes.WeatherResult}
                style={style}
            >
                <div className={classes.Label}>
                    {props.label}
                </div>
                <div className={classes.Value}>
                    <span className={classes.Number}>
                        {props.value}
                    </span>
                    <span className={props.full ? classes.UnitFull : classes.Unit}>
                        {props.unit}
                    </span>
                </div>
            </div>
        </CSSTransition>
    );
};

export default result;