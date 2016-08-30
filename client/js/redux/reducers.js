//just using one reducer - use combineReducers from redux to modularize things
import {
    combineReducers
} from 'redux';
import {
    routerReducer
} from 'react-router-redux';

//import typs
import * as types from './constants';

//defaults -
const defaultState = {
    preview: {
        posts: []
    },
    post: "",
    fetched: false,
    fetching: false,
    postLimit: 10
};

//default reducer
function reducer(state = defaultState, action) {
    //every reducer gets called when an action is called - we check for the type to modify our state accordingly
    switch (action.type) {
        case types.INIT_PREVIEW:
            return Object.assign({}, state, {
                preview: Object.assign({}, state.preview, action.posts),
                fetched: true,
                fetching: false
            });
        case types.LOAD_POST:
            return Object.assign({}, state, {
                post: action.post,
                fetched: true,
                fetching: false
            });
        case types.FETCHING:
            return Object.assign({}, state, {
                fetched : false,
                fetching: true
            });
        case types.INCREASE_POST_LIMIT:
            return Object.assign({}, state, {
                postLimit : state.postLimit + 10
            });
    }

    //return present state if no actions get called
    return state;
}

const allReducers = combineReducers({
    reducer,
    routing: routerReducer
});

export default allReducers;
