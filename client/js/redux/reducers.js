//just using one reducer - use combineReducers from redux to modularize things
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

//import typs
import * as types from './constants';

//defaults - 
const defaultState = {
    preview: {posts: []},
    filteredPreview: {posts: []}
};

//default reducer
function reducer(state = defaultState, action){
    //every reducer gets called when an action is called - we check for the type to modify our state accordingly
    switch (action.type){
        case types.INIT_PREVIEW:
            return Object.assign({}, state, {
                preview: Object.assign({}, state.preview, action.posts)
            });
        case types.FILTER_PREVIEW:
            return Object.assign({}, state, {
                filteredPreview: Object.assign({}, state.filteredPreview, action.posts)
            })
    }
    
    //return present state if no actions get called
    return state;
}

const allReducers = combineReducers({
    reducer,
    routing: routerReducer
});

export default allReducers;