import { getAllSwatches } from 'react-native-palette';

/**
* Import Error handler
*/
import handleError from './handleError';

export default function (options, imagePath) {

    return ( (dispatch) => (
    	new Promise( (resolve, reject) => {

            try {

            	const errorHandler= (error) => ( resolve({ errors: [error] }) );

                const _handleError = (error) => {
                    
                    reject(error);

                    return handleError(error);
                };

                return (
                	getAllSwatches(options, imagePath, (error, swatches) => {
                                    
                        if (error) return errorHandler(error);
                        else {

                        	swatches.sort( (a, b) => ( b.color.population - a.color.population ) );

                        	return resolve(swatches);
                        }
                    } )
                );

            } catch (error) {
            	return _handleError(error);
            }
        } )
    ) );
}