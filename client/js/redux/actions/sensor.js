import * as types from "../constants/sensor";
import 'whatwg-fetch';

function loadSensorList(sensor_list){
    return {
        type: types.LOAD_SENSOR_LIST,
        sensor_list
    }
}

function loadSensorInfoYear(sensor_info){
    return{
        type: types.LOAD_SENSOR_INFO_YEAR,
        sensor_info
    }
}

function loadSensorInfoMonth(sensor_info){
    return{
        type: types.LOAD_SENSOR_INFO_MONTH,
        sensor_info
    }
}

function loadUniqueDates(dates){
    return{
        type: types.LOAD_UNIQUE_DATES,
        dates
    }
}

function fetchingList(){
    return {
        type: types.FETCHING_LIST
    }
}

function fetchingInfoYear(){
    return {
        type: types.FETCHING_INFO_YEAR
    }
}

function fetchingInfoMonth(){
    return {
        type: types.FETCHING_INFO_MONTH
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
        dispatch(fetchingInfoYear());
        return fetch(`/api/sensor/${location}/${year}`)
            .then(response => response.json())
            .then(json => {
                dispatch(loadSensorInfoYear(json));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function fetchSensorInfoMonth(location, year, month){
    return (dispatch) => {
        dispatch(fetchingInfoMonth());
        return fetch(`/api/sensor/${location}/${year}/${month}`)
            .then(response => response.json())
            .then(json => {
                dispatch(loadSensorInfoMonth(json));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function fetchUniqueDates(location){
    return (dispatch) => {
        dispatch(fetchingUniqueDates());
        return fetch(`/api/uniquedates/${location}`)
            .then(response => response.json())
            .then(json => {
                dispatch(loadUniqueDates(json));
            })
            .catch(error => {
                console.log(error);
            });
    }
}