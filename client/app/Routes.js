/**
 * Import React, { Component }, and React Native Components
*/
import React from 'react';
import { Router, Modal, Scene, Tabs, Actions } from 'react-native-router-flux';
import { Platform, Component } from 'react-native';
import { Text, Button, Icon } from 'native-base'; // Version can be specified in package.json

/**
* Import Utilities
*/
import isAndroid from './utilities/isAndroid';

/**
 * Import Containers
*/
import Home from './containers/views/Home';

import Collection from  './containers/views/Collection';

import Profile from  './containers/views/Profile';
import EditProfile from  './containers/views/EditProfile';
import Login from  './containers/views/Login';
import Verify from  './containers/views/Verify';

import Help from './containers/views/Help';
import FAQ from './containers/views/FAQ';
import ContactUs from './containers/views/ContactUs';
import Terms from './containers/views/Terms';
import License from './containers/views/License';
import Website from './containers/views/Website';

import Excerpt from  './containers/views/Excerpt';
import Player from  './containers/views/Player'; // Version can be specified in package.json

/**
 * NativeBase
*/

/**
 * Import Styles
 */
import Styles from './components/styles';

const navigationBarStyle = [Styles.backgroundHeader, Styles.textLight, Styles.noShadow, Styles.noBorderBottom];

const titleStyle = [Styles.textUbandaniLight];

const backTitleStyle = [Styles.textUbandaniLight];

const tabIcon = (icon, _icon) => {
    return (
        <Icon name={ icon } ios={ 'ios-' + icon } android={ 'md-' + icon } active={ (_icon.focused)? true:false } style={{ color: (_icon.focused)? _icon.activeTintColor : _icon.inactiveTintColor }} />
    );
};

const Routes = function () {

    return (
        <Router>
            <Modal>
                <Scene key="root" hideNavBar={ true }>
                    <Scene key="home" component={ Home } title="Home" hideNavBar={ true } />
                    
                    <Scene key="collection" component={ Collection } title="Collection" hideNavBar={ true } />

                    <Scene key="profile" component={ Profile } title="Profile" hideNavBar={ true } />
                    <Scene key="editProfile" component={ EditProfile } title="Edit Profile" titleStyle={ titleStyle } backButtonTintColor={ Styles.textUbandaniLight.color } backTitle="Profile" backTitleStyle={ backTitleStyle } hideNavBar={ false } navigationBarStyle={ navigationBarStyle } />

                    <Scene key="help" component={ Help } title="Help" backTitle="Profile" hideNavBar={ true } />
                    <Scene key="faq" component={ FAQ } title="FAQ" titleStyle={ titleStyle } backButtonTintColor={ Styles.textUbandaniLight.color } backTitle="Back" backTitleStyle={ backTitleStyle } hideNavBar={ false } navigationBarStyle={ navigationBarStyle } />
                    <Scene key="contactus" component={ ContactUs } title="Contact Us" titleStyle={ titleStyle } backButtonTintColor={ Styles.textUbandaniLight.color } backTitle="Back" backTitleStyle={ backTitleStyle } hideNavBar={ false } navigationBarStyle={ navigationBarStyle } />
                    <Scene key="terms" component={ Terms } title="Terms and Privacy Policy" titleStyle={ titleStyle } backButtonTintColor={ Styles.textUbandaniLight.color } backTitle="Back" backTitleStyle={ backTitleStyle } hideNavBar={ false } navigationBarStyle={ navigationBarStyle } />
                    <Scene key="license" component={ License } title="License" titleStyle={ titleStyle } backButtonTintColor={ Styles.textUbandaniLight.color } backTitle="Back" backTitleStyle={ backTitleStyle } hideNavBar={ false } navigationBarStyle={ navigationBarStyle } />
                    <Scene key="website" component={ Website } title="ubandani.com" titleStyle={ titleStyle } backButtonTintColor={ Styles.textUbandaniLight.color } backTitle="Back" backTitleStyle={ backTitleStyle } hideNavBar={ false } navigationBarStyle={ navigationBarStyle } />
                    
                </Scene>

                <Scene key="player" component={ Player } title="Player" hideNavBar={ true } />
                <Scene key="excerpt" component={ Excerpt } title="Excerpt" hideNavBar={ true } />

                <Scene key="login" component={ Login } title="Login" titleStyle={ titleStyle } backButtonTintColor={ Styles.textUbandaniLight.color } backTitle="Cancel" backTitleStyle={ backTitleStyle } hideNavBar={ false } navigationBarStyle={ navigationBarStyle } />
                <Scene key="verify" component={ Verify } title="Verify" titleStyle={ titleStyle } backButtonTintColor={ Styles.textUbandaniLight.color } backTitle="Login" backTitleStyle={ backTitleStyle } hideNavBar={ false } navigationBarStyle={ navigationBarStyle } />
                <Scene key="loginTerms" component={ Terms } title="Terms and Privacy Policy" titleStyle={ titleStyle } backButtonTintColor={ Styles.textUbandaniLight.color }  backTitle="Login" backTitleStyle={ backTitleStyle } hideNavBar={ false } navigationBarStyle={ navigationBarStyle } />
            </Modal>
        </Router>
    );
};

export default Routes;
