import React from 'react';
import Loading from '../utils/Loading';
import _chartjs from 'chart.js';
import Chart from 'react-chartjs';
import {
    Options,
    Data
}
from './chartOptions';

import './SensorInfo.scss';

const LineChart = Chart.Line;

export default class SensorInfo extends React.Component {

    componentDidMount() {
        let location = this.props.params.location;
        this.props.sensorActions.fetchUniqueDates(location);
    }

    componentWillReceiveProps(nextProps) {
        let currentLocation = this.props.params.location,
            nextLocation = nextProps.params.location;

        currentLocation !== nextLocation ? this.props.sensorActions.fetchUniqueDates(nextLocation) : null;
    }

    loadYearOptions = (date, index) => {
        return (
            <option key={index} value={index}>{date.year}</option>
        );
    }

    loadMonthOptions = (date, index) => {
        return (
            <option key={index} value={index}>{date.monthname}</option>
        );
    }

    onChange(event, type) {
        let location = this.props.params.location,
            sensor = this.props.sensor,
            actions = this.props.sensorActions,
            yearIndex = sensor.selectedYearIndex,
            monthIndex = sensor.selectedMonthIndex;

        if (type === 'year') {
            yearIndex = parseInt(event.target.value);
            monthIndex = 0;
        }
        else if (type === 'month') {
            monthIndex = parseInt(event.target.value);
        }

        let year = sensor.uniqueDates[yearIndex].year;
        let monthname = sensor.uniqueDates[yearIndex].months[monthIndex].monthname;

        actions.setSelectedMonthIndex(monthIndex);
        actions.setSelectedYearIndex(yearIndex);
        this.props.sensorActions.fetchSensorInfoMonth(location, year, monthname);
    }

    filterData(data) {
        let temp = JSON.parse(JSON.stringify(Data));

        for (let d of data) {
            let label = `${d.month}/${d.day}`;
            temp.labels.push(label);
            temp.datasets[0].data.push(d.maxtemp);
            temp.datasets[1].data.push(d.mintemp);
        }

        return temp;
    }

    render() {
        let sensor = this.props.sensor;
        let data = this.filterData(sensor.info);

        return (
            <div class="SensorInfo">
                {sensor.fetchedUniqueDates ?
                    <div class="selector-row">
                        <select onChange={(e) => {this.onChange(e, 'year')}}>
                            {sensor.uniqueDates.map(this.loadYearOptions)}
                        </select>
                        
                        <select onChange={(e) => {this.onChange(e, 'month')}} value={sensor.selectedMonthIndex}>
                            {sensor.uniqueDates[sensor.selectedYearIndex].months.map(this.loadMonthOptions)}
                        </select>
                    </div>
                : <Loading/>}
                
                {sensor.fetchedUniqueDates ? <LineChart data={data} options={Options}/> : null}
            </div>
        );
    }
}