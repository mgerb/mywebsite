import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import reducers from './reducers/reducers';

const middleware = applyMiddleware(thunk, logger());

//create the new store with default state as an empty object
const store = createStore(reducers, {}, middleware);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;