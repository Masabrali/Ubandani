/**
 * Import React, { Component }, and React Native Components
*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import moment from 'moment'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import isEmpty from '../../utilities/isEmpty';
import isFunction from '../../utilities/isFunction';

/**
 * Import Actions
*/
import setPlaying from '../../actions/setPlaying';
import setPlayingSeek from '../../actions/setPlayingSeek';
import removePlaying from '../../actions/removePlaying';
import addVideoView from '../../actions/addVideoView';
import fetchCollectionVideos from '../../actions/collectionVideos';
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
            playerVisible: true,
            videoControlsOpacity: new Animated.Value(0),
            videoControlsVisible: true,
            videoLoading: false,
            videoBuffering: false,
            videoError: false,
            videoPlaying: false,
            videoPaused: false,
            videoEnded: false,
            videoFullscreen: false,
            videosLoading: false,
            videosRefreshing: false,
            errors: {},
            done: false,
            defaultCover: '../../assets/Play_Background_Dark.png',
            video: props.video,
            playing: props.playing,
            videoCurrentTime: props.video.seek || 0,
            videoDuration: props.video.duration,
            videoPlayableDuration: 0,
            _nextVideos: undefined,
            nextVideos: {},
            nextVideosKeys: 0,
            autoPlay: true
        };
        
        // Initialize Members
        this.player = undefined;
        this.videoControlsTimeout = undefined;

        // Bind functions to this
        this.back = this.back.bind(this);
        this.share = this.share.bind(this);
        this.like = this.like.bind(this);
        this.excerpt = this.excerpt.bind(this);

        this.fetchCollectionVideos = this.fetchCollectionVideos.bind(this);
        this.processNextVideos = this.processNextVideos.bind(this);
        this.extractCategory = this.extractCategory.bind(this);
        this.loadNextVideos = this.loadNextVideos.bind(this);

        this.setPlaying = this.setPlaying.bind(this);
        this.setPlayingSeek = this.setPlayingSeek.bind(this);

        this.addVideoView = this.addVideoView.bind(this);

        this.playerRendered = this.playerRendered.bind(this);
        this.onVideoLoading = this.onVideoLoading.bind(this);
        this.onVideoLoaded = this.onVideoLoaded.bind(this);
        this.onVideoBuffering = this.onVideoBuffering.bind(this);
        this.onVideoError = this.onVideoError.bind(this);
        this.onVideoProgress = this.onVideoProgress.bind(this);
        this.onVideoSeeked = this.onVideoSeeked.bind(this);
        this.onVideoEnded = this.onVideoEnded.bind(this);

        this.showVideoControls = this.showVideoControls.bind(this);
        this.hideVideoControls = this.hideVideoControls.bind(this);
        this.toggleVideoControls = this.toggleVideoControls.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.replay = this.replay.bind(this);
        this.reload = this.reload.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.seek = this.seek.bind(this);
        this.enterFullscreen = this.enterFullscreen.bind(this);
        this.exitFullscreen = this.exitFullscreen.bind(this);

        this.autoPlayChanged = this.autoPlayChanged.bind(this);
    }

    componentWillMount() {
        return (
            Orientation.addOrientationListener( (orientation) => (
                this.setState({ videoFullscreen: orientation == "LANDSCAPE" })
            ) )
        );
    }

    componentDidMount() {

        if (isEmpty(this.state.nextVideos)) this.loadNextVideos();
        else loadNextVideos(true)

        return this.props.logScreen('Player', 'Player', { gender: this.props.user.gender, age: parseInt(Math.floor(moment.duration(moment(new Date()).diff(moment(this.props.user.birth))).asYears())) });
    }

    componentWillReceiveProps(props) {

        let _nextVideos = props[this.props.section];

        if (this.props.collection) _nextVideos = _nextVideos[this.props.collection].videos || {};

        const video = _nextVideos[this.state.video.id];
        
        this.setState({
            video: video || this.state.video,
            playing: props.playing,
            _nextVideos: (!isEmpty(_nextVideos))? _nextVideos : this.state._nextVideos
        });

        return (
            setTimeout( () => {
                if (!isEmpty(_nextVideos) && _nextVideos != this.state._nextVideos)
                    return this.loadNextVideos(!isEmpty(this.state.nextVideos));
                else return;
            } )
        );
    }

    componentWillUnmount() {

        Orientation.lockToPortrait();

        return Orientation.removeOrientationListener( (orientation) => ( orientation ) );
    }

    back() {

        this.pause();

        this.exitFullscreen();

    	return setTimeout( () => ( Actions.pop() ), 1000);
    }

    share() {
    	// return Actions.share(this.state.video);
    }

    like() {
        // return Actions.like(this.state.video);
    }

    excerpt() {

        this.pause();

        return Actions.excerpt({ item: this.state.video, play: this.play });
    }

    handleError(error, silent) {

        const errors = this.state.errors;

        errors.global = {
            type: (error.response)? error.response.status : error.name,
            message: (error.response)? error.response.statusText:error.message
        };

        Error(errors.global, 5000);

        return (
            this.setState({
                videoLoading: (silent)? this.state.videoLoading : false,
                videosLoading: (silent)? this.state.videosLoading : false,
                videosRefreshing: (silent)? this.state.videosRefreshing : false,
                errors
            })
        );
    }

    fetchCollectionVideos(silent, callback) {

        // Validation
        let errors = {};

        // Hand;e Data Submission to server
        if (isEmpty(errors)) {

            if (!silent && !this.state.videosLoading) this.setState({ videosLoading: true });

            return (
                this.props.fetchCollectionVideos({ ...this.props.collections[this.props.collection], silent }).then(
                (data) => {

                    if (!silent && !isEmpty(data.errors)) {

                        const errors = data.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        return ( silent || this.setState({
                            errors,
                            videosLoading: false,
                            videosRefreshing: false
                        }) );

                    } else {

                        if (isFunction(callback)) callback(data);

                        return ( silent || this.setState({
                            videosLoading: false,
                            videosRefreshing: false,
                            errors: {}
                        }) );
                    }

                }, this.handleError)
                .catch(this.handleError)
            );
        }
    }

    processNextVideos(nextVideos, silent) {

        if (!silent) this.setState({ videosLoading: true });

        let keys = Object.keys(nextVideos);
        let _keys = ([ ...keys ]).reverse();
        let newKeys = (keys.splice(keys.indexOf(this.state.video.id) + 1)).concat(_keys.splice(_keys.indexOf(this.state.video.id) + 1).reverse());

        let _nextVideos = {};

        newKeys.map( (key) => ( _nextVideos[key] = nextVideos[key] ) );

        if (!isEmpty(_nextVideos)) _nextVideos[newKeys[0]].next == this.state.autoPlay;

        this.setState({ nextVideos: _nextVideos, nextVideosKeys: Object.keys(_nextVideos) });

        return setTimeout( () => ( this.setState({ videosLoading: false, videosRefreshing: false }) ) );
    }

    extractCategory(object, category) {

        let extractedObject = {};

        Object.keys(object).map( (key) => {
            
            if (object[key].category == category) extractedObject[key] = object[key];

            return object[key];
        } );

        return extractedObject;
    }

    loadNextVideos(silent) {
        
        const video = this.state.video || this.props.video;
        
        let nextVideos = this.state._nextVideos || this.props[this.props.section];

        if (this.props.category != "all") nextVideos =  this.extractCategory(nextVideos, this.props.category);
        
        if (!this.props.collection) return this.processNextVideos(nextVideos, silent);
        else {
            
            nextVideos = (nextVideos[this.props.collection] || {}).videos;

            if (!isEmpty(nextVideos)) return this.processNextVideos(nextVideos, silent);
            else return this.fetchCollectionVideos(silent);
        }
    }

    setPlaying() {

        // Validation
        let errors = {};

        // Handle Data Submission to server
        if (isEmpty(errors))
            return (
                this.props.setPlaying({
                    ...this.state.video,
                    seek: this.state.videoCurrentTime,
                    section: this.props.section,
                    category: this.props.category,
                    collection: this.props.collection
                })
            );
    }

    removePlaying() {
        
        // Validation
        let errors = {};

        // Handle Data Submission to server
        if (isEmpty(errors))
            return (
                this.props.removePlaying({
                    ...this.state.video,
                    seek: this.state.videoCurrentTime,
                    section: this.props.section,
                    category: this.props.category,
                    collection: this.props.collection
                })
            );
    }

    setPlayingSeek(seek) {

        // Validation
        let errors = {};

        // Handle Data Submission to server
        if (isEmpty(errors) && !isEmpty(this.state.playing))
            return this.props.setPlayingSeek(seek);
    }

    addVideoView() {

        // Validation
        let errors = {};

        // Handle Data Submission to server
        if (isEmpty(errors)) {

            return (
                this.props.addVideoView({
                    ...this.state.video,
                    section: this.props.section,
                    category: this.props.category,
                    collection: this.props.collection
                }).then( (data) => {
                    
                    if (!isEmpty(data.errors)) {

                        const errors = data.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        return this.setState({ errors });

                    } else
                        return this.setState({ errors: {} });

                }, this.handleError)
                .catch(this.handleError)
            );
        }
    }

    playerRendered(player) {
        this.player = player;
    }

    onVideoLoading(video) {

        this.showVideoControls();

        return this.setState({ videoLoading: true });
    }

    onVideoLoaded(video) {
        
        this.setPlaying();

        this.addVideoView();

        this.seek(this.state.video.seek || 0);

        this.hideVideoControls();

        return (
            this.setState({
                videoCurrentTime: video.currentPosition,
                videoDuration: video.duration,
                videoLoading: false,
                videoBuffering: false,
                videoError: false,
                videoPaused: this.state.videoPaused || false,
                videoEnded: false
            })
        );
    }

    onVideoBuffering(buffering) {
        
        if (buffering.isBuffering) this.showVideoControls();
        else this.hideVideoControls();

        return this.setState({ videoBuffering: buffering });
    }

    onVideoError({error}) {
        
        error = { errorException: error.errorException, message: error.errorString, ...error };

        this.handleError(error);

        this.showVideoControls();

        return (
            this.setState({
                videoLoading: false,
                videoBuffering: false,
                videoError: error.message,
                videoPlaying: true,
                videoPaused: false,
                videoEnded: false
            })
        );
    }

    onVideoProgress(progress) {

        this.setPlayingSeek(progress.currentTime);

        return (
            this.setState({
                videoCurrentTime: progress.currentTime,
                videoPlayableDuration: progress.playableDuration,
                videoLoading: false,
                videoBuffering: false,
                videoError: false,
                videoPlaying: progress.currentTime < (this.state.videoDuration),
                videoPaused: false,
                videoEnded: progress.currentTime >= (this.state.videoDuration)
            })
        );
    }

    onVideoSeeked(seek) {

        this.setPlayingSeek(seek.currentTime);

        return this.setState({ videoPlaying: true, videoCurrentTime: seek.currentTime });
    }

    onVideoEnded(video) {
        
        this.removePlaying();

        this.showVideoControls();

        if (this.state.autoPlay && !isEmpty(this.state.nextVideos) && this.state.nextVideosKeys[this.state.nextVideosKeys.length - 1] != this.state.video.id)
            this.next();

        return (
            this.setState({
                videoLoading: false,
                videoBuffering: false,
                videoError: false,
                videoPlaying: false,
                videoPaused: false,
                videoEnded: true
            })
        );
    }

    showVideoControls() {

        clearTimeout(this.videoControlsTimeout);

        this.setState({ videoControlsVisible: true });

        return this.state.videoControlsOpacity.setValue(1);
    }

    hideVideoControls() {

        clearTimeout(this.videoControlsTimeout);

        this.setState({ videoControlsVisible: false });

        return this.state.videoControlsOpacity.setValue(0);
    }

    toggleVideoControls() {

        this.showVideoControls();

        if (!this.state.videoLoading && !this.state.videoBuffering && !this.state.videoEnded && !this.state.videoError)
            this.videoControlsTimeout = setTimeout( () => ( this.hideVideoControls() ), 2000);

        return this.videoControlsTimeout;
    }

    playVideo(video) {

        this.setState({ video: video });

        return (
            setTimeout( () => {
            
                this.play();

                return this.loadNextVideos(true);
            } )
        );
    }

    play() {

        if (!this.state.videoError)
            this.videoControlsTimeout = setTimeout( () => ( this.hideVideoControls() ), 1000);

        return this.setState({ videoPlaying: true, videoPaused: false, videoEnded: false });
    }

    pause() {

        this.showVideoControls();

        return this.setState({ videoPlaying: false, videoPaused: true, videoEnded: false });
    }

    seek(seek) {

        this.showVideoControls()

        if (!isEmpty(this.player)) {

            this.player.seek(seek);

            return this.setState({ videoCurrentTime: seek });

        } else
            return (
                setTimeout( () => {
                    
                    if (!isEmpty(this.player)) {

                        this.player.seek(seek);

                        return this.setState({ videoCurrentTime: seek });

                    } else return;

                }, 1000)
            );
    }

    replay() {

        this.seek(0);

        return this.setState({ videoPlaying: true, videoPaused: false, videoEnded: false });
    }

    reload() {

        this.setState({ playerVisible: false });

        return (
            setTimeout( () => ( this.setState({ playerVisible: true }) ) )
        );
    }

    previous() {

        const playingKeyIndex = this.state.nextVideosKeys.indexOf(this.state.video.id);
        
        let previousKeyIndex = playingKeyIndex - 1;

        if (previousKeyIndex < 0) previousKeyIndex = 0;

        return this.playVideo(this.state.nextVideos[this.state.nextVideosKeys[previousKeyIndex]] || this.state.video);
    }

    next() {

        const playingKeyIndex = this.state.nextVideosKeys.indexOf(this.state.video.id);
        
        let nextKeyIndex = playingKeyIndex + 1;

        if (nextKeyIndex >= this.state.nextVideosKeys.length)
                nextKeyIndex = this.state.nextVideosKeys.length - 1;

        return this.playVideo(this.state.nextVideos[this.state.nextVideosKeys[nextKeyIndex]] || this.state.video);
    }

    enterFullscreen() {
        return Orientation.lockToLandscape();
    }

    exitFullscreen() {
        return Orientation.lockToPortrait();
    }

    autoPlayChanged(value) {

        const { nextVideos, nextVideosKeys } = this.state;

        if (!isEmpty(nextVideos)) nextVideos[nextVideosKeys[0]].next = !!value;

        if (!value && this.state.nextVideosKeys[this.state.nextVideosKeys.length - 1] != this.state.video.id)
            this.next();

        return this.setState({ autoPlay: !!value, nextVideos: { ...nextVideos } });
    }

    render() {
        return (
            <PlayerComponent
                playerVisible={ this.state.playerVisible }
                videoControlsOpacity={ this.state.videoControlsOpacity }
                videoControlsVisible={ this.state.videoControlsVisible }
                videoLoading={ this.state.videoLoading }
                videoBuffering={ this.state.videoBuffering }
                videoError={ this.state.videoError }
                videoPlaying={ this.state.videoPlaying }
                videoPaused={ this.state.videoPaused }
                videoEnded={ this.state.videoEnded }
                videoFullscreen={ this.state.videoFullscreen }
                videosLoading={ this.state.videosLoading }
                videosRefreshing={ this.state.videosRefreshing }
                defaultCover={ this.state.defaultCover }
                video={ this.state.video }
                videoCurrentTime={ this.state.videoCurrentTime }
                videoDuration={ this.state.videoDuration }
                videoPlayableDuration={ this.state.videoPlayableDuration }
                reference={ this.props.reference }
                nextVideos={ this.state.nextVideos }
                nextVideosKeys={ this.state.nextVideosKeys }
                autoPlay={ this.state.autoPlay }
            	back={ this.back }
            	share={ this.share }
            	like={ this.like }
                excerpt={ this.excerpt }
                loadNextVideos={ this.loadNextVideos }
                playerRendered={ this.playerRendered }
                onVideoLoading={ this.onVideoLoading }
                onVideoLoaded={ this.onVideoLoaded }
                onVideoBuffering={ this.onVideoBuffering }
                onVideoError={ this.onVideoError }
                onVideoProgress={ this.onVideoProgress }
                onVideoSeeked={ this.onVideoSeeked }
                onVideoEnded={ this.onVideoEnded }
                toggleVideoControls={ this.toggleVideoControls }
                playVideo={ this.playVideo }
                play={ this.play }
                pause={ this.pause }
                replay={ this.replay }
                reload={ this.reload }
                previous={ this.previous }
                next={ this.next }
                seek={ this.seek }
                enterFullscreen={ this.enterFullscreen }
                exitFullscreen={ this.exitFullscreen }
                autoPlayChanged={ this.autoPlayChanged }
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
    collections: PropTypes.object.isRequired,
    films: PropTypes.object.isRequired,
    music: PropTypes.object.isRequired,
    playing: PropTypes.object.isRequired,
    setPlaying: PropTypes.func.isRequired,
    setPlayingSeek: PropTypes.func.isRequired,
    removePlaying: PropTypes.func.isRequired,
    addVideoView: PropTypes.func.isRequired,
    fetchCollectionVideos: PropTypes.func.isRequired,
    logScreen: PropTypes.func.isRequired
};

/**
 * Matching State to PropTypes
*/
function mapStateToProps(state) {
    return {
        user: state.user,
        collections: state.collections,
        films: state.films,
        music: state.music,
        playing: state.playing
    };
}

/**
 * Matching Dispatch to PropTypes
*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setPlaying: setPlaying,
        setPlayingSeek: setPlayingSeek,
        removePlaying: removePlaying,
        addVideoView: addVideoView,
        fetchCollectionVideos: fetchCollectionVideos,
        logScreen: logScreen
    }, dispatch);
}

/**
 * Exporting the Container
*/
export default connect(mapStateToProps, matchDispatchToProps)(Player);