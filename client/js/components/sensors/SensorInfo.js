import React from 'react';

let location, sensor, actions, uniqueDates;

export default class SensorInfo extends React.Component{
    
    componentDidMount(){
        location = this.props.params.location;
        actions = this.props.sensorActions;
        sensor = this.props.sensor;
        
        actions.fetchUniqueDates(location);
        
        /*
        this.props.sensorActions.fetchSensorInfoYear('Grand Meadow', '2016');
        this.props.sensorActions.fetchSensorInfoMonth('Grand Meadow', '2016', 'May');
        this.props.sensorActions.fetchUniqueDates('Grand Meadow');
        */
    }
    
    componentWillReceiveProps(){
        if(sensor.fetchedUniqueDates){
            uniqueDates = sensor.uniqueDates;
            
            //!sensor.fetchedInfoMonth ? actions.fetchSensorInfoMonth(location, )
        }
    }
    
    render(){
        return(
            <div class="Content">Test123</div>
            );
    }
}