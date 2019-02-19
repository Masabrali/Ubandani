import setPlaying from './dispatches/setPlaying';

export default function(video) {

    return dispatch => {
        return dispatch( setPlaying(video) );
    };
}
