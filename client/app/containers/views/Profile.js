/**
 * Import React, { Component }, and React Native Components
*/
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'; // Version can be specified in package.json


/**
* Import Utilities
*/
import isEmpty from '../../utilities/isEmpty';
import isFunction from '../../utilities/isFunction';

/**
 * Import Actions
*/
import setUserColors from '../../actions/setUserColors';
import cacheImage from '../../actions/cacheImage';
import imageColors from '../../actions/imageColors';
import fetchInvitation from '../../actions/invitation';
import logScreen from '../../actions/logScreen';

/**
 * Import Components
*/
import ProfileComponent from '../../components/views/Profile';
import Error from '../../components/others/Error';

type Props = {};

class Profile extends Component<Props> {

    constructor(props) {

        // Intialize props
        super(props);

        // Extract Colors from User
        const { headerBackgroundColor, headerTitleColor, statusbarStyle } = (props.user.colors || {});

        // Initialize state
        this.state = {
            user: props.user,
            loading: false,
            errors: {},
            done: false,
            defaultProfilePicture: (isIOS())? require('../../assets/iOS_Profile_Placeholder.png') : require('../../assets/md_Profile_Placeholder.png'),
            profilePicture: (!!props.user.profilePicture)? { uri: props.user.profilePicture } : undefined,
            headerBackgroundColor: headerBackgroundColor || Styles.backgroundUbandani.backgroundColor,
            headerTitleColor: headerTitleColor || Styles.textUbandaniLight.color,
            statusbarStyle: statusbarStyle || "light-content"
        };

        // Bind functions to this
        this.back = this.back.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.login = this.login.bind(this);
        this.help = this.help.bind(this);
        this.handleError = this.handleError.bind(this);
        this.customizeHeader = this.customizeHeader.bind(this);
        this.fetchInvitation = this.fetchInvitation.bind(this);
        this.invite = this.invite.bind(this);
    }

    componentDidMount() {

        const { headerBackgroundColor, headerTitleColor, statusbarStyle } = (this.state.user.colors || {});

        if (!!this.state.user.profilePicture && (!headerBackgroundColor || !headerTitleColor || !statusbarStyle)) this.customizeHeader();

        if (isEmpty(this.props.invitation) || (!this.props.invitation.title && !this.props.invitation.message && !this.props.invitation.callToAction))
            this.fetchInvitation();
        else this.fetchInvitation(true);

        return this.props.logScreen('Profile', 'Profile', { gender: this.props.user.gender, age: parseInt(Math.floor(moment.duration(moment(new Date()).diff(moment(this.props.user.birth))).asYears())) });
    }

    back() {
        return Actions.pop();
    }

    editProfile() {
        return Actions.editProfile();
    }

    login() {
        return Actions.login();
    }

    help() {
        return Actions.help();
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
                this.props.cacheImage(this.state.user.profilePicture).then(
                (profilePicturePath) => {

                    if (!isEmpty(coverPath.errors)) {

                        const errors = coverPath.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        return this.setState({ errors, loading: false });

                    } else {

                        try {
                            
                            return (
                                this.props.imageColors({ quality: "high" }, profilePicturePath).then( (colors) => {

                                    colors.sort( (a, b) => ( (b.color.population + chroma(b.color).luminance()) - (a.color.population + chroma(a.color).luminance()) ) );

                                    const LUMINANCE = chroma(colors[0].color).luminance();

                                    const USER_COLORS = {
                                        headerBackgroundColor: colors[0].color,
                                        headerTitleColor: (LUMINANCE < 0.5)? Styles.textUbandaniLight.color : Styles.textUbandaniDark.color,
                                        headerSubtitleColor: (LUMINANCE < 0.5)? Styles.textUbandaniLight.color : Styles.textUbandaniDark.color,
                                        statusbarStyle: (LUMINANCE < 0.5)? "light-content" : "dark-content"
                                    };

                                    this.props.setUserColors(USER_COLORS);

                                    this.setState({ ...USER_COLORS });

                                    return (
                                        setTimeout( () => (
                                            this.setState({ loading: false, errors: {} })
                                        ), 500)
                                    );

                                }, this.handleError)
                                .catch(this.handleError)
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

    etchInvitation(silent) {
        
        // Validation
        let errors = {};

        // Hand;e Data Submission to server
        if (isEmpty(errors)) {

            if (!silent && !this.state.loading) this.setState({ loading: true });

            return this.props.fetchInvitation({ silent }).then(
                (data) => {
                    
                    if (!isEmpty(data) && !isEmpty(data.errors)) {

                        const errors = data.errors;

                        Error(errors[Object.keys(errors)[0]], 5000);

                        this.setState({ errors, loading: false, done: false });

                    } else return this.setState({ errors: {}, loading: false, refreshing: false, done: true });

                }, this.handleError)
                .catch(this.handleError);
        }
    }

    async invite() {

        // Validation
        let errors = {};

        // Hand;e Data Submission to server
        if (isEmpty(errors)) {

            if (!this.state.loading) this.setState({ loading: true });

            if (isEmpty(this.props.invitation) || !this.props.invitation.title || !this.props.invitation.message || !this.props.invitation.callToAction)
                await this.fetchInvitation();
            
            if (isEmpty(this.state.errors))
                return this.props.invite(this.state.invitation).then(
                    (data) => (
                        (!isEmpty(data) && !isEmpty(data.errors))? this.handleError(data.errors[0]) : this.setState({ loading: false, done: true, errors: {} })
                    ), this.handleError
                ).catch(this.handleError);
        }
    }

    render() {
        return (
            <ProfileComponent
                headerTitleColor={ this.state.headerTitleColor }
                headerBackgroundColor={ this.state.headerBackgroundColor }
                statusbarStyle={ this.state.statusbarStyle }
                loading={ this.state.loading }
                defaultProfilePicture={ this.state.defaultProfilePicture }
                profilePicture={ this.state.profilePicture }
                user={ this.state.user }
                back={ this.back }
                editProfile={ this.editProfile }
                login={ this.login }
                help={ this.help }
                invite={ this.invite }
            />
        );
    }
}

/**
 * Container PropTypes
*/
Profile.propTypes = {
    languages: PropTypes.array.isRequired,
    language: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    setUserColors: PropTypes.func.isRequired,
    cacheImage: PropTypes.func.isRequired,
    imageColors: PropTypes.func.isRequired,
    invite: PropTypes.func.isRequired,
    fetchInvitation: PropTypes.func.isRequired,
    logScreen: PropTypes.func.isRequired
};

/**
 * Matching State to PropTypes
*/
function mapStateToProps(state) {
    return {
        languages: state.languages,
        language: state.language,
        user: state.user,
        invitation: state.invitation,
    };
}

/**
 * Matching Dispatch to PropTypes
*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserColors: setUserColors,
        cacheImage: cacheImage,
        imageColors: imageColors,
        invite: invite,
        fetchInvitation: fetchInvitation,
        logScreen: logScreen
    }, dispatch);
}

/**
 * Exporting the Container
*/
export default connect(mapStateToProps, matchDispatchToProps)(Profile);
