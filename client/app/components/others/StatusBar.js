/**
 * Import React and React Native
 */
 import React from 'react';
 import { StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import isAndroid from '../../utilities/isAndroid';

/**
 * Other variables and constants
*/
import Styles from '../styles';

const _StatusBar = function (props) {
    return (
        <StatusBar backgroundColor={ (isAndroid() && parseFloat(DeviceInfo.getSystemVersion()) < 6)? Styles.backgroundStatusBarTransparent.backgroundColor : ((props.backgroundColor)? props.backgroundColor : Styles.backgroundStatusBar.backgroundColor) } barStyle={ (props.barStyle)? props.barStyle : "light-content" } networkActivityIndicatorVisible={ true } hidden={ (props.hidden)? props.hidden : false } />
    );
};

export default _StatusBar;
