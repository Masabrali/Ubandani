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
import WebsiteComponent from '../../components/views/Website';
import Error from '../../components/others/Error';

type Props = {};

class Website extends Component<Props> {

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
        return this.props.logScreen('Website', 'Website');
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
            <WebsiteComponent
                link={ this.props.links.website }
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
Website.propTypes = {
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
export default connect(mapStateToProps, matchDispatchToProps)(Website);
