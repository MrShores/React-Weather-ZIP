import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './AnimateInOut.css';

/**
 * Fade in and out animation wrapper
 * 
 * Composes from the <CSSTransition> component from React Transition Group:
 * http://reactcommunity.org/react-transition-group/css-transition
 */
class AnimateInOut extends Component {

    transTime = (state, timeout) => {
        if( typeof(this.props.timeout) === 'object' ){
            if( state === 'entering' || state === 'entered' ){
                return timeout.enter;
            } else if (state === 'exiting' || state === 'exited'){
                return timeout.exit;
            }
        } else {
            return this.props.timeout;
        }
    }

    render(){
        return (
            <CSSTransition
                in={this.props.in}
                timeout={this.props.timeout}
                appear={true}
                mountOnEnter={this.props.mountOnEnter ? this.props.mountOnEnter : true }
                unmountOnExit={this.props.unmountOnExit ? this.props.unmountOnExit : true }
                classNames="animateInOut"
            >
                {state => (
                    <div
                        style={{transition: 'opacity ' + this.transTime(state, this.props.timeout) + 'ms ease-out'}}
                    >
                        {this.props.children}
                    </div>
                )}
            </CSSTransition>
        );
    }
};

/**
 * Component Props
 */
AnimateInOut.propTypes = {
    in: PropTypes.bool.isRequired,
    timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ]).isRequired,
    children: PropTypes.element.isRequired,
    mountOnEnter: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
}

export default AnimateInOut;