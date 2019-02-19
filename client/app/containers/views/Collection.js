/**
 * Import React, { Component }, and React Native Components
*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { ImageCacheManager } from 'react-native-cached-image';
import { getAllSwatches } from 'react-native-palette';
import chroma from 'chroma-js'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import isEmpty from '../../utilities/isEmpty';

/**
 * Import Actions
*/
import setCollectionColors from '../../actions/setCollectionColors';
import fetchCollectionVideos from '../../actions/collectionVideos';
import cacheImage from '../../actions/cacheImage';
import logScreen from '../../actions/logScreen';

/**
 * Import Components
*/
import CollectionComponent from '../../components/views/Collection';
import Error from '../../components/others/Error';

/**
 * Other variables and constants
*/
import Styles from '../../components/styles';

type Props = {};

class Collection extends Component<Props> {

	constructor(props) {

        // Intialize props
        super(props);

        // Extract Colors from Collection
        const { headerBackgroundColor, headerTitleColor, headerSubtitleColor, statusbarStyle } = (props.collection.colors || {});

        // Initialize state
        this.state = {
            collection: props.collection,
            loading: false,
            videosLoading: false,
            videosRefreshing: false,
            errors: {},
            done: false,
            coverOverlay: require('../../assets/Play_Background_Gradient.png'),
            defaultCover: require('../../assets/Play_Background.png'),
            cover: (!!props.collection.cover)? { uri: props.collection.cover } : props.collection.cover,
            headerBackgroundColor: headerBackgroundColor || Styles.backgroundUbandaniLight.backgroundColor,
            headerTitleColor: headerTitleColor || Styles.textUbandaniDark.color,
            headerSubtitleColor: headerSubtitleColor || Styles.textUbandaniDark.color,
            statusbarStyle: statusbarStyle || "dark-content"
        };

        // Initialize Members

        // Bind functions to this
        this.back = this.back.bind(this);
        this.share = this.share.bind(this);
        this.player = this.player.bind(this);
        this.excerpt = this.excerpt.bind(this);
        this.handleError = this.handleError.bind(this);
        this.customizeHeader = this.customizeHeader.bind(this);
        this.fetchCollectionVideos = this.fetchCollectionVideos.bind(this);
    }

    componentDidMount() {

        const { headerBackgroundColor, headerTitleColor, headerSubtitleColor, statusbarStyle } = (this.state.collection.colors || {});

        if (!!this.state.collection.cover && (!headerBackgroundColor || !headerTitleColor || !headerSubtitleColor || !statusbarStyle)) this.customizeHeader();

        if (isEmpty(this.state.collection.videos)) this.fetchCollectionVideos();
        else this.fetchCollectionVideos(true);

        return this.props.logScreen('Collection', 'Collection', { gender: this.props.user.gender, age: parseInt(Math.floor(moment.duration(moment(new Date()).diff(moment(this.props.user.birth))).asYears())) });
    }

    componentWillReceiveProps(props) {
        return (
            this.setState({ collection: props.collections[this.state.collection.id] || props.collection })
        );
    }

    back() {
    	return Actions.pop();
    }

    share() {
    	// return Actions.share();
    }

    player(video) {

        let nextVideos = this.state.collection.videos;
        let keys = Object.keys(this.state.collection.videos);
        let _keys = ([ ...keys ]).reverse();
        let newKeys = (keys.splice(keys.indexOf('c') + 1)).concat(_keys.splice(_keys.indexOf('c') + 1).reverse());

        let _nextVideos = {};

        newKeys.map( (key) => ( _nextVideos[key] = nextVideos[key] ) );

        return Actions.player({ video: video, nextVideos: _nextVideos, reference: "collection" });
    }

    excerpt() {
        return Actions.excerpt({ item: this.state.collection, reference: "collection" });
    }

    handleError(error, silent) {

        const errors = this.state.errors;

        errors.global = {
            type: (error.response)? error.response.status : error.name,
            message: (error.response)? error.response.statusText:error.message
        };

        Error(errors.global, 5000);

        return this.setState({ loading: (silent)? this.state.loading : false, errors });
    }

    customizeHeader() {

        // Validation
        let errors = {};

        // Hand;e Data Submission to server
        if (isEmpty(errors)) {

            if (!this.state.loading) this.setState({ loading: true });

            return (
                this.props.cacheImage(this.state.collection.cover).then(
                (coverPath) => {

                    if (!isEmpty(coverPath.errors)) {

                        const errors = coverPath.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        return this.setState({ errors, loading: false });

                    } else {

                        try {
                            
                            return (
                                getAllSwatches({ quality: "high" }, coverPath, (error, swatches) => {
                                    
                                    if (error) return this.handleError(error);
                                    else {
                                        
                                        swatches.sort( (a, b) => ( (b.color.population + chroma(b.color).luminance()) - (a.color.population + chroma(a.color).luminance()) ) );

                                        const LUMINANCE = chroma(swatches[0].color).luminance();

                                        const COLLECTION_COLORS = {
                                            headerBackgroundColor: swatches[0].color,
                                            headerTitleColor: (LUMINANCE < 0.5)? Styles.textUbandaniLight.color : Styles.textUbandaniDark.color,
                                            headerSubtitleColor: (LUMINANCE < 0.5)? Styles.textUbandaniLight.color : Styles.textUbandaniDark.color,
                                            statusbarStyle: (LUMINANCE < 0.5)? "light-content" : "dark-content"
                                        };

                                        this.props.setCollectionColors({
                                            key: this.state.collection.id,
                                            colors: COLLECTION_COLORS
                                        });

                                        return (
                                            this.setState({
                                                loading: false,
                                                errors: {},
                                                ...COLLECTION_COLORS
                                            })
                                        );
                                    }
                                } )
                            );
                        } catch (error) {
                            return this.handleError(error);
                        }

                    }

                }, this.handleError)
                .catch(this.handleError)
            );
        }
    }

    fetchCollectionVideos(silent) {

        // Validation
        let errors = {};

        // Hand;e Data Submission to server
        if (isEmpty(errors)) {

            if (!silent && !this.state.videosLoading) this.setState({ videosLoading: true });

            return (
                this.props.fetchCollectionVideos({ ...this.state.collection, silent }).then(
                (data) => {

                    if (!silent && !isEmpty(data.errors)) { console.log(data.errors)

                        const errors = data.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        return ( silent || this.setState({
                            errors,
                            videosLoading: false,
                            videosRefreshing: false
                        }) );

                    } else
                        return ( silent || this.setState({
                            videosLoading: false,
                            videosRefreshing: false,
                            errors: {}
                        }) );

                }, (error) => ( silent || this.handleError(error) ) )
                .catch( (error) => ( silent || this.handleError(error) ) )
            );
        }
    }

    render() {
        return (
            <CollectionComponent
                headerTitleColor={ this.state.headerTitleColor }
                headerSubtitleColor={ this.state.headerSubtitleColor }
                headerBackgroundColor={ this.state.headerBackgroundColor }
                statusbarStyle={ this.state.statusbarStyle }
                loading={ this.state.loading }
                videosLoading={ this.state.videosLoading }
                videosRefreshing={ this.state.videosRefreshing }
                coverOverlay={ this.state.coverOverlay }
                defaultCover={ this.state.defaultCover }
                cover={ this.state.cover }
                collection={ this.state.collection }
            	back={ this.back }
            	share={ this.share }
            	player={ this.player }
                excerpt={ this.excerpt }
                fetchCollectionVideos={ this.fetchCollectionVideos }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Collection.propTypes = {
    user: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    collections: PropTypes.object.isRequired,
    setCollectionColors: PropTypes.func.isRequired,
    fetchCollectionVideos: PropTypes.func.isRequired,
    cacheImage: PropTypes.func.isRequired,
    logScreen: PropTypes.func.isRequired
};

/**
 * Matching State to PropTypes
*/
function mapStateToProps(state) {
    return {
        user: state.user,
        collections: state.collections
    };
}

/**
 * Matching Dispatch to PropTypes
*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setCollectionColors: setCollectionColors,
        fetchCollectionVideos: fetchCollectionVideos,
        cacheImage: cacheImage,
        logScreen: logScreen
    }, dispatch);
}

/**
 * Exporting the Container
*/
export default connect(mapStateToProps, matchDispatchToProps)(Collection);