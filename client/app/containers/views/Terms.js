/**
 * Import React, { Component }, and React Native Components
*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import moment from 'moment'; // Version can be specified in package.json

/**
 * Import Actions
*/
import logScreen from '../../actions/logScreen';

/**
 * Import Components
*/
import TermsComponent from '../../components/views/Terms';
import Error from '../../components/others/Error';

type Props = {};

class Terms extends Component<Props> {

    constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {
            loading: true
        };

        // Bind functions to this
        this.stopLoading = this.stopLoading.bind(this);
        this.handleError = this.handleError.bind(this);
        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        return this.props.logScreen('Terms and Privacy Policy', 'Terms');
    }

    stopLoading() {
        return this.setState({ loading: false });
    }

    handleError(error) {
        return Error(error.description, 5000);
    }

    reload(webview) {
        return webview.reload();
    }

    render() {
        return (
            <TermsComponent
              link={ this.props.links.terms }
              loading={ this.state.loading }
              stopLoading={ this.stopLoading }
              handleError={ this.handleError }
              reload={ this.reload }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Terms.propTypes = {
    languages: PropTypes.array.isRequired,
    links: PropTypes.object.isRequired,
    logScreen: PropTypes.func.isRequired
};

/**
 * Matching State to PropTypes
*/
function mapStateToProps(state) {
    return {
        languages: state.languages,
        links: state.links
    };
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
export default connect(mapStateToProps, matchDispatchToProps)(Terms);
