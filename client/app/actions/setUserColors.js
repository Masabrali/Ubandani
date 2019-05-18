import setCollectionColors from './dispatches/setUserColors';

export default function(colors) {

    return dispatch => {
        return dispatch( setUserColors(colors) );
    };
}
