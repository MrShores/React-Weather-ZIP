import React, { Component } from 'react';
import './App.css';

import Credits from './components/Credits/Credits';
import Background from './components/Background/Background';
import SearchForm from './components/SearchForm/SearchForm';
import WeatherResults from './components/WeatherResults/WeatherResults';
import Axios from 'axios';



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
        temperature: null,
        weather: data,
        key: '22b1fd9ad5cbf49c0631288f6ab6eb6e',
        gradientColor: 'start',
    }

    /**
     * Accept the validated zipCode from <SearchForm>
     */
    zipCodeSubmitHandler = (zipCode) => {
        console.log('[App] zipCodeSubmitHandler ' + zipCode);
        this.setState({zipCode: zipCode});
        // Get weather for zipCode from API
        // Axios.get('/data/2.5/weather?units=imperial&q=' + zipCode + ',us&APPID=' + this.state.key)
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(errors => {
        //         console.log(errors);
        //     });

        // Swap out to Weather View
    }
    
    render() {
        /*
        const view = (
            <SearchForm
                zipCode={this.state.zipCode}
                zipCodeSubmit={this.zipCodeSubmitHandler} />
        );
        */
        const view = (<WeatherResults weather={this.state.weather} />);

        return (
            <div className="App">
                <Credits />
                <Background gradientColor={this.state.gradientColor} />
    
                <div className="WeatherLayout">

                    
                    {view}


                </div>
            </div>
        );
    }
}

export default App;
