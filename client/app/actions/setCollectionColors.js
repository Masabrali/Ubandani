import setCollectionColors from './dispatches/setCollectionColors';

export default function(collection) {

    return dispatch => {
        return dispatch( setCollectionColors(collection) );
    };
}
