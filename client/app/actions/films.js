import firebase from 'react-native-firebase';
// import fetch from './fetch';
import setFilms from './dispatches/setFilms';
import addFilm from './dispatches/addFilm';
import changeFilm from './dispatches/changeFilm';
import removeFilm from './dispatches/removeFilm';

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

export default function (films) {

	// return fetch('countries.php', {}, setCountries);

    return ( (dispatch) => (

        new Promise( (resolve, reject) => {

            try {

            	const errorHandler= (error) => ( resolve({ errors: [error] }) );

                const _handleError = (error) => {
                    
                    reject(error);

                    return handleError(error);
                };

            	const dbRef = firebase.firestore().collection('films');

            	let _films = {};
                let addedFilms = {};
                let changedFilms = {};
                let removedFilms = {};
                let _dispatch = undefined;

                dbRef.onSnapshot( (films) => {
                	
                    addedFilms = {};
                    changedFilms = {};
                    removedFilms = {};
                    
                    films.docChanges.forEach( (change) => {
                        
                        if (change.type == "added")
                            return ( addedFilms[change.doc.id] = { ...change.doc.data(), path: change.doc.ref.path } );
                        else if (change.type == "modified")
                            return ( changedFilms[change.doc.id] = { ...change.doc.data(), path: change.doc.ref.path } );
                        else if (change.type == "removed")
                            return ( removedFilms[change.doc.id] = { ...change.doc.data(), path: change.doc.ref.path } );
                    } );
                    
                    if (!isEmpty(addedFilms))
                        _dispatch = dispatch( addFilm(addedFilms) );

                    if (!isEmpty(changedFilms))
                        _dispatch = dispatch( changeFilm(changedFilms) );

                    if (!isEmpty(removedFilms))
                        _dispatch = dispatch( removeFilm(removedFilms) );

                    return _dispatch;

                }, errorHandler);

                if (!films.silent)
                	return (
                        isConnected().then( (isConnected) => {
                        
                            if (!isEmpty(isConnected.errors)) return errorHandler(isConnected.errors[0]);
                            else {

                                isConnected.handleTimeout(errorHandler);
                                
                                return (
	                            	dbRef.get().then( (films) => {

                                        clearTimeout(isConnected.timeout);

                    					_films = {};

                    					films.forEach( (film) => ( _films[film.id] = { ...film.data(), path: film.ref.path } ) );

                                        resolve(_films);

                                        return dispatch( setFilms(_films) );

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