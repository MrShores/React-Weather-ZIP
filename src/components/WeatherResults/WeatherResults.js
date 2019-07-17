import React, { Component } from 'react';
import classes from './WeatherResults.module.css';

class Weather extends Component {

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

    render() {

        const w = this.props.weather;

        return (
            <div className={classes.WeatherResults}>
                <button className={classes.Close}><span>&times;</span></button>
                <div className={classes.Weather}>
                    <div className={classes.Temperature}>
                        {w.main.temp.toFixed()}°
                    </div>
                    <div className={classes.City}>{w.name}</div>
                    <div>
                        Low: {w.main.temp_min.toFixed()}°<br />
                        High: {w.main.temp_max.toFixed()}°
                    </div>
                    <div>
                        Humidity: {w.main.humidity.toFixed()}
                        <span className={classes.Unit}>%</span>
                    </div>
                    <div>
                        Pressure: {w.main.pressure}
                        <span className={classes.Unit}>hPa</span>
                    </div>
                    <div>
                        Visibility: {this.metersToMiles(w.visibility)}
                        <span className={classes.Unit}>miles</span>
                    </div>
                    <div>
                        Wind: {this.windSpeed(w.wind.speed)}
                        <span className={classes.Unit}>mph</span>
                    </div>
                    <div className={classes.Updated}>
                        Updated: {this.updatedTime(w.dt)}
                    </div>
                </div>
            </div>
        );
    };
}

export default Weather;