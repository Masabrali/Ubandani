import firebase from 'react-native-firebase';
// import fetch from './fetch';
import setCollections from './dispatches/setCollections';
import addCollection from './dispatches/addCollection';
import changeCollection from './dispatches/changeCollection';
import removeCollection from './dispatches/removeCollection';

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

export default function (collections) {

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

                	const dbRef = firebase.firestore().collection('collections');

                	let _collections = {};
                    let addedCollections = {};
                    let changedCollections = {};
                    let removedCollections = {};
                    let _dispatch = undefined;

                    dbRef.onSnapshot( (collections) => {
                    	
                        addedCollections = {};
                        changedCollections = {};
                        removedCollections = {};
                        
                        collections.docChanges.forEach( (change) => {

                            if (change.type == "added")
                                return (addedCollections[change.doc.id] = change.doc.data());
                            else if (change.type == "modified")
                                return (changedCollections[change.doc.id] = change.doc.data());
                            else if (change.type == "removed")
                                return (removedCollections[change.doc.id] = change.doc.data());
                        } );

                        if (!isEmpty(addedCollections))
                            _dispatch = dispatch( addCollection(addedCollections) );

                        if (!isEmpty(changedCollections))
                            _dispatch = dispatch( changeCollection(changedCollections) );

                        if (!isEmpty(removedCollections))
                            _dispatch = dispatch( removeCollection(removedCollections) );

                        return _dispatch;

                    }, errorHandler);

                    if (!collections.silent)
	                	return (
	                        isConnected().then( (isConnected) => {
                            
                                if (!isEmpty(isConnected.errors)) return errorHandler(isConnected.errors[0]);
                                else {

                                    isConnected.handleTimeout(errorHandler);
                                    
                                    return (
    	                            	dbRef.get().then( (collections) => {

                                            clearTimeout(isConnected.timeout);

                        					_collections = {};

                        					collections.forEach( (collection) => ( _collections[collection.id] = collection.data() ) );

                                            resolve(_collections);

                                            return dispatch( setCollections(_collections) );

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