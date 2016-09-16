//import typs
import * as types from '../constants/sensor';

//defaults -
const defaultState = {
    list : [],
    info: [],
    uniqueDates: {},
    
    selectedYearIndex: 0,
    selectedMonthIndex: 0,
    
    fetchingList: false,
    fetchingInfo: false,
    fetchingUniqueDates: false,
    
    fetchedList: false,
    fetchedInfo: false,
    fetchedUniqueDates: false
};

//default reducer
export default function app(state = defaultState, action) {
    switch(action.type){
        //fetching functions - we use a fetching state to display loading images
        case types.FETCHING_LIST:
            return Object.assign({}, state, {
                fetchingList: true,
                fetchedList: false
            });
        case types.FETCHING_INFO:
            return Object.assign({}, state, {
                fetchingInfo: true,
                fetchedInfo: false
            });
        case types.FETCHING_UNIQUE_DATES:
            return Object.assign({}, state, {
               fetchingUniqueDates: true,
               fetchedUniqueDates: false
            });
        
        //other functions
        case types.LOAD_SENSOR_LIST:
            return Object.assign({}, state, {
               list: action.sensor_list,
               fetchingList: false,
               fetchedList: true
            });
        case types.LOAD_SENSOR_INFO:
            return Object.assign({}, state, {
               info: action.sensor_info,
               fetchingInfo: false,
               fetchedInfo: true
            });
        case types.LOAD_UNIQUE_DATES:
            return Object.assign({}, state, {
               uniqueDates: action.dates,
               fetchingUniqueDates: false,
               fetchedUniqueDates: true
            });
            
        //indexes
        case types.SET_SELECTED_YEAR_INDEX:
            return Object.assign({}, state, {
                selectedYearIndex: action.index
            });
        case types.SET_SELECTED_MONTH_INDEX:
            return Object.assign({}, state, {
                selectedMonthIndex: action.index
            });
    }
    //return present state if no actions get called
    return state;
}
