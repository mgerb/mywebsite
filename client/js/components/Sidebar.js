import React from 'react';

//components
import SensorList from './sensors/SensorList';

//assets
import me from '../../assets/images/me.jpg';
import '../../assets/scss/Sidebar.scss';

export default class Sidebar extends React.Component {

  constructor() {
    super();

    this.state = {
      toggler: ""
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    let temp = this.state.toggler;
    temp = temp === "open" ? "" : "open";

    this.setState({
      toggler: temp
    });
  }

  render() {
    return (
      <div class={"Sidebar " + this.state.toggler}>
        <a onClick={this.onToggle} class="toggler">
          <i
            class="fa fa-2x fa-navicon"
            aria-hidden="true" />
        </a>
        <h2>About Me</h2>
        <img src={me}/>
        <p>
          My name is Mitchell and I have a passion for software development. I am currently a software engineer and enjoy working on personal projects in my free time.
        </p>

        <p>
          <i class="fa fa-envelope" aria-hidden="true"></i>
          <a class="link" href="mailto:mgerb42@gmail.com"> eMail</a>
        </p>
        <p>
          <i class="fa fa-linkedin-square" aria-hidden="true"></i>
          <a class="link" href="https://www.linkedin.com/in/mitchell-gerber-125391b3" target="_blank"> LinkedIn</a>
        </p>
        <p>
          <i class="fa fa-github" aria-hidden="true"></i>
          <a class="link" href="https://github.com/mgerb" target="_blank"> GitHub</a>
        </p>
        <p>
          <i class="fa fa-wpforms" aria-hidden="true"> </i>
          <a href="/resume" class="link"> Resume</a>
        </p>

        <br/>

        <h2>Sensors</h2>
        <hr/>
        {this.props.sensor.fetchedList ? <SensorList list={this.props.sensor.list}/> : null}
      </div>
    );
  }
}
