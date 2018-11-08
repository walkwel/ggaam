import React, { Component } from 'react';
import { Loop, Stage } from 'react-game-kit';
import Tile from './tile';
import Characters from './characters';
import Road from './road';

import Passengers from './passengers';
import Destinations from './destination';
import Updater from './updater.js';
import Grid from '@material-ui/core/Grid'

export default class App extends Component {
  render() {
    return <Loop>
      <Updater {...this.props}></Updater>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <div className="stage" style={{ width: '100%' }}>
            <Stage width={1100} height={480}>
              <Tile></Tile>
              {/* <Road></Road> */}
              {/* <Passengers store={this.props.store} gameId={0}></Passengers> */}
              <Characters store={this.props.store} gameId={0}></Characters>
              {/* 
              
              <Destinations store={this.props.store} gameId={0}></Destinations>
              
              {this.props.gameData.singleWindowGame && <Destinations store={this.props.store} gameId={1}></Destinations>}
              {this.props.gameData.singleWindowGame && <Characters store={this.props.store} gameId={1}></Characters>} */}
            </Stage>
          </div>
        </Grid>
      </Grid>
    </Loop>
  }
}