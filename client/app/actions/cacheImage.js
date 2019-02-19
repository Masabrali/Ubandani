import { ImageCacheManager } from 'react-native-cached-image';

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

export default function (imageUrl) {

    return ( (dispatch) => (
    	new Promise( (resolve, reject) => {

            try {

            	const errorHandler= (error) => ( resolve({ errors: [error] }) );

                const _handleError = (error) => {
                    
                    reject(error);

                    return handleError(error);
                };

                return (
	                isConnected().then( (isConnected) => {
	                
	                    if (!isEmpty(isConnected.errors)) return errorHandler(isConnected.errors[0]);
	                    else {

	                        isConnected.handleTimeout(errorHandler);
	                        
	                        return (
	                        	ImageCacheManager().downloadAndCacheUrl(imageUrl).then( (imagePath) => {

	                        		clearTimeout(isConnected.timeout);

                                    return resolve(imagePath);

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