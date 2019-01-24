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
import ProfileComponent from '../../components/views/Profile';
import Error from '../../components/others/Error';

type Props = {};

class Profile extends Component<Props> {

    constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {};

        // Bind functions to this
        this.back = this.back.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.login = this.login.bind(this);
        this.help = this.help.bind(this);
        this.invite = this.invite.bind(this);
    }

    componentDidMount() {
        return this.props.logScreen('Profile', 'Profile');
    }

    back() {
        return Actions.pop();
    }

    editProfile() {
        return Actions.editProfile();
    }

    login() {
        return Actions.login();
    }

    help() {
        return Actions.help();
    }

    invite() {
        
    }

    render() {
        return (
            <ProfileComponent
              back={ this.back }
              editProfile={ this.editProfile }
              login={ this.login }
              help={ this.help }
              invite={ this.invite }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Profile.propTypes = {
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
export default connect(mapStateToProps, matchDispatchToProps)(Profile);
