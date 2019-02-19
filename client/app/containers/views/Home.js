/**
 * Import React, { Component }, and React Native Components
*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import moment from 'moment'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import isEmpty from '../../utilities/isEmpty';

/**
 * Import Actions
*/
import logScreen from '../../actions/logScreen';
import fetchCollections from '../../actions/collections';
import fetchFilms from '../../actions/films';
import fetchMusic from '../../actions/music';
import removePlaying from '../../actions/removePlaying';

/**
 * Import Components
*/
import HomeComponent from '../../components/views/Home';
import Error from '../../components/others/Error';

type Props = {};

class Home extends Component<Props> {

    constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {
            segment: 'all',
            playing: props.playing,
            defaultThumbnail: require('../../assets/Play_Background.png'),
            coverFlowView: true,
            listView: false,
            switchingViews: false,
            collectionsLoading: false,
            collectionsRefreshing: false,
            collections: {
                all: props.collections,
                puppets: this.extractCategory(props.collections, "puppets"),
                animation: this.extractCategory(props.collections, "animation")
            },
            filmsLoading: false,
            filmsRefreshing: false,
            films: {
                all: props.films,
                puppets: this.extractCategory(props.films, "puppets"),
                animation: this.extractCategory(props.films, "animation")
            },
            musicLoading: false,
            musicRefreshing: false,
            music: {
                all: props.music,
                puppets: this.extractCategory(props.music, "puppets"),
                animation: this.extractCategory(props.music, "animation")
            },
            errors: {}
        };

        // Initialize Members
        this.coverFLowView = undefined;
        this.listView = undefined;

        // Bind functions to this
        this.extractCategory = this.extractCategory.bind(this);
        this.changeSegment = this.changeSegment.bind(this);
        this.removePlaying = this.removePlaying.bind(this);
        this.profile = this.profile.bind(this);
        this.player = this.player.bind(this);
        this.collection = this.collection.bind(this);
        this.switchViews = this.switchViews.bind(this);
        this.handleError = this.handleError.bind(this);
        this.fetchCollections = this.fetchCollections.bind(this);
        this.fetchFilms = this.fetchFilms.bind(this);
        this.fetchMusic = this.fetchMusic.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        
        if (isEmpty(this.props.collections) || isEmpty(this.props.films) || isEmpty(this.props.music))
            this.refresh();
        else this.refresh(true);

        this.props.logScreen('Home', 'Home', { gender: this.props.user.gender, age: parseInt(Math.floor(moment.duration(moment(new Date()).diff(moment(this.props.user.birth))).asYears())) });

        return SplashScreen.hide();
    }

    componentWillReceiveProps(props) {
        
        return (
            this.setState({
                collections: {
                    all: props.collections,
                    puppets: this.extractCategory(props.collections, "puppets"),
                    animation: this.extractCategory(props.collections, "animation")
                },
                films: {
                    all: props.films,
                    puppets: this.extractCategory(props.films, "puppets"),
                    animation: this.extractCategory(props.films, "animation")
                },
                music: {
                    all: props.music,
                    puppets: this.extractCategory(props.music, "puppets"),
                    animation: this.extractCategory(props.music, "animation")
                },
                playing: props.playing
            })
        );
    }

    extractCategory(object, category) {

        let extractedObject = {};

        Object.keys(object).map( (key) => {
            
            if (object[key].category == category) extractedObject[key] = object[key];

            return object[key];
        } );

        return extractedObject;
    }

    changeSegment(segment) {
        return this.setState({ segment: segment });
    }

    removePlaying() {
        return this.props.removePlaying(this.state.playing);
    }

    profile() {
        return Actions.profile();
    }

    player(video, nextVideos) {

        let keys = Object.keys(nextVideos);
        let _keys = ([ ...keys ]).reverse();
        let newKeys = (keys.splice(keys.indexOf('c') + 1)).concat(_keys.splice(_keys.indexOf('c') + 1).reverse());

        // console.log(keys)
        // console.log(_keys)
        // console.log(newKeys);

        let _nextVideos = {};

        newKeys.map( (key) => ( _nextVideos[key] = nextVideos[key] ) );

        return Actions.player({ video: video, nextVideos: _nextVideos });
    }

    collection(collection) {
        return Actions.collection({ collection: collection });
    }

    switchViews(coverFlowView, listView) {

        this.setState({ switchingViews: true });

        const _coverFlowView = this.state.coverFlowView;

        return (
            setTimeout( () => {

                if (isEmpty(this.coverFlowView)) this.coverFlowView = coverFlowView;

                if (isEmpty(this.listView)) this.listView = listView;

                this.setState({ listView: _coverFlowView, coverFlowView: !_coverFlowView });

                return setTimeout( () => ( this.setState({ switchingViews: false }) ), 1000);

            })
        );
    }

    handleError(error) {

        const errors = this.state.errors;

        errors.global = {
            type: (error.response)? error.response.status : error.name,
            message: (error.response)? error.response.statusText:error.message
        };

        Error(errors.global, 5000);

        return this.setState({ errors });
    }

    fetchCollections(silent) {

        // Validation
        let errors = {};

        // Hand;e Data Submission to server
        if (isEmpty(errors)) {

            if (!silent && !this.state.collectionsLoading)
                this.setState({ collectionsLoading: true });

            return (
                this.props.fetchCollections({ silent }).then(
                (data) => {

                    if (!silent && !isEmpty(data.errors)) {

                        const errors = data.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        return ( silent || this.setState({
                            errors,
                            collectionsLoading: false,
                            collectionsRefreshing: false
                        }) );

                    } else
                        return ( silent || this.setState({
                            collectionsLoading: false,
                            collectionsRefreshing: false,
                            errors: {}
                        }) );

                }, (error) => ( silent || this.handleError(error) ) )
                .catch( (error) => ( silent || this.handleError(error) ) )
            );
        }
    }

    fetchFilms(silent) {
        
        // Validation
        let errors = {};

        // Hand;e Data Submission to server
        if (isEmpty(errors)) {

            if (!silent && !this.state.filmsLoading)
                this.setState({ filmsLoading: true });

            return (
                this.props.fetchFilms({ silent }).then(
                (data) => {

                    if (!silent && !isEmpty(data.errors)) {

                        const errors = data.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        return ( silent || this.setState({
                            errors,
                            filmsLoading: false,
                            filmsRefreshing: false
                        }) );

                    } else
                        return ( silent || this.setState({
                            filmsLoading: false,
                            filmsRefreshing: false,
                            errors: {}
                        }) );

                }, (error) => ( silent || this.handleError(error) ) )
                .catch( (error) => ( silent || this.handleError(error) ) )
            );
        }
    }

    fetchMusic(silent) {
        
        // Validation
        let errors = {};

        // Hand;e Data Submission to server
        if (isEmpty(errors)) {

            if (!silent && !this.state.musicLoading)
                this.setState({ musicLoading: true });

            return (
                this.props.fetchMusic({ silent }).then(
                (data) => {

                    if (!silent && !isEmpty(data.errors)) {

                        const errors = data.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        return ( silent || this.setState({
                            errors,
                            musicLoading: false,
                            musicRefreshing: false
                        }) );

                    } else
                        return ( silent || this.setState({
                            musicLoading: false,
                            musicRefreshing: false,
                            errors: {}
                        }) );

                }, (error) => ( silent || this.handleError(error) ) )
                .catch( (error) => ( silent || this.handleError(error) ) )
            );
        }
    }

    refresh(silent) {

        // Validation
        let errors = {};

        // Hand;e Data Submission to server
        if (isEmpty(errors)) {

            if (!silent)
                this.setState({ collectionsRefreshing: true, filmsRefreshing: true, musicRefreshing: true });

            this.fetchCollections(silent);

            this.fetchFilms(silent);

            this.fetchMusic(silent);
        }
    }

    render() {
        return (
            <HomeComponent
                segment={ this.state.segment }
                playing={ this.state.playing }
                coverFlowView={ this.state.coverFlowView }
                listView={ this.state.listView }
                switchingViews={ this.state.switchingViews }
                defaultThumbnail={ this.state.defaultThumbnail }
                collectionsLoading={ this.state.collectionsLoading }
                collectionsRefreshing={ this.state.collectionsRefreshing }
                collections={ this.state.collections }
                filmsLoading={ this.state.filmsLoading }
                filmsRefreshing={ this.state.filmsRefreshing }
                films={ this.state.films }
                musicLoading={ this.state.musicLoading }
                musicRefreshing={ this.state.musicRefreshing }
                music={ this.state.music }
                errors={ this.state.errors }
                changeSegment={ this.changeSegment }
                removePlaying={ this.removePlaying }
                profile={ this.profile }
                player={ this.player }
                collection={ this.collection }
                switchViews={ this.switchViews }
                refresh={ this.refresh }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Home.propTypes = {
    user: PropTypes.object.isRequired,
    collections: PropTypes.object.isRequired,
    films: PropTypes.object.isRequired,
    playing: PropTypes.object.isRequired,
    music: PropTypes.object.isRequired,
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
        logScreen: logScreen,
        fetchCollections: fetchCollections,
        fetchFilms: fetchFilms,
        fetchMusic: fetchMusic,
        removePlaying: removePlaying
    }, dispatch);
}

/**
 * Exporting the Container
*/
export default connect(mapStateToProps, matchDispatchToProps)(Home);
