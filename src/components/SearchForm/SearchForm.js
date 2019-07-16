import React, { Component } from 'react';
import classes from './SearchForm.module.css';
import ErrorMessage from './ErrorMessage/ErrorMessage';

class SearchForm extends Component {
 
    state = {
        isFocus: false,
        zipCode: '',
        hasError: false,
        errorMsg: '',
    }

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
        });
        setTimeout(() => {
            this.setState({errorMsg: ''});
        }, 200);
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

    render() {
        const formClass = this.state.isFocus ? classes.FormFocus : null;

        return (
            <div className={classes.SearchForm}>
                <form className={formClass} onSubmit={this.formSubmitHandler} action="" autocomplete="off">
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
                <ErrorMessage
                    show={this.state.hasError}
                    message={this.state.errorMsg} />
            </div>
        );
    }
}

export default SearchForm;