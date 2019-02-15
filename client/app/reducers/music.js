/**
* Import Utilities
*/
import isObject from './../utilities/isObject';
import isEmpty from './../utilities/isEmpty';
import isArray from './../utilities/isArray';

/**
* Define the reducer
*/
export default function (state = {}, action = {}) {

    switch(action.type) {

        case 'MUSIC_FETCHED':

            return action.films;

        case 'MUSIC_ADDED':

            if (isObject(action.music) && !isEmpty(action.music))
                Object.keys(action.music).map( (key) => (
                    state[key] = action.music[key]
                ) );

            return { ...state };

        case 'MUSIC_CHANGED':

            if (isObject(action.music) && !isEmpty(action.music))
                Object.keys(action.music).map( (key) => (
                    state[key] = action.music[key]
                ) );

            return { ...state };

        case 'MUSIC_REMOVED':

            if (isObject(action.music) && !isEmpty(action.music))
                Object.keys(action.music).map( (key) => (
                	(isArray(state))? state.splice(key, 1) : delete state[key]
                ) );

            return { ...state };

        default:

            return ( (!isEmpty(state))? state : {} );
    }
}
