import firebase from 'react-native-firebase';
// import fetch from './fetch';
import setMusic from './dispatches/setMusic';
import addMusic from './dispatches/addMusic';
import changeMusic from './dispatches/changeMusic';
import removeMusic from './dispatches/removeMusic';

/**
* Import Check Internet Connection
*/
import isConnected from './isConnected';

/**
* Import Utilities
*/
import isEmpty from '../utilities/isEmpty';

/**
* Import Error handler
*/
import handleError from './handleError';

export default function (music) {

	// return fetch('countries.php', {}, setCountries);

    return ( (dispatch) => {

        return (
            new Promise( (resolve, reject) => {

                try {

                	const errorHandler= (error) => ( resolve({ errors: [error] }) );

                    const _handleError = (error) => {
                        
                        reject(error);

                        return handleError(error);
                    };

                	const dbRef = firebase.firestore().collection('music');

                	let _music = {};
                    let addedMusic = {};
                    let changedMusic = {};
                    let removedMusic = {};
                    let _dispatch = undefined;

                    dbRef.onSnapshot( (music) => {
                    	
                        addedMusic = {};
                        changedMusic = {};
                        removedMusic = {};
                        
                        music.docChanges.forEach( (change) => {

                            if (change.type == "added")
                                return (addedMusic[change.doc.id] = change.doc.data());
                            else if (change.type == "modified")
                                return (changedMusic[change.doc.id] = change.doc.data());
                            else if (change.type == "removed")
                                return (removedMusic[change.doc.id] = change.doc.data());
                        } );

                        if (!isEmpty(addedMusic))
                            _dispatch = dispatch( addMusic(addedMusic) );

                        if (!isEmpty(changedMusic))
                            _dispatch = dispatch( changeMusic(changedMusic) );

                        if (!isEmpty(removedMusic))
                            _dispatch = dispatch( removeMusic(removedMusic) );

                        return _dispatch;

                    }, errorHandler);

                    if (!music.silent)
	                	return (
	                        isConnected().then( (isConnected) => {
                            
                                if (!isEmpty(isConnected.errors)) return errorHandler(isConnected.errors[0]);
                                else {

                                    isConnected.handleTimeout(errorHandler);
                                    
                                    return (
    	                            	dbRef.get().then( (music) => {

                                            clearTimeout(isConnected.timeout);

                        					_music = {};

                        					music.forEach( (music) => ( _music[music.id] = music.data() ) );

                                            resolve(_music);

                                            return dispatch( setMusic(_music) );

                                        }, errorHandler)
                                        .catch(_handleError)
                                    );
	                            }
	                        }, errorHandler)
	                        .catch(_handleError)
	                    );

                } catch (error) {
                    return _handleError(error);
                }
            } )
        );
    } );
}