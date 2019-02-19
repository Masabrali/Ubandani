import firebase from 'react-native-firebase';
// import fetch from './fetch';
import setCollectionVideos from './dispatches/setCollectionVideos';
import addCollectionVideo from './dispatches/addCollectionVideo';
import changeCollectionVideo from './dispatches/changeCollectionVideo';
import removeCollectionVideo from './dispatches/removeCollectionVideo';

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

export default function (collection) {

	// return fetch('countries.php', {}, setCountries);

    return ( (dispatch) => (

        new Promise( (resolve, reject) => {

            try {

            	const errorHandler= (error) => ( resolve({ errors: [error] }) );

                const _handleError = (error) => {
                    
                    reject(error);

                    return handleError(error);
                };

                const dbRef = firebase.firestore().collection("collections/" + collection.id + "/videos");

                let _collection = {};
                let _videos = {};
                let addedVideos = {};
                let changedVideos = {};
                let removedVideos = {};
                let _dispatch = undefined;

                dbRef.onSnapshot( (videos) => {
                    
                    addedVideos = {};
                    changedVideos = {};
                    removedVideos = {};
                    
                    videos.docChanges.forEach( (change) => {

                        if (change.type == "added")
                            return ( addedVideos[change.doc.id] = { ...change.doc.data(), path: change.doc.ref.path } );
                        else if (change.type == "modified")
                            return ( changedVideos[change.doc.id] = { ...change.doc.data(), path: change.doc.ref.path } );
                        else if (change.type == "removed")
                            return ( removedVideos[change.doc.id] = { ...change.doc.data(), path: change.doc.ref.path } );
                    } );

                    if (!isEmpty(addedVideos))
                        _dispatch = dispatch( addCollectionVideo({ key: collection.id, video: addedVideos }) );

                    if (!isEmpty(changedVideos))
                        _dispatch = dispatch( changeCollectionVideo({ key: collection.id, video: changedVideos}) );

                    if (!isEmpty(removedVideos))
                        _dispatch = dispatch( removeCollectionVideo({ key: collection.id, video: removedVideos}) );

                    return _dispatch;

                }, errorHandler);

                if (!collection.silent)
                    return (
                        isConnected().then( (isConnected) => {
                        
                            if (!isEmpty(isConnected.errors)) return errorHandler(isConnected.errors[0]);
                            else {

                                isConnected.handleTimeout(errorHandler);
                                
                                return (
                                    dbRef.get().then( (videos) => {

                                        clearTimeout(isConnected.timeout);

                                        _videos = {};

                                        videos.forEach( (video) => ( _videos[video.id] = { ...video.data(), path: video.ref.path } ) );

                                        _collection = { key: collection.id, videos: _videos };

                                        resolve(_collection);

                                        return dispatch( setCollectionVideos(_collection) );

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
    ) );
}