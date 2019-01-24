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
 * Import Utilities
*/
import isEmpty from '../../utilities/isEmpty';

/**
 * Import Actions
*/
import fetchLinks from '../../actions/links';
import logScreen from '../../actions/logScreen';

/**
 * Import Components
*/
import HelpComponent from '../../components/views/Help';
import Error from '../../components/others/Error';

type Props = {};

class Help extends Component<Props> {

    constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {
            loading: false,
            errors: {},
            done: false
        };

        // Bind functions to this
        this.back = this.back.bind(this);
        this.handleError = this.handleError.bind(this);
        this.fetchLinks = this.fetchLinks.bind(this);
        this.faq = this.faq.bind(this);
        this.contactus = this.contactus.bind(this);
        this.terms = this.terms.bind(this);
        this.licenses = this.licenses.bind(this);
        this.website = this.website.bind(this);
    }

    componentDidMount() {

        if (isEmpty(this.props.links) && !this.props.links.faq && !this.props.links.terms && !this.props.links.license && !this.props.links.website)
            this.fetchLinks();
        else fetchLinks(true);

        return this.props.logScreen('Help', 'Help');
    }

    back() {
        return Actions.pop();
    }

    handleError(error) {

        const errors = this.state.errors;

        errors.global = {
            type: (error.response)? error.response.status:error.name,
            message: (error.response)? error.response.statusText:error.message
        };

        Error(errors.global, 5000);

        return this.setState({ errors, loading: false });
    }

    fetchLinks(silent) {

        // Validation
        let errors = {};

        // Handle Data Submission to server
        if (isEmpty(errors)) {

            if (!silent && !this.state.loading) this.setState({ loading: true });

            return this.props.fetchLinks({ silent }).then(
                (data) => {

                    if (!isEmpty(data) && !isEmpty(data.errors)) {

                        const errors = data.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        this.setState({ errors, loading: false, done: false });

                    } else  return this.setState({ errors: {}, loading: false, refreshing: false, done: true });

                }, this.handleError)
                .catch(this.handleError);
        }
    }

    faq() {
        return Actions.faq();
    }

    contactus() {
        return Actions.contactus();
    }

    terms() {
        return Actions.terms();
    }

    licenses() {
        return Actions.license();
    }

    website() {
        return Actions.website();
    }

    render() {
        return (
            <HelpComponent
              back={ this.back }
              faq={ this.faq }
              contactus={ this.contactus }
              terms={ this.terms }
              licenses={ this.licenses }
              website={ this.website }
              loading={ this.state.loading }
              errors={ this.state.errors }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Help.propTypes = {
    languages: PropTypes.array.isRequired,
    links: PropTypes.object.isRequired,
    fetchLinks: PropTypes.func.isRequired,
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
        fetchLinks: fetchLinks,
        logScreen: logScreen
    }, dispatch);
}

/**
 * Exporting the Container
*/
export default connect(mapStateToProps, matchDispatchToProps)(Help);
