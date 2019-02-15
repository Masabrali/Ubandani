import firebase from 'react-native-firebase';
/**
* Import DEV config
*/
import { DEV } from '../config';

export default function handleError(err) {

    let error = new Error(err);

    firebase.crashlytics().log(error.message);

    if (DEV) console.error(error);

    throw error;
}
