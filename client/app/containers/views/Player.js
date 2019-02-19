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
import setPlaying from '../../actions/setPlaying';
import setPlayingSeek from '../../actions/setPlayingSeek';
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
        this.state = {
            videoLoading: false,
            videosLoading: false,
            errors: {},
            done: false,
            defaultCover: require('../../assets/Play_Background_Dark.png'),
            video: props.video,
            nextVideos: props.nextVideos
        };
        
        // Initialize Members

        // Bind functions to this
        this.back = this.back.bind(this);
        this.share = this.share.bind(this);
        this.like = this.like.bind(this);
        this.excerpt = this.excerpt.bind(this);
        this.setPlaying = this.setPlaying.bind(this);
        this.setPlayingSeek = this.setPlayingSeek.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.playPrevious = this.playPrevious.bind(this);
        this.playNext = this.playNext.bind(this);
    }

    componentDidMount() {
        return this.props.logScreen('Player', 'Player', { gender: this.props.user.gender, age: parseInt(Math.floor(moment.duration(moment(new Date()).diff(moment(this.props.user.birth))).asYears())) });
    }

    componentWillReceiveProps(props) {
        return this.setState({ video: props.video });
    }

    back() {
    	return Actions.pop();
    }

    share() {
    	// return Actions.share(this.state.video);
    }

    like() {
        // return Actions.like(this.state.video);
    }

    excerpt() {
        return Actions.excerpt({ item: this.state.video });
    }

    setPlaying() {

        // Validation
        let errors = {};

        // Handle Data Submission to server
        if (isEmpty(errors))
            return this.props.setPlaying(this.state.video);
    }

    setPlayingSeek(seek) {

        // Validation
        let errors = {};

        // Handle Data Submission to server
        if (isEmpty(errors))
            return this.props.setPlayingSeek(this.state.video);
    }

    playVideo(video) {

    }

    playPrevious() {
        return this.playVideo();
    }

    playNext() {
        return this.playVideo();
    }

    render() {
        return (
            <PlayerComponent
                videoLoading={ this.state.videoLoading }
                videosLoading={ this.state.videosLoading }
                defaultCover={ this.state.defaultCover }
                video={ this.state.video }
                reference={ this.props.reference }
                nextVideos={ this.state.nextVideos }
            	back={ this.back }
            	share={ this.share }
            	like={ this.like }
                excerpt={ this.excerpt }
                setPlaying={ this.setPlaying }
                setPlayingSeek={ this.setPlayingSeek }
                playVideo={ this.playVideo }
                playPrevious={ this.playPrevious }
                playNext={ this.playNext }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Player.propTypes = {
    user: PropTypes.object.isRequired,
    video: PropTypes.object.isRequired,
    setPlaying: PropTypes.func.isRequired,
    setPlayingSeek: PropTypes.func.isRequired,
    logScreen: PropTypes.func.isRequired
};

/**
 * Matching State to PropTypes
*/
function mapStateToProps(state) {
    return {
        user: state.user
    };
}

/**
 * Matching Dispatch to PropTypes
*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setPlaying: setPlaying,
        setPlayingSeek: setPlayingSeek,
        logScreen: logScreen
    }, dispatch);
}

/**
 * Exporting the Container
*/
export default connect(mapStateToProps, matchDispatchToProps)(Player);