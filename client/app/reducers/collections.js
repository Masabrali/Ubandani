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

        case 'COLLECTIONS_FETCHED':

            return action.collections;

        case 'COLLECTION_ADDED':

            if (isObject(action.collection) && !isEmpty(action.collection))
                Object.keys(action.collection).map( (key) => (
                    state[key] = action.collection[key]
                ) );

            return { ...state };

        case 'COLLECTION_CHANGED':

            if (isObject(action.collection) && !isEmpty(action.collection))
                Object.keys(action.collection).map( (key) => (
                    state[key] = action.collection[key]
                ) );

            return { ...state };

        case 'COLLECTION_REMOVED':

            if (isObject(action.collection) && !isEmpty(action.collection))
                Object.keys(action.collection).map( (key) => (
                	(isArray(state))? state.splice(key, 1) : delete state[key]
                ) );

            return { ...state };

        default:

            return ( (!isEmpty(state))? state : {} );
    }
}
