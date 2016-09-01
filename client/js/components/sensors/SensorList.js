import React from 'react';
import 'whatwg-fetch';

export default class SensorList extends React.Component {

  constructor(){
    super();

    this.state = {
      sensors : {},
      fetching: false,
      fetched: false
    }
  }

  componentDidMount(){
    this.loadSensorData();
  }

  loadSensorData(){
    this.setState({
      fetching: true
    });

    fetch('/api/allsensors')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({
          sensors: json,
          fetching: false,
          fetched: true
        });
      })
      .catch((e) => {
        console.log('Loading sensors failed', e)
      });
  }

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
  render(){
    return (
      <div>
        {this.state.fetched ? this.state.sensors.map(this.insertSensorData) : null}
      </div>
    )
  }
}
