import React from 'react';

//components
import SensorList from './sensors/SensorList';
import AboutMe from './utils/AboutMe';

//assets
import '../../assets/scss/Sidebar.scss';

export default class Sidebar extends React.Component {

  constructor() {
    super();

    this.state = {
      toggler: ""
    };

    this.onToggle = this.onToggle.bind(this);
    this.toggleOff = this.toggleOff.bind(this);
  }

  onToggle() {
    let temp = this.state.toggler;
    temp = temp === "open" ? "" : "open";

    this.setState({
      toggler: temp
    });
  }
  
  toggleOff(){
    if(this.state.toggler !== ""){
      this.setState({
        toggler : ""
      });
    }
  }
  
  render() {
    return (
      <div class={"Sidebar " + this.state.toggler}>
        <a onClick={this.onToggle} class="toggler">
          <i
            class="fa fa-2x fa-navicon"
            aria-hidden="true" />
        </a>
        <AboutMe/>
        {this.props.sensor.fetchedList ? <SensorList list={this.props.sensor.list} toggleOff={this.toggleOff}/> : null}
      </div>
    );
  }
}
