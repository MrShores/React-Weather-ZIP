import React, { Component } from 'react';
import './App.css';
import { CSSTransition } from 'react-transition-group';
import AnimateInOut from './hoc/AnimateInOut/AnimateInOut';
import Credits from './components/Credits/Credits';
import Background from './components/Background/Background';
import SearchForm from './components/SearchForm/SearchForm';
import WeatherResults from './components/WeatherResults/WeatherResults';
import Zip404Error from './components/ZipCode404/ZipCode404';
import Axios from 'axios';


/* CACHED DATA -- DELETE!
-----------------------------------------------------------------------------*/

const data = {
    "coord": {
        "lon": -121.49,
        "lat": 38.56
    },
    "weather": [
        {
        "id": 711,
        "main": "Smoke",
        "description": "smoke",
        "icon": "50d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 90.68,
        "pressure": 1010,
        "humidity": 31,
        "temp_min": 84.99,
        "temp_max": 95
    },
    "visibility": 12874,
    "wind": {
        "speed": 6.93,
        "gust": 5.7
    },
    "clouds": {
        "all": 1
    },
    "dt": 1563317358,
    "sys": {
        "type": 1,
        "id": 4838,
        "message": 0.0109,
        "country": "US",
        "sunrise": 1563281661,
        "sunset": 1563334156
    },
    "timezone": -25200,
    "id": 5389489,
    "name": "Sacramento",
    "cod": 200
};


class App extends Component {

    state = {
        zipCode: '',
        weather: {},
        // zipCode: 95818,
        // weather: data,
        gradientColor: 'start',
        currentView: 'searchForm',
        // currentView: 'zipCode404',
        zipCode404: false,
        key: '22b1fd9ad5cbf49c0631288f6ab6eb6e',
    }


    /* Handlers
    -------------------------------------------------------------------------*/

    /**
     * Accept the validated zipCode from <SearchForm>
     */
    zipCodeSubmitHandler = (zipCode) => {
        if( this.state.zipCode !== zipCode ){

            this.setState({zipCode: zipCode});

            // Get weather for zipCode from API
            Axios.get('/data/2.5/weather?units=imperial&q=' + zipCode + ',us&APPID=' + this.state.key)
                .then(response => {
                    this.setState({
                        weather: response.data,
                        zipCode404: false,
                    });
                    this.showWeatherResults();
                })
                .catch(error => {
                    if( error.response ){ // Response status is not 2XX
                        if( error.response.status === 404 ){
                            this.setState({
                                currentView: 'zipCode404',
                                zipCode404: true,
                                weather: {}
                            });
                        }
                    } else if (error.request) { // No response from server
                        // console.log(errors);
                    } else {
                        // console.log(errors);
                    }
                });
        } else {
            if( this.state.zipCode !== null && this.state.weather !== {} && !this.state.zipCode404 ){
                this.showWeatherResults();
            }
        }
    }

    showWeatherResults = () => {
        this.setState({currentView: 'weatherResults'});
        this.updateGradientFromTemp(this.state.weather.main.temp);
    }

    /**
     * WeatherResults close button click
     *  - show the SearchForm
     *  - reset the background gradient to default ('start')
     */
    closeWeatherResultsHandler = () => {
        // Remove <WeatherResults>
        this.setState({currentView: ''});
        // Change gradient
        setTimeout(() => {
            this.updateGradientFromTemp(NaN);
        }, 200);
        // Fade in the <SearchForm>
        setTimeout(() => {
            this.setState({currentView: 'searchForm'});
        }, 500);
    }

    /* Methods
    -------------------------------------------------------------------------*/

    updateGradientFromTemp = (temperature) => {
        let gradient = 'start';
        if( typeof(temperature) === 'string' ){
            gradient = temperature;
        } else if( temperature === null ){
            gradient = 'start';
        } else if( 98 <= temperature ){
            gradient = 'red';
        } else if ( 88 <= temperature ){
            gradient = 'orange';
        } else if ( 72 <= temperature ){
            gradient = 'blueLight';
        } else if ( 60 <= temperature ){
            gradient = 'blue';
        } else if ( temperature <= 59 ){
            gradient = 'purple';
        }
        this.setState({gradientColor: gradient});
    }


    /* Render
    -------------------------------------------------------------------------*/

    render() {
        return (
            <div className="App">
                <Credits />
                <Background gradientColor={this.state.gradientColor} />
                <div className="WeatherLayout">

                    <AnimateInOut
                        in={this.state.currentView === 'searchForm'}
                        timeout={{
                            enter: 500,
                            exit: 300,
                        }}
                    >                        
                        <SearchForm
                            zipCode={this.state.zipCode}
                            zipCodeSubmit={this.zipCodeSubmitHandler}
                            zipCode404={this.state.zipCode404} />
                    </AnimateInOut>

                    <AnimateInOut
                        in={this.state.currentView === 'weatherResults'}
                        timeout={{
                            enter: 500,
                            exit: 300,
                        }}
                    >
                        <WeatherResults
                            weather={this.state.weather}
                            closeResults={this.closeWeatherResultsHandler} />
                    </AnimateInOut>

                    <CSSTransition
                        in={this.state.currentView === 'zipCode404'}
                        appear={true}
                        timeout={500}
                        mountOnEnter
                        unmountOnExit
                        classNames="zipCode404"
                    >
                        <Zip404Error close404={this.closeWeatherResultsHandler} />
                    </CSSTransition>

                </div>
            </div>
        );
    }
}

export default App;
