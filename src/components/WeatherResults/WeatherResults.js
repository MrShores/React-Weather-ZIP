import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './WeatherResults.module.css';
import CloseButton from './CloseButton/CloseButton';
import WeatherResult from './WeatherResult/WeatherResult';


class Weather extends Component {

    /* Lifecycle
    -------------------------------------------------------------------------*/

    componentWillUnmount() {
        this.props.mounted();
    }


    /* Methods
    -------------------------------------------------------------------------*/

    /**
     * Meter's to miles raw calculation
     */
    metersToMilesRaw = (meters) => {
        return meters * 0.000621371192;
    }

    /**
     * Meter's to miles w/ 1 decimal place
     */
    metersToMiles = (meters) => {
        const miles = this.metersToMilesRaw(meters);
        return miles.toFixed(1);
    }

    /**
     * Convert meters per second to miles per hour
     */
    windSpeed = (metersPerSecond) => {
        const milesPerSecond = this.metersToMilesRaw(metersPerSecond);
        return (milesPerSecond * 60 * 60).toFixed(1);
    }

    /**
     * Format time of weather update
     */
    updatedTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        const options = {
            hour12: true,
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: '2-digit',
            minute:'2-digit',
        };
        return date.toLocaleString('en-US', options);
    }


    /* Render
    -------------------------------------------------------------------------*/

    render() {

        const w = this.props.weather;

        return (
            <div className={classes.WeatherResults}>
                <CloseButton click={this.props.closeResults} />
                <div className={classes.Weather}>
                    <div className={classes.Temperature}>
                        {w.main.temp.toFixed()}°
                    </div>
                    <div className={classes.City}>{w.name}</div>

                    <WeatherResult
                        index={1}
                        label="Low"
                        value={w.main.temp_min.toFixed()}
                        unit="°"
                        full />
                    <WeatherResult
                        index={2}
                        label="High"
                        value={w.main.temp_max.toFixed()}
                        unit="°"
                        full />
                    <WeatherResult
                        index={3}
                        label="Humidity"
                        value={w.main.humidity.toFixed()}
                        unit="%" />
                    <WeatherResult
                        index={4}
                        label="Pressure"
                        value={w.main.pressure}
                        unit="hPa" />
                    <WeatherResult
                        index={5}
                        label="Visibility"
                        value={this.metersToMiles(w.visibility)}
                        unit="miles" />
                    <WeatherResult
                        index={6}
                        label="Wind"
                        value={this.windSpeed(w.wind.speed)}
                        unit="mph" />

                    <div className={classes.Updated}>
                        Updated: {this.updatedTime(w.dt)}
                    </div>
                </div>
            </div>
        );
    };
}

/**
 * Component Props
 */
Weather.propTypes = {
    mounted: PropTypes.func,
    closeResults: PropTypes.func,
    weather: PropTypes.object.isRequired,
}

export default Weather;