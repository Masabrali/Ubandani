import setPlayingSeek from './dispatches/setPlayingSeek';

export default function(seek) {

    return dispatch => {
        return dispatch( setPlayingSeek(seek) );
    };
}
