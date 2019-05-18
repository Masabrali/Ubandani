/**
* Import Utilities
*/
import isEmpty from './../utilities/isEmpty';

/**
* Define the reducer
*/
export default function (state = {}, action = {}) {

	switch(action.type) {

		case 'VIDEO_STARTED':

			return action.video;

		case 'VIDEO_SEEKED':

			state.seek = action.seek;

			return { ...state };

		case 'PLAYING_REMOVED':
			
			return {};

		default:

            return ( (!isEmpty(state))? state : {} );
	}
}