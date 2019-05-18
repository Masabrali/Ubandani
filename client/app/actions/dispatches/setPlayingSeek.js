export default function (seek) {
    return {
        type: 'VIDEO_SEEKED',
        seek
    };
}
