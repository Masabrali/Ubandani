/**
 * Import React, { Component }, and React Native Components
*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import firebase from 'react-native-firebase'; // Version can be specified in package.json


/**
* Import Utilities
*/
import isEmpty from '../../utilities/isEmpty';
import isFunction from '../../utilities/isFunction';

/**
 * Import Actions
*/
import logScreen from '../../actions/logScreen';

/**
 * Import Components
*/
import ExcerptComponent from '../../components/views/Excerpt';
import Error from '../../components/others/Error';

type Props = {};

class Excerpt extends Component<Props> {

    constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {};

        // Bind functions to this
        this.back = this.back.bind(this);
        this.like = this.like.bind(this);
        this.share = this.share.bind(this);
    }

    componentDidMount() {
        return this.props.logScreen('Excerpt', 'Excerpt');
    }

    back() {
        return Actions.pop();
    }

    like() {
        return Actions.like();
    }

    share() {
        return Actions.share();
    }

    render() {
        return (
            <ExcerptComponent
              back={ this.back }
              like={ this.like }
              share={ this.share }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Excerpt.propTypes = {
    logScreen: PropTypes.func.isRequired
};

/**
 * Matching State to PropTypes
*/
function mapStateToProps(state) {
    return {};
}

/**
 * Matching Dispatch to PropTypes
*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        logScreen: logScreen
    }, dispatch);
}

/**
 * Exporting the Container
*/
export default connect(mapStateToProps, matchDispatchToProps)(Excerpt);
