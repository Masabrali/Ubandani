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
import PlayerComponent from '../../components/views/Player';
import Error from '../../components/others/Error';

type Props = {};

class Player extends Component<Props> {

	constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {};

        // Initialize Members

        // Bind functions to this
        this.back = this.back.bind(this);
        this.share = this.share.bind(this);
        this.like = this.like.bind(this);
        this.excerpt = this.excerpt.bind(this);
    }

    componentDidMount() {
        return this.props.logScreen('Player', 'Player');
    }

    back() {
    	return Actions.pop();
    }

    share() {
    	return Actions.share();
    }

    like() {
        return Actions.like();
    }

    excerpt() {
        return Actions.excerpt();
    }

    render() {
        return (
            <PlayerComponent
            	back={ this.back }
            	share={ this.share }
            	like={ this.like }
                excerpt={ this.excerpt }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Player.propTypes = {
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
export default connect(mapStateToProps, matchDispatchToProps)(Player);