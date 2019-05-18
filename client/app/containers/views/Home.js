/**
 * Import React, { Component }, and React Native Components
*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { BackHandler, Keyboard } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import moment from 'moment'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import isEmpty from '../../utilities/isEmpty';
import isAndroid from '../../utilities/isAndroid';
import isIOS from '../../utilities/isIOS';

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

/**
* Import Conditional Libraries
*/
const AndroidKeyboardAdjust = (isAndroid())? require('react-native-android-keyboard-adjust') : undefined; // Version can be specified in package.json

type Props = {};

class Home extends Component<Props> {

    constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        const collections = {
            all: props.collections,
            puppets: this.extractCategory(props.collections, "puppets"),
            animation: this.extractCategory(props.collections, "animation")
        };

        const films = {
            all: props.films,
            puppets: this.extractCategory(props.films, "puppets"),
            animation: this.extractCategory(props.films, "animation")
        };

        const music = {
            all: props.music,
            puppets: this.extractCategory(props.music, "puppets"),
            animation: this.extractCategory(props.music, "animation")
        };

        this.state = {
            segment: 'all',
            playing: props.playing,
            defaultThumbnail: require('../../assets/Play_Background.png'),
            coverFlowView: true,
            listView: false,
            switchingViews: false,
            collectionsLoading: false,
            collectionsRefreshing: false,
            collections: collections,
            _collections: collections,
            filmsLoading: false,
            filmsRefreshing: false,
            films: films,
            _films: films,
            musicLoading: false,
            musicRefreshing: false,
            music: music,
            _music: music,
            errors: {},
            keyboardHeight: 0,
            searchFocused: false,
            searchKey: undefined
        };

        // Initialize Members
        this.coverFLowView = undefined;
        this.listView = undefined;
        this.searchInput = undefined;

        // Bind functions to this
        this.extractCategory = this.extractCategory.bind(this);
        this.changeSegment = this.changeSegment.bind(this);
        this.removePlaying = this.removePlaying.bind(this);
        this.profile = this.profile.bind(this);
        this.player = this.player.bind(this);
        this.collection = this.collection.bind(this);
        this.switchViews = this.switchViews.bind(this);
        this.focusSearch = this.focusSearch.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.blurSearch = this.blurSearch.bind(this);
        this.search = this.search.bind(this);
        this.handleError = this.handleError.bind(this);
        this.fetchCollections = this.fetchCollections.bind(this);
        this.fetchFilms = this.fetchFilms.bind(this);
        this.fetchMusic = this.fetchMusic.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentWillMount() {

        Keyboard.addListener('keyboardDidShow', (e) => (
            this.setState({ keyboardHeight: (e.endCoordinates)? e.endCoordinates.height : 0 })
        ) );

        Keyboard.addListener('keyboardDidHide', () => ( this.setState({ keyboardHeight: 0 }) ) );

        return ( (isAndroid())? AndroidKeyboardAdjust.setAdjustPan() : 1 );
    }

    componentDidMount() {

        if (isEmpty(this.props.collections) || isEmpty(this.props.films) || isEmpty(this.props.music))
            this.refresh(false);
        else this.refresh(true);

        this.props.logScreen('Home', 'Home', { gender: this.props.user.gender, age: parseInt(Math.floor(moment.duration(moment(new Date()).diff(moment(this.props.user.birth))).asYears())) });

        return SplashScreen.hide();
    }

    componentWillReceiveProps(props) {

        const collections = {
            all: props.collections,
            puppets: this.extractCategory(props.collections, "puppets"),
            animation: this.extractCategory(props.collections, "animation")
        };

        const films = {
            all: props.films,
            puppets: this.extractCategory(props.films, "puppets"),
            animation: this.extractCategory(props.films, "animation")
        };

        const music = {
            all: props.music,
            puppets: this.extractCategory(props.music, "puppets"),
            animation: this.extractCategory(props.music, "animation")
        };
        
        const state = this.setState({
            collections: collections,
            _collections: collections,
            films: films,
            _films: films,
            music: music,
            _music: music,
            playing: props.playing
        });

        if (this.state.searchKey) return setTimeout( () => ( this.search(this.state.searchKey) ) );
        else return state;
    }

    componentWillUnmount() {

        Keyboard.removeAllListeners();

        if (isAndroid()) return AndroidKeyboardAdjust.setAdjustResize();
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

    player(video, section, category, collection) {
        return Actions.player({ video, section, category, collection });
    }

    collection(collection, category) {
        return Actions.collection({ collection, category });
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

    focusSearch(search) {
        
        if (!isEmpty(search) && !isEmpty(search._root))
            if (!this.searchInput) this.searchInput = search;

        if (isAndroid()) {

            this.androidBackListener = BackHandler.addEventListener("hardwareBackPress", () => {

                if (this.state.searchFocused) {

                    this.blurSearch(this.searchInput);

                    return true;
                }

                return false;
            });
        }

        return this.setState({ searchFocused: true });
    }

    clearSearch(search) {

        if (!isEmpty(search) && !isEmpty(search._root)) {

            if (!this.searchInput) this.searchInput = search;

            search._root.clear();

            this.search();

            return this.setState({ searchKey: undefined });
        }
    }

    blurSearch(search) {
        
        if (this.state.searchKey) this.search();

        if (!isEmpty(search) && !isEmpty(search._root)) {

            search._root.clear();

            search._root.blur();

            if (!this.searchInput) this.searchInput = search;
        }

        return this.setState({ searchFocused: false, searchKey: undefined });
    }

    search(key) {
        
        if (!key || key === '')
            return (
                this.setState({
                    collections: this.state._collections,
                    films: this.state._films,
                    music: this.state._music,
                    searchKey: undefined
                })
            );
        else {
            
            let collections = {};
            let collection;
            let films = {};
            let film;
            let music = {};
            let _music;
            const _key = key.toString().toLowerCase();

            // ["all", "puppets", "animation"]

            Object.keys(this.state._collections).map( (category) => {

                collections[category] = collections[category] || {};
                films[category] = films[category] || {};
                music[category] = music[category] || {};

                Object.keys(this.state._collections[category]).map( (index) => {

                    collection = this.state._collections[category][index];

                    if ((collection.title.toLowerCase().search(_key) !== -1) || (collection.tagline.toLowerCase().search(_key) !== -1) || (collection.excerpt == Number(_key)))
                        collections[category][index] = collection;

                    return collection;
                } );

                Object.keys(this.state._films[category]).map( (index) => {

                    film = this.state._films[category][index];

                    if ((film.title.toLowerCase().search(_key) !== -1) || (film.tagline.toLowerCase().search(_key) !== -1) || (film.excerpt == Number(_key)))
                        films[category][index] = film;

                    return film;
                } );

                Object.keys(this.state._music[category]).map( (index) => {

                    _music = this.state._music[category][index];

                    if ((_music.title.toLowerCase().search(_key) !== -1) || (_music.tagline.toLowerCase().search(_key) !== -1) || (_music.excerpt == Number(_key)))
                        music[category][index] = _music;

                    return music;
                } );

            } );

            return this.setState({
                collections: collections,
                films: films,
                music: music,
                searchKey: key
            });
        }
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

            // if (!silent)
            //     this.setState({ collectionsRefreshing: true, filmsRefreshing: true, musicRefreshing: true });

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
                searchFocused={ this.state.searchFocused }
                searchKey={ this.state.searchKey }
                keyboardHeight={ this.state.keyboardHeight }
                changeSegment={ this.changeSegment }
                removePlaying={ this.removePlaying }
                profile={ this.profile }
                player={ this.player }
                collection={ this.collection }
                switchViews={ this.switchViews }
                focusSearch={ this.focusSearch }
                clearSearch={ this.clearSearch }
                blurSearch={ this.blurSearch }
                search={ this.search }
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
    fetchCollections: PropTypes.func.isRequired,
    fetchFilms: PropTypes.func.isRequired,
    fetchMusic: PropTypes.func.isRequired,
    removePlaying: PropTypes.func.isRequired,
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
