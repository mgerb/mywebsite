import React from 'react';
import {browserHistory} from 'react-router';
import 'whatwg-fetch';

import './SensorList.scss';

const options = {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

export default class SensorList extends React.Component {
  
  constructor(){
    super();
    this.openLink = this.openLink.bind(this);
  }
  
  openLink(location){
    browserHistory.push(`/sensor/${location}`);
    this.props.toggleOff();
  }
  
  insertSensorData = (sensor, index) => {
    const date = new Date(sensor.updated);

    return (
      <div key={index} class="row" onClick={() => {this.openLink(sensor.location)}}>
        <div class="item">
          <h1>{sensor.temperature}°f</h1>
        </div>
        <div class="item">
          <h3>{sensor.location}</h3>
          <span class="date">Updated: {date.toLocaleString('en-us', options)}
            {Date.now() - date < 420000
              ? <span class="connected"> Connected</span>
              : <span class="disconnected"> Disconnected</span>
            }
          </span>
        </div>
      </div>
    );
  }
  
  render() {
    const list = this.props.list;
    
    return (
      <div class="SensorList">
        <h2>Sensors</h2>
        {list.map(this.insertSensorData)}
      </div>
    )
  }
}
