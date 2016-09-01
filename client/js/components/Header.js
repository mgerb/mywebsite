import React from 'react';
import {bubble} from '../../assets/js/bubble';

export default class Header extends React.Component {
  componentDidMount() {
    bubble();
  }

  render() {
    return (
      <header id="header" class="Header">
        <canvas id="canvas" width="854" height="709"></canvas>
      </header>
    )
  }
}
