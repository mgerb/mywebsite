//import typs
import * as types from '../constants/sensor';

//defaults -
const defaultState = {
    list : [],
    infoMonth: [],
    infoYear: [],
    
    fetchingList: false,
    fetchingInfoMonth: false,
    fetchingInfoYear: false,
    
    fetchedList: false,
    fetchedInfoMonth: false,
    fetchedInfoYear: false
};

//default reducer
export default function app(state = defaultState, action) {
    switch(action.type){
        case types.FETCHING_LIST:
            return Object.assign({}, state, {
                fetchingList: true,
                fetchedList: false
            });
        case types.FETCHING_INFO_MONTH:
            return Object.assign({}, state, {
                fetchingInfoMonth: true,
                fetchedInfoMonth: false
            });
        case types.FETCHING_INFO_YEAR:
            return Object.assign({}, state, {
               fetchingInfoYear: true,
               fetchedInfoYear: false
            });
        
        case types.LOAD_SENSOR_LIST:
            return Object.assign({}, state, {
               list: action.sensor_list,
               fetchingList: false,
               fetchedList: true
            });
        case types.LOAD_SENSOR_INFO_MONTH:
            return Object.assign({}, state, {
               infoMonth: action.sensor_info,
               fetchingInfoMonth: false,
               fetchedInfoMonth: true
            });
        case types.LOAD_SENSOR_INFO_YEAR:
            return Object.assign({}, state, {
                infoYear: action.sensor_info,
                fetchingInfoYear: false,
                fetchedInfoYear: true
            });
    }
    //return present state if no actions get called
    return state;
}
