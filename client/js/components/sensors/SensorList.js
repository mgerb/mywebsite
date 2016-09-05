import React from 'react';
import 'whatwg-fetch';

export default class SensorList extends React.Component {

  insertSensorData = (sensor, index) => {
    const date = new Date(sensor.updated);

    return (
      <div key={index}>
        <h3>{sensor.location}</h3>
        <p>{sensor.temperature}</p>
        <p>{date.toString()}</p>
      </div>
    );
  }
  render() {
    const list = this.props.list;
    
    return (
      <div>
        {list.map(this.insertSensorData)}
      </div>
    )
  }
}
