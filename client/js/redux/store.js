import {applyMiddleware, createStore} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import thunk from 'redux-thunk';

import reducers from './reducers';

const middleware = applyMiddleware(thunk);

//create the new store with default state as an empty object
const store = createStore(reducers, {}, middleware);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;