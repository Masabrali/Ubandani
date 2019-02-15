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

        case 'FILMS_FETCHED':

            return action.films;

        case 'FILM_ADDED':

            if (isObject(action.film) && !isEmpty(action.film))
                Object.keys(action.film).map( (key) => (
                    state[key] = action.film[key]
                ) );

            return { ...state };

        case 'FILM_CHANGED':

            if (isObject(action.film) && !isEmpty(action.film))
                Object.keys(action.film).map( (key) => (
                    state[key] = action.film[key]
                ) );

            return { ...state };

        case 'FILM_REMOVED':

            if (isObject(action.film) && !isEmpty(action.film))
                Object.keys(action.film).map( (key) => (
                	(isArray(state))? state.splice(key, 1) : delete state[key]
                ) );

            return { ...state };

        default:

            return ( (!isEmpty(state))? state : {} );
    }
}
