import React, { Component, Fragment } from 'react';
import { Loop } from 'react-game-kit';
import Grid from '@material-ui/core/Grid'
import ScoreDisplay from './ScoreDisplay'
import {PLAY, NOT_STARTED, PAUSED} from './constants'
import config from '../config';
import GameWindow from './gameWindow';
export default class App extends Component {
  constructor () {
    super()
    this.state = {
      gameState: NOT_STARTED
    }
  }
  // end game
  endGame = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
    this.props.store.resetGame();
    this.props.store.score = [0, 0];
    this.props.store.time = this.props.gameData.gameTime || config.time;
    this.props.store.mode = gameState;
  }
  // start game
  startGame = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
    this.props.store.mode = gameState;
  }
  // Pause Resume game
  pauseResumeGame = () => {
    this.props.store.mode = this.props.store.mode === PLAY ? PAUSED : PLAY;
    this.setState(() => ({gameState: this.props.store.mode }));
  }

  render() {
    const {gameState} = this.state;
    const {store} = this.props;
    return (
      <Fragment>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <ScoreDisplay
              store={store}
              gameState={gameState}
              endGame={this.endGame}
              startGame={this.startGame}
              pauseResumeGame={this.pauseResumeGame}
            />
          </Grid>
          {this.props.store.mode === NOT_STARTED ? (
            <div>Not Started</div> )
          : (
            <Loop>
              <Grid container spacing={16}>
                <Grid item xs={!this.props.gameData.singleWindowGame ? 6 : 12}>
                  <GameWindow {...this.props} />
                </Grid>
                {!this.props.gameData.singleWindowGame && (
                  <Grid item xs={6}>
                    <GameWindow {...this.props} />
                  </Grid>
                )}
              </Grid>
            </Loop>
          )}
        </Grid>
      </Fragment>
  )}
}