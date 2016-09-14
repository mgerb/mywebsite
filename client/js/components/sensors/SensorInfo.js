import React from 'react';

let location, sensor, actions, uniqueDates, fetchedAll;

export default class SensorInfo extends React.Component{
    
    componentDidMount(){
        location = this.props.params.location;
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
    
    onYearChange(event){
        this.props.sensorActions.setSelectedYearIndex(parseInt(event.target.value));
    }
    
    onMonthChange(event){
        this.props.sensorActions.setSelectedMonthIndex(parseInt(event.target.value));
    }
    
    render(){
        sensor = this.props.sensor;
        return(
            <div class="Content">
                <select onChange={this.onYearChange.bind(this)}>
                    {sensor.fetchedUniqueDates
                        ? sensor.uniqueDates.map(this.loadYearOptions)
                        : null
                    }
                </select>
                
                <select onChange={this.onMonthChange.bind(this)}>
                    {sensor.fetchedUniqueDates
                        ? sensor.uniqueDates[sensor.selectedYearIndex].months.map(this.loadMonthOptions)
                        : null
                    }
                </select>
            </div>
            );
    }
}