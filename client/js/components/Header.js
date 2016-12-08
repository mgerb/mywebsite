import React from 'react';
//import {bubble} from '../../assets/js/bubble';

import '../../assets/scss/Header.scss';

export default class Header extends React.Component {
  /*
  componentDidMount() {
    bubble();
    //insert this:
    <canvas id="canvas" width="854" height="709"></canvas>
  }
  */

  render() {
    return (
      <header id="header" class="Header"/>
    )
  }
}
