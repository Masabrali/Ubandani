/**
 * Import React, { Component }, and React Native Components
*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import isEmpty from '../../utilities/isEmpty';

/**
 * Import Actions
*/
import logScreen from '../../actions/logScreen';

/**
 * Import Components
*/
import VerifyComponent from '../../components/views/Verify';
import Error from '../../components/others/Error';

type Props = {};

class Verify extends Component<Props> {

    constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {};

        // Initialize Members

        // Bind functions to this
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        return this.props.logScreen('Verify', 'Verify');
    }

    back() {
        return Actions.pop();
    }

    render() {
        return (
            <VerifyComponent
                back={ this.back }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Verify.propTypes = {
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
export default connect(mapStateToProps, matchDispatchToProps)(Verify);