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
        return (
            <div class="SensorInfo">
                {sensor.fetchedUniqueDates ?
                    <div class="selector-row">
                        <h2>{this.props.params.location}</h2>
                        <select onChange={(e) => {this.onChange(e, 'year')}}>
                            {sensor.uniqueDates.map(this.loadYearOptions)}
                        </select>
                        
                        <select onChange={(e) => {this.onChange(e, 'month')}} value={sensor.selectedMonthIndex}>
                            {sensor.uniqueDates[sensor.selectedYearIndex].months.map(this.loadMonthOptions)}
                        </select>
                    </div>
                : <Loading/>}
                
                {sensor.fetchedUniqueDates && sensor.fetchedInfo
                    ? <LineChart data={data} options={ChartOptions} redraw/>
                    : null}
                {sensor.fetchedUniqueDates && sensor.fetchedInfo
                    ? <div class="home"><Link to="/" class="link"><i class="fa fa-caret-left" aria-hidden="true"></i> Home</Link></div>
                    : null}
            </div>
        );
    }
}