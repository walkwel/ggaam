import React, { Component, Fragment } from 'react';
import { Loop } from 'react-game-kit';
import Updater from './updater.js';
import Grid from '@material-ui/core/Grid'
import ScoreDisplay from './ScoreDisplay'
import {PLAY, NOT_STARTED, PAUSED} from './constants'
import config from '../simulation/config';
import GameWindow from './gameWindow';
export default class App extends Component {
  constructor () {
    super()
    this.state = {
      gameStopped: NOT_STARTED
    }
  }
  // restart game
  endGame = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameStopped: gameState}));
    this.props.store.resetGame();
    this.props.store.score = [0, 0];
    this.props.store.time = this.props.gameData.gameTime || config.time;
    this.props.store.mode = gameState;
  }
  // start game
  startGame = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameStopped: gameState}));
    this.props.store.mode = gameState;
  }
  // evaluateStringCode
  evaluateStringCode = code => {
    if (typeof code === 'string') {
      try {
        // eslint-disable-next-line
        return eval("(" + code + ")");
      } catch (error) {
        return () => { return { right: true } };
      }
    }
    return code;
  }
  // Pause Resume game
  pauseResumeGame = () => {
    this.props.store.mode = this.props.store.mode === PLAY ? PAUSED : PLAY;
    this.setState(() => ({gameStopped:this.props.store.mode }))
  }

  render() {
    const {gameStopped} = this.state;
    const {playAsPlayer2, store} = this.props;
    return (
      <Fragment>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <ScoreDisplay
              store={store}
              gameState={gameStopped}
              playAsPlayer2={playAsPlayer2}
              endGame={this.endGame}
              startGame={this.startGame}
              pauseResumeGame={this.pauseResumeGame}
            />
          </Grid>
          {this.props.store.mode === NOT_STARTED ? (
            <div>Not Started</div> )
          : (
            <Loop>
              <Updater {...this.props}></Updater>
              <Grid container spacing={16}>
                <Grid item xs={!this.props.gameData.singleWindowGame ? 6 : 12}>
                  <GameWindow store={this.props.store} />
                </Grid>
                {!this.props.gameData.singleWindowGame && (
                  <Grid item xs={6}>
                    <GameWindow store={this.props.store} />
                  </Grid>
                )}
              </Grid>
            </Loop>
          )}
        </Grid>
      </Fragment>
  )}
}