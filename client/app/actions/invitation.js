import firebase from 'react-native-firebase';
// import fetch from './fetch';
import setInvitation from './dispatches/setInvitation';
import updateInvitation from './dispatches/updateInvitation';
import changeInvitation from './dispatches/changeInvitation';

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

export default function fetchInvitation(invitation) {

    // return fetch('products.php', products, setProducts);

    return ( (dispatch) => {

        return (
            new Promise( (resolve, reject) => {

                const _handleError = (error) => {
                        
                    clearTimeout(isConnected.timeout);
                    
                    reject(error);

                    return handleError(error);
                };
                    
                try {

                    const errorHandler = (error) => ( resolve({ errors: [error] }) );

                    const dbRef = firebase.database().ref('invitation');

                    dbRef.on('child_added', (invitation) => ( dispatch( updateInvitation({ key: invitation.key, value: invitation.val() }) ) ), errorHandler);

                    dbRef.on('child_changed', (invitation) => ( dispatch( updateInvitation({ key: invitation.key, value: invitation.val() }) ) ), errorHandler);

                    dbRef.on('child_removed', (invitation) => ( dispatch( changeInvitation({ key: invitation.key, value: invitation.val() }) ) ), errorHandler);

                    return (
                        isConnected().then( (isConnected) => {
                                
                            if (!isEmpty(isConnected.errors)) return errorHandler(isConnected.errors[0]);
                            else {

                                isConnected.handleTimeout(errorHandler);

                                return (
                                    dbRef.once('value').then( (invitation) => {

                                        clearTimeout(isConnected.timeout);
                                        
                                        resolve(invitation.val());

                                        return dispatch( setInvitation(invitation.val()) );

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
