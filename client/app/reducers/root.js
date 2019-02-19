// Import combineReducers
import { combineReducers } from 'redux';

// Import reducers
import languages from './languages';
import language from './language';
import user from './user';
import months from './months';
import countries from './countries';
import country from './country';
import links from './links';
import invitation from './invitation';
import fcm_token from './fcm_token';
import collections from './collections';
import films from './films';
import music from './music';
import playing from './playing';

// Combiner all reducers
const reducers = combineReducers({
    languages: languages,
    language: language,
    user: user,
    months: months,
    countries: countries,
    country: country,
    links: links,
    invitation: invitation,
    fcm_token: fcm_token,
    collections: collections,
    films: films,
    music: music,
    playing: playing
});

export default reducers;
