import * as types from "../constants/sensor";
import 'whatwg-fetch';

function loadSensorList(sensor_list){
    return {
        type: types.LOAD_SENSOR_LIST,
        sensor_list
    }
}

function loadSensorInfo(sensor_info){
    return{
        type: types.LOAD_SENSOR_INFO,
        sensor_info
    }
}

function loadUniqueDates(dates){
    return{
        type: types.LOAD_UNIQUE_DATES,
        dates
    }
}

export function setSelectedYearIndex(index){
    return{
        type: types.SET_SELECTED_YEAR_INDEX,
        index
    }
}

export function setSelectedMonthIndex(index){
    return{
        type: types.SET_SELECTED_MONTH_INDEX,
        index
    }
}

function fetchingList(){
    return {
        type: types.FETCHING_LIST
    }
}

function fetchingInfo(){
    return {
        type: types.FETCHING_INFO
    }
}

function fetchingUniqueDates(){
    return {
        type: types.FETCHING_UNIQUE_DATES
    }    
}

export function fetchSensorList(){
    return (dispatch) => {
        dispatch(fetchingList());
        return fetch('/api/allsensors')
            .then(response => response.json())
            .then(json => {
                dispatch(loadSensorList(json));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function fetchSensorInfoYear(location, year){
    return (dispatch) => {
        dispatch(fetchingInfo());
        return fetch(`/api/sensor/${location}/${year}`)
            .then(response => response.json())
            .then(json => {
                dispatch(loadSensorInfo(json));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function fetchSensorInfoMonth(location, year, month){
    return (dispatch) => {
        dispatch(fetchingInfo());
        return fetch(`/api/sensor/${location}/${year}/${month}`)
            .then(response => response.json())
            .then(json => {
                dispatch(loadSensorInfo(json));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

//this is called to initialize the sensor info page
//reloads unique dates and resets indexes
//then fetches new data for chart
export function fetchUniqueDates(location){
    return (dispatch) => {
        dispatch(fetchingUniqueDates());
        dispatch(setSelectedMonthIndex(0));
        dispatch(setSelectedYearIndex(0));
        return fetch(`/api/uniquedates/${location}`)
            .then(response => response.json())
            .then(json => {
                dispatch(loadUniqueDates(json));
                if(json.length > 0){
                    let year = json[0].year;
                    let month = json[0].months[0].monthname;
                    dispatch(fetchSensorInfoMonth(location, year, month));
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}
