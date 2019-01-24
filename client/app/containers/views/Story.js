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
import StoryComponent from '../../components/views/Story';
import Error from '../../components/others/Error';

type Props = {};

class Story extends Component<Props> {

	constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {};

        // Initialize Members

        // Bind functions to this
        this.back = this.back.bind(this);
        this.share = this.share.bind(this);
        this.player = this.player.bind(this);
        this.excerpt = this.excerpt.bind(this);
    }

    componentDidMount() {
        return this.props.logScreen('Story', 'Story');
    }

    back() {
    	return Actions.pop();
    }

    share() {
    	return Actions.share();
    }

    player() {
        return Actions.player();
    }

    excerpt() {
        return Actions.excerpt();
    }

    render() {
        return (
            <StoryComponent
            	back={ this.back }
            	share={ this.share }
            	player={ this.player }
                excerpt={ this.excerpt }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Story.propTypes = {
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
export default connect(mapStateToProps, matchDispatchToProps)(Story);