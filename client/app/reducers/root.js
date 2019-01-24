// Import combineReducers
import { combineReducers } from 'redux';

// Import reducers
import languages from './languages';
import language from './language';
import months from './months';
import countries from './countries';
import country from './country';
import links from './links';
import invitation from './invitation';
import fcm_token from './fcm_token';

// Combiner all reducers
const reducers = combineReducers({
    languages: languages,
    language: language,
    months: months,
    countries: countries,
    country: country,
    links: links,
    invitation: invitation,
    fcm_token: fcm_token
});

export default reducers;
