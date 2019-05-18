import firebase from 'react-native-firebase';
// import fetch from './fetch';
import addCollectionVideoView from './dispatches/addCollectionVideoView';
import addFilmView from './dispatches/addFilmView';
import addMusicView from './dispatches/addMusicView';

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

export default function (video) {

    // return fetch('countries.php', {}, setCountries);

    return ( (dispatch) => (

        new Promise( (resolve, reject) => {

            try {

                const errorHandler= (error) => ( resolve({ errors: [error] }) );

                const _handleError = (error) => {
                    
                    reject(error);

                    return handleError(error);
                };

                const _dispatch = (_video) => {

                    if (video.section == "collection") return addCollectionVideoView(_video);
                    else if (video.section == "films") return addFilmView(_video.video);
                    else if (video.section == "music") return addMusicView(_video.video);
                    else return;
                };

                const _resolve = (_video, timeout) => {

                    clearTimeout(timeout);

                    resolve(_video);

                    return dispatch( _dispatch(_video) );
                };

                return (
                    isConnected().then( (isConnected) => {

                        if (!isEmpty(isConnected.errors)) return errorHandler(isConnected.errors[0]);
                        else {

                            isConnected.handleTimeout(errorHandler, 30);

                            let videoRef = firebase.firestore().doc(video.path);

                            if (!video.collection) {

                                return (
                                    firebase.firestore().runTransaction( async (transaction) => {
                                        
                                        let _video = await transaction.get(videoRef);
                                        
                                        // if it does not exist throw Error
                                        if (!_video.exists) return Promise.reject("Video not Found!");
                                        else {

                                            // exists already so lets increment it + 1
                                            const newViews = _video.data().views + 1;
                                            transaction.update(videoRef, { views: newViews });
                                            
                                            // return the updated document with its new value
                                            const __video = {};
                                            __video[_video.id] = {
                                                ..._video.data(),
                                                views: newViews,
                                                path: _video.ref.path
                                            };
                                            
                                            return { video: __video };
                                        }
                                    } ).then( (_video) => ( _resolve(_video, isConnected.timeout) ), errorHandler)
                                    .catch(_handleError)
                                );

                            } else {

                                let collectionRef = firebase.firestore().collection('collections').doc(video.collection);

                                return (
                                    firebase.firestore().runTransaction( async (transaction) => {
                                        
                                        let [ _video, _collection ] = await Promise.all([
                                            transaction.get(videoRef),
                                            transaction.get(collectionRef)
                                        ]);
                                        
                                        // if it does not exist throw Error
                                        if (!_video.exists) return Promise.reject(new Error("Video not Found!"));
                                        else if (!_collection.exists) return Promise.reject(new Error("Collection not Found!"));
                                        else {

                                            // exists already so lets increment it + 1
                                            const newVideoViews = _video.data().views + 1;
                                            transaction.update(videoRef, { views: newVideoViews });

                                            const newCollectionViews = _collection.data().views + 1;
                                            transaction.update(collectionRef, { views: newCollectionViews });

                                            // return the updated document with its new value
                                            const __video = {};
                                            __video[_video.id] = {
                                                ..._video.data(),
                                                views: newVideoViews,
                                                path: _video.ref.path
                                            };

                                            const __collection = {};
                                            __collection[_collection.id] = {
                                                ..._collection.data(),
                                                views: newCollectionViews,
                                                path: _collection.ref.path
                                            };
                                            
                                            return { video: __video, collection: __collection };
                                        }
                                    } ).then( (_video) => ( _resolve(_video, isConnected.timeout) ), errorHandler)
                                    .catch(_handleError)
                                );
                            }
                        }

                    }, errorHandler)
                    .catch(_handleError)
                );

            } catch (error) {
                return _handleError(error);
            }
        } )
    ) );
}