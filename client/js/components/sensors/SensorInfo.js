import React from 'react';

export default class SensorInfo extends React.Component{
    
    componentDidMount(){
        this.props.sensorActions.fetchSensorInfoYear('Grand Meadow', '2016');
        this.props.sensorActions.fetchSensorInfoMonth('Grand Meadow', '2016', 'May');
    }
    render(){
        return(
            <div class="Content">Test123</div>
            );
    }
}