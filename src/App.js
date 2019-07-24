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

class App extends Component {

    state = {
        zipCode: '',
        weather: {},
        weatherResultsMounted: false,
        gradientColor: 'start',
        currentView: 'searchForm',
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

            this.setState({
                zipCode: zipCode,
                weatherResultsMounted: false,
            });

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
            this.setState({
                currentView: 'searchForm',
                isFirstSearch: false
            });
        }, 500);
    }

    weatherResultsMountedHandler = () => {
        this.setState({weatherResultsMounted: true});
    }


    /* Methods
    -------------------------------------------------------------------------*/

    showWeatherResults = () => {
        this.setState({currentView: 'weatherResults'});
        this.updateGradientFromTemp(this.state.weather.main.temp);
    }

    /**
     * Map temperature to background gradient key
     */
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
                <Credits
                    currentView={this.state.currentView}
                    isError={this.state.zipCode404} />
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
                            zipCode404={this.state.zipCode404}
                            weather={this.state.weather}
                            hasResults={this.state.weatherResultsMounted} />
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
                            closeResults={this.closeWeatherResultsHandler}
                            mounted={this.weatherResultsMountedHandler} />
                    </AnimateInOut>

                    <CSSTransition
                        in={this.state.currentView === 'zipCode404'}
                        appear={true}
                        timeout={500}
                        classNames="zipCode404"
                    >
                        <Zip404Error
                            show={this.state.currentView === 'zipCode404'}
                            close404={this.closeWeatherResultsHandler} />
                    </CSSTransition>

                </div>
            </div>
        );
    }
}

export default App;
