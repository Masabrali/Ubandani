/**
 * Import React, { Component }, and React Native Components
*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import { Animated } from 'react-native'; // Version can be specified in package.json

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
import StoriesComponent from '../../components/views/Stories';
import Error from '../../components/others/Error';

type Props = {};

class Stories extends Component<Props> {

    constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {
            coverFlowView: true,
            listView: false,
            listViewMarginTop: new Animated.Value(0),
            coverFlowViewZIndex: new Animated.Value(0)
        };

        // Initialize Members
        this.coverFLowView = undefined;
        this.listView = undefined;

        // Bind functions to this
        this.profile = this.profile.bind(this);
        this.player = this.player.bind(this);
        this.story = this.story.bind(this);
        this.switchViews = this.switchViews.bind(this);
    }

    componentDidMount() {
        
        this.props.logScreen('Stories', 'Stories');

        return SplashScreen.hide();
    }

    profile() {
        return Actions.profile();
    }

    player() {
        return Actions.player();
    }

    story() {
        return Actions.story();
    }

    switchViews(coverFlowView, listView) {

        const _coverFlowView = this.state.coverFlowView;

        if (isEmpty(this.coverFlowView)) this.coverFlowView = coverFlowView;

        if (isEmpty(this.listView)) this.listView = listView;

        // this.setState({ listView: true, coverFlowView: true });

        // Animated.timing(this.state.listViewMarginTop, { toValue: ( (_coverFlowView)? -300 : 300 ), duration: 300 }).start();

        // Animated.timing(this.state.coverFlowViewZIndex, { toValue: ( (_coverFlowView)? -1 : 0 ), duration: 300 }).start();

        // return (
        //     setTimeout( () => (
        //         this.setState({
        //             listView: _coverFlowView,
        //             coverFlowView: !_coverFlowView,
        //             listViewMarginTop: 0
        //         })
        //     ), 300)
        // );

        return ( this.setState({ listView: _coverFlowView, coverFlowView: !_coverFlowView }) );
    }

    render() {
        return (
            <StoriesComponent
                coverFlowView={ this.state.coverFlowView }
                listView={ this.state.listView }
                listViewMarginTop={ this.state.listViewMarginTop }
                coverFlowViewZIndex={ this.state.coverFlowViewZIndex }
                profile={ this.profile }
                player={ this.player }
                story={ this.story }
                switchViews={ this.switchViews }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Stories.propTypes = {
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
export default connect(mapStateToProps, matchDispatchToProps)(Stories);
