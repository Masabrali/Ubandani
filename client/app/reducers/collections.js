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

            if (isObject(state) && !isEmpty(state))
                Object.keys(state).map( (key) => {
                    
                    action.collections[key].colors = state[key].colors;

                    action.collections[key].videos = state[key].videos;

                    return action.collections[key];
                } );

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

        case 'COLLECTION_COLORS_FETCHED':

            state[action.collection.key].colors = action.collection.colors;

            return { ...state };

        case 'COLLECTION_VIDEOS_FETCHED':
            
            state[action.collection.key].videos = action.collection.videos

            return { ...state };

        case 'COLLECTION_VIDEO_ADDED':

            if (isObject(action.collection.video) && !isEmpty(action.collection.video))
                Object.keys(action.collection.video).map( (key) => {

                    if (isEmpty(state[action.collection.key].videos))
                        state[action.collection.key].videos = {};

                    state[action.collection.key].videos[key] = action.collection.video[key];

                    return action.collection.video[key];
                } );

            return { ...state };

        case 'COLLECTION_VIDEO_CHANGED':

            if (isObject(action.collection.video) && !isEmpty(action.collection.video))
                Object.keys(action.collection.video).map( (key) => {
                    
                    if (isEmpty(state[action.collection.key].videos))
                        state[action.collection.key].videos = {};

                    state[action.collection.key].videos[key] = action.collection.video[key];

                    return action.collection.video[key];
                } );

            return { ...state };

        case 'COLLECTION_VIDEO_VIEWED':

            if (isObject(action.collection.collection) && !isEmpty(action.collection.collection) && isObject(action.collection.video) && !isEmpty(action.collection.video)) {

                if (isObject(action.collection.video) && !isEmpty(action.collection.video))
                    Object.keys(action.collection.video).map( (key) => {
                        
                        if (isEmpty(state[action.collection.video[key].collection].videos))
                            state[action.collection.video[key].collection].videos = {};

                        state[action.collection.video[key].collection].videos[key] = action.collection.video[key];

                        return action.collection.video[key];
                    } );

                if (isObject(action.collection.collection) && !isEmpty(action.collection.collection))
                    Object.keys(action.collection.collection).map( (key) => (
                        state[key] = { ...action.collection.collection[key], videos: state.videos }
                    ) );
            }

            return { ...state };

        case 'COLLECTION_VIDEO_REMOVED':

            let collectionVideos = {};

            if (isObject(action.collection.video) && !isEmpty(action.collection.video))
                Object.keys(action.collection.video).map( (key) => {

                    if (!isEmpty(state[action.collection.key].videos)) {
                        
                        collectionVideos = state[action.collection.key].videos;

                        if (isArray(collectionVideos)) collectionVideos.splice(key, 1);
                        else delete collectionVideos[key];

                        state[action.collection.key].videos = collectionVideos;
                    }

                    return collectionVideos;
                } );

            return { ...state };

        default:

            return ( (!isEmpty(state))? state : {} );
    }
}
