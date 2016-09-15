import React from 'react';
import Loading from '../utils/Loading';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
}
from 'recharts';

import './SensorInfo.scss';

export default class SensorInfo extends React.Component {

    componentDidMount() {
        let location = this.props.params.location;
        this.props.sensorActions.fetchUniqueDates(location);
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
        let filteredData = [];

        for (let d of data) {
            filteredData.push({
                name: d.day,
                max: d.maxtemp,
                min: d.mintemp
            });
        }
        
        return filteredData;
    }
    
    render() {
        let sensor = this.props.sensor;
        let data = this.filterData(sensor.info);
        
        return (
            <div class="SensorInfo">
                <div class="selector-row">
                    <select onChange={(e) => {this.onChange(e, 'year')}}>
                        {sensor.fetchedUniqueDates
                            ? sensor.uniqueDates.map(this.loadYearOptions)
                            : null
                        }
                    </select>
                    
                    <select onChange={(e) => {this.onChange(e, 'month')}} value={sensor.selectedMonthIndex}>
                        {sensor.fetchedUniqueDates
                            ? sensor.uniqueDates[sensor.selectedYearIndex].months.map(this.loadMonthOptions)
                            : null
                        }
                    </select>
                </div>
                <div>
                    {sensor.fetchedInfo ?  
                    <LineChart width={600} height={300} data={data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="max" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="min" stroke="#82ca9d" />
                    </LineChart>
                    : <Loading/>}
                </div>
            </div>
        );
    }
}