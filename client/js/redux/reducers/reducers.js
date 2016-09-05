//just using one reducer - use combineReducers from redux to modularize things
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import app from './app';
import sensor from './sensor';

const allReducers = combineReducers({
    app,
    sensor,
    routing: routerReducer
});

export default allReducers;