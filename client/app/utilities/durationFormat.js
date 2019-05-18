export default function formatDuration(duration, trueTime) {

    let units;

    if (duration < 1) {

        duration = parseInt((trueTime)? Math.floor(duration * 60) : Math.ceil(duration * 60) );

        units = (duration == 1)? 'minute':'minutes';

    } else {

        duration = parseInt((trueTime)? Math.floor(duration) : Math.ceil(duration));

        if (duration > 24) {

            duration = parseInt((trueTime)? Math.floor(duration / 24) : Math.ceil(duration / 24));

            if (duration > 7) {

                duration = parseInt((trueTime)? Math.floor(duration / 7) : Math.ceil(duration / 7));

                if (duration > 4) {

                    duration = parseInt((trueTime)? Math.floor(duration / 4) : Math.ceil(duration / 4));

                    if (duration > 12) {

                        duration = parseInt((trueTime)? Math.floor(duration / 12) : Math.ceil(duration / 12));
                        
                        units = (duration == 1)? 'year':'years';

                    } else units = (duration == 1)? 'month':'months';

                } else units = (duration == 1)? 'week':'weeks';

            } else units = (duration == 1)? 'day':'days';

        } else units = (duration == 1)? 'hour':'hours';
    }

    return { duration: duration, units: units };
}
