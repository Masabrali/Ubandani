import removePlaying from './dispatches/removePlaying';

export default function(video) {
    return ( dispatch => ( dispatch( removePlaying(video) ) ) );
}
