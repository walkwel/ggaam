/* eslint-disable */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Character from './character';
import { observer } from 'mobx-react';

class Characters extends Component {
  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
    //this.charactersTypeArr = ['black-car', 'blue-car', 'orange-car', 'white-car'];
    this.charactersTypeArr = ['orange-car'];
  }
  render() {
    return <Fragment>
      {this.props.store.position[this.props.gameId].map((pos, index) => {
      console.log('positions', pos.passenger, this.props.store.botsQuantity);
        if (index < this.props.store.botsQuantity) {
          return (
            <Character
              key={index}
              scale={this.context.scale}
              store={this.props.store}
              gameId={this.props.gameId}
              charId={index}
              type={pos.passenger ? 'orange-car' : 'blue-car'}
            />
          )
        }
        return false;
      })}
    </Fragment>
  }
}
export default observer(Characters);