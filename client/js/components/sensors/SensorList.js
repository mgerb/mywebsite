import React from 'react';
import 'whatwg-fetch';

import './SensorList.scss';

export default class SensorList extends React.Component {

  insertSensorData = (sensor, index) => {
    const date = new Date(sensor.updated);

    return (
      <div key={index} class="row">
        <div class="item"><h1>{sensor.temperature}</h1><p>Connected</p></div>
        <div class="item">
          <h3>{sensor.location}</h3>
          <p>{date.toString()}</p>
        </div>
      </div>
    );
  }
  render() {
    const list = this.props.list;
    
    return (
      <div class="SensorList">
        <h2>Sensors</h2>
        <hr/>
        {list.map(this.insertSensorData)}
      </div>
    )
  }
}
