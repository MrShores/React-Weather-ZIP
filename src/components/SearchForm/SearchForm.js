import React, { Component } from 'react';
import classes from './SearchForm.module.css';
import ErrorMessage from './ErrorMessage/ErrorMessage';

class SearchForm extends Component {
 
    state = {
        isFocus: false,
        zipCode: this.props.zipCode ? this.props.zipCode : '',
        hasError: false,
        errorMsg: '',
    }


    /* Lifecycle
    -------------------------------------------------------------------------*/

    componentDidMount(){
        if( this.props.zipCode404 ){
            this.setErrorMessage(`ZIP ${this.props.zipCode} can't be found`);
        }
    }


    /* Methods and Handlers
    -------------------------------------------------------------------------*/

    /**
     * Set error message
     */
    setErrorMessage = (message) => {
        this.setState({
            hasError: true,
            errorMsg: message
        });
    }

    /**
     * Reset error message flag and message
     */
    clearErrorMessage = () => {
        this.setState({
            hasError: false,
            errorMsg: '',
        });
    }

    /**
     * Toggle form input focus flag
     */
    toggleFocusHandler = (event) => {
        if( this.state.zipCode === '' ){
            this.setState((prevState) => {
                return {
                    isFocus: !prevState.isFocus,
                }
            });
        }
        if( event.type === 'blur' ){
            this.clearErrorMessage();
        }
    }

    /**
     * Set state for zipCode input
     * Verify the zipCode is only digits and at most 5 characters
     */
    zipCodeChangeHandler = (event) => {
        const zip = event.target.value;
        // Zip Code is all digits
        if( zip.match(/^[0-9]+$/) !== null || zip === '' ){
            // Max of 5 digits
            if( this.state.zipCode.length <= 5 ){
                this.setState({zipCode: zip});
                this.clearErrorMessage();
            }
        } else {
            this.setErrorMessage('Only digits are allowed');
        }
    }

    /**
     * Submit the zipCode back to [App] for processing 
     */
    formSubmitHandler = (event) => {
        event.preventDefault();
        
        if( this.state.zipCode.length < 5 ){
            this.setErrorMessage('Zip Code must have 5 digits');
        } else {
            this.props.zipCodeSubmit(this.state.zipCode);
        }
    }


    /* Render
    -------------------------------------------------------------------------*/

    render() {

        const cssClasses = [classes.SearchForm];
        const formClass = this.state.isFocus ? classes.FormFocus : null;

        let cityName = null;
        if( this.props.hasResults && this.props.zipCode === this.state.zipCode ){
            cityName = (
                <div className={classes.City}>
                    {this.props.weather.name}
                </div>
            );
        }

        return (
            <div className={cssClasses.join(' ')}>
                <form className={formClass} onSubmit={this.formSubmitHandler} action="" method="POST" autoComplete="off">
                    <label htmlFor="zipcode">ZIP Code</label>
                    <input
                        type="text"
                        maxLength="5"
                        name="zipcode"
                        placeholder="Enter Zip"
                        value={this.state.zipCode}
                        onChange={this.zipCodeChangeHandler}
                        onFocus={this.toggleFocusHandler}
                        onBlur={this.toggleFocusHandler} />
                    <div className={classes.Button}>
                        <button>Go</button>
                    </div>
                </form>
                {cityName}
                <ErrorMessage
                    show={this.state.hasError}
                    message={this.state.errorMsg} />
            </div>
        );
    }
}

export default SearchForm;