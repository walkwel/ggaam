/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import BlueCar from './Components/Characters/CarBlue';
import config from '../config';

class Characters extends Component {
  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount () {
  }

  render() {
    return (
      <BlueCar
        key={0}
        store={this.props.store}
        scale={this.context.scale}
        size={config.playerSize}
        gameId={this.props.gameId}
        charId={0}
      />
    )}
}
export default observer(Characters);