/**
* Import Utilities
*/
import isObject from './../utilities/isObject';

/**
* Define the reducer
*/
export default function (state = {}, action = {}) {

	switch(action.type) {

		case 'VIDEO_STARTED':

			return action.video;

		case 'VIDEO_SEEKED':

			state.seeked = action.seeked;

			return { ...state };

		case 'PLAYING_REMOVED':
			
			return {};

		default:

			return {
				id: "FV7PjvPF8BC157btnmq1",
				title: "MwanaHiphop",
				description: "Tuzikumbuke zilizopendwa",
				excerpt: "A very long story about the story itself",
				category: "puppets",
				duration: 78,
				seek: 39,
				thumbnail: "https://firebasestorage.googleapis.com/v0/b/ubandani-c4b9d.appspot.com/o/thumbnails%2FMwanaHiphop.webp?alt=media&token=e39c74b2-7132-4b0d-ba3f-20c485fa62cc",
				cover: "https://firebasestorage.googleapis.com/v0/b/ubandani-c4b9d.appspot.com/o/covers%2FMwanaHiphop.webp?alt=media&token=447cb1c3-2023-4d56-abcb-5cfdcf8a0bd8",
				video: "https://firebasestorage.googleapis.com/v0/b/ubandani-c4b9d.appspot.com/o/videos%2FMwanaHiphop.mp4?alt=media&token=ca4ccd46-ad01-4573-8eb4-3a3b2cae4d09",
				starring: "MwanaHiphop",
				cast: [ "MwanaHiphop", "Dijei" ],
				views: [],
				shares: [],
				likes: [],
				date: "2019-02-12 17:00:00"
			}

            return ( (!isEmpty(state))? state : {} );
	}
}