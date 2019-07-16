import React, { Component } from 'react';
import './App.css';

import Credits from './components/Credits/Credits';
import Background from './components/Background/Background';
import SearchForm from './components/SearchForm/SearchForm';

class App extends Component {

    state = {
        zipCode: '',
    }

    /**
     * Accept the zipCode from the <SearchForm> component
     */
    zipCodeSubmitHandler = (zipCode) => {
        alert('[App] zipCodeSubmitHandler ' + zipCode);
    }

    render() {
        return (
            <div className="App">
                <Credits />
                <Background />
    
                <div className="WeatherLayout">
                    <SearchForm
                        zipCode={this.state.zipCode}
                        zipCodeSubmit={this.zipCodeSubmitHandler} />
                </div>
            </div>
        );
    }
}

export default App;
