import { NetInfo } from 'react-native';
import firebase from 'react-native-firebase';

/**
* Import TIMEOUT config
*/
import { TIMEOUT } from '../config';

/**
* Import Error handler
*/
import handleError from './handleError';

export default function() {

	return (
		new Promise( (resolve, reject) => {

			try {

				const errorHandler= (error) => ( resolve({ errors: [error] }) );

				const _handleError = (error) => {
                        
                    reject(error);

                    return handleError(error);
                };

				return (
					NetInfo.isConnected.fetch().then( (isConnected) => {
					
						if (!isConnected)
								return errorHandler(new Error("No Internet Connection available", "ERR_INTERNET_DISCONNECTED"));
						else {
							
							isConnected = { isConnected: isConnected, timeout: undefined };

							isConnected.handleTimeout = (errorHandler) => {
									
									isConnected.timeout = setTimeout( () => (
										errorHandler(new Error("No Internet Connection available", "ERR_CONNECTION_TIMEOUT"))
									), TIMEOUT * 1000)

									return isConnected.timeout;
								};

							return resolve(isConnected);
						}

					}, errorHandler)
	                .catch(_handleError)
	            );

			} catch (error) {
                return _handleError(error);
			}
		} )
	);
}
