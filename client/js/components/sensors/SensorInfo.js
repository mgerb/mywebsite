import React from 'react';
import {Link} from 'react-router';

import Loading from '../utils/Loading';
import _chartjs from 'chart.js';
import Chart from 'react-chartjs';
import {
    ChartOptions,
    DataTemplate
}
from './chartOptions';

import './SensorInfo.scss';

const LineChart = Chart.Line;

export default class SensorInfo extends React.Component {

    componentWillMount() {
        let location = this.props.params.location;
        this.props.sensorActions.fetchUniqueDates(location);
    }

    componentWillUpdate(nextProps) {
        let currentLocation = this.props.params.location,
            nextLocation = nextProps.params.location;
        
        if (currentLocation !== nextLocation){
            this.props.sensorActions.fetchUniqueDates(nextLocation);
        }
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
        let temp = JSON.parse(JSON.stringify(DataTemplate));
        
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
        
        if(!sensor.fetchedUniqueDates){
            return <Loading/>;
        }
        
        return (
            <div class="SensorInfo">
                <div class="selector-row">
                    <h2>{this.props.params.location}</h2>
                    <select onChange={(e) => {this.onChange(e, 'year')}}>
                        {sensor.uniqueDates.map(this.loadYearOptions)}
                    </select>
                    
                    <select onChange={(e) => {this.onChange(e, 'month')}} value={sensor.selectedMonthIndex}>
                        {sensor.uniqueDates[sensor.selectedYearIndex].months.map(this.loadMonthOptions)}
                    </select>
                </div>
                
                {sensor.fetchedInfo ? <LineChart data={data} options={ChartOptions} redraw/> : null}
                
                <p>Sensor data is recorded with a <a href="https://www.sparkfun.com/products/245">DS18B20</a> and <a href="https://www.sparkfun.com/products/13678">ESP8266</a> WiFi microcontroller.</p>
                
                <div>
                    <Link to="/" class="link"><i class="fa fa-caret-left" aria-hidden="true"></i> Home</Link>
                </div>
                
            </div>
        );
    }
}