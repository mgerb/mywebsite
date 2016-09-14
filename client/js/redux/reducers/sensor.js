//import typs
import * as types from '../constants/sensor';

//defaults -
const defaultState = {
    list : [],
    infoMonth: [],
    infoYear: [],
    uniqueDates: {},
    
    selectedYearIndex: 0,
    selectedMonthIndex: 0,
    
    fetchingList: false,
    fetchingInfoMonth: false,
    fetchingInfoYear: false,
    fetchingUniqueDates: false,
    
    fetchedList: false,
    fetchedInfoMonth: false,
    fetchedInfoYear: false,
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
        case types:FETCHING_UNIQUE_DATES:
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
