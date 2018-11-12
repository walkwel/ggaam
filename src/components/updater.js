import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import config from '../config';
import WinningScreen from './WinningScreen';
import { PLAY } from './constants';

const PAUSE = 'pause';
const CUSTOM_CODE = 'custom code';

class Updater extends Component {
  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.loop = this.loop.bind(this);
    this.state = {
      gameOver: {
        status: false,
        message: ''
      }
    }
    this.updateStateFromProps = this.updateStateFromProps.bind(this);
  }

  loop = () => {
    if (this.props.store.mode === PLAY) {
      const gameOver = this.props.store.time <= 0 ? {
        status: true,
        winner: null,
        message: 'Time Over'
      } : this.props.store.score[0] >= this.props.store.scoreToWin || this.props.store.score[1] >= this.props.store.scoreToWin ? {
        status: true,
        winner: this.props.store.score[0] === this.props.store.score[1] ? 0 : this.props.store.score[1] >= this.props.store.scoreToWin ? 2 : 1,
        message: this.props.store.score[0] === this.props.store.score[1] ? 'Score is even' : this.props.store.score[1] >= this.props.store.scoreToWin ? 'Player 2 won!!!' : 'Player 1 won!!!'
      } : {
            status: false,
            winner: null,
            message: 'Keep Playing'
          };
      this.setState( () => ({ gameOver }));
      if (gameOver.status) {
        this.props.store.mode = PAUSE;
      }
      if (Math.abs(this.props.store.prevTime - Date.now()) >= 1000) {
        this.props.store.time--;
        this.props.store.prevTime = Date.now();
      }
      this.updatePosition()
    }
    if (this.props.store.needToRestartGame) {
      if (this.props.gameData.playMode === CUSTOM_CODE) {
        this.props.store.player2Func = this.props.store.func;
      }
      else if (this.props.gameData.playMode === CUSTOM_CODE) {
        this.props.store.player1Func = this.props.store.func;
      }
      else if (!this.props.store.player1Func)
        this.props.store.player1Func = this.props.store.func;
      this.props.store.needToRestartGame = false;
      this.restartGame();
    }
  }
  // update player position
  updatePosition = () => {
    let {x, y} = this.props.store.position[0];
    const playerSize = (((config.playerSize / 30) * this.context.scale) * 100);
    const gameWidth = Math.ceil(config.width * this.context.scale);
    const gameHeight = Math.ceil(config.height * this.context.scale);
    switch (this.props.store.direction) {
      case 'right' :
        x += config.speed;
        if(x+playerSize > gameWidth)
          x = gameWidth - playerSize
        break;
      case 'down' :
        y += config.speed;
        if(y+playerSize > gameHeight)
          y = gameHeight - playerSize
        break;
      case 'left' :
      x -= config.speed;
        if (x < 0)
          x = 0
        break;
      default :
        y -= config.speed;
        if (y < 0)
          y = 0
        break;
    }
    this.props.store.updatePosition(0, 0, {x, y}, 1);
  }

  updateStateFromProps(props) {
    if (props.player1Data) {
      this.props.store.mode = PAUSE;
      this.gameTime = this.props.gameData.gameTime || config.time;
      this.props.store.time = this.gameTime;
      this.props.store.scoreToWin = props.gameData.scoreToWin || config.scoreToWin;
      this.props.store.botsQuantity = Math.min(props.gameData.botsQuantities || props.store.botsQuantity, config.maxBotsQuantityPerGame);
      this.props.store.currentLevel = Math.min(Number(props.gameData.levelsToWin) || 1, 3);
      if (!props.player1Data.pyCode)
          this.props.store.player1Func = props.player1Data.jsCode 
      else {
        window.createFunctionFromPython(props.player1Data.pyCode);
        this.props.store.player1Func = window.getPlayersCommands;
      }
      this.props.store.player2Func = (props.player2Data || {}).jsCode;
      this.restartGame();
    } else {
      this.props.store.mode = PAUSE;
    }
  }
  restartGame = (gameState = PLAY) => {
    this.setState({
      gameOver: {
        status: false,
        winner: null,
        message: 'Keep Playing'
      }
    })
    this.props.store.score = [0, 0];
    this.props.store.time = this.props.gameData.gameTime || config.time;
    this.props.store.mode = gameState;
  }
  submitSolution = () => {
    this.props.onCommit({
      status: this.state.gameOver.winner === 0 ? 'DRAW' : this.state.gameOver.winner === 1 ? "WON" : 'LOST',
      result: this.state.gameOver.winner === 0 ? 'NONE' : this.state.gameOver.winner === 1 ? "WON" : 'LOST',
      score: [this.props.store.score[0], this.props.store.score[1]],
      timeTaken: this.gameTime - this.props.store.time,
      jsCode: this.props.gameData.playMode === CUSTOM_CODE && this.props.store.editorMode === 'javascript' ? this.props.store.player1Func.toString() : '',
      pyCode: this.props.gameData.playMode === CUSTOM_CODE && this.props.store.editorMode === 'python' ? this.props.store.editorPyCode : ''
    })
  }
  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
    this.updateStateFromProps(this.props);
    window.addEventListener('keydown',this.keyListner);
  }
  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
    window.removeEventListener('keydown',this.keyListner);
  }
  keyListner = (e) => {
      // if game paused do not update direction
      if (this.props.store.mode !== PLAY) {
        return
      }
      let direction = 'left';
      if(e.key==='w'){
          direction = "up";
      }
      else if(e.key==='s'){
          direction = "down";
      }
      else if(e.key==='a'){
          direction = "left";
      }
      else if(e.key==='d'){
          direction = "right";
      }
      this.props.store.updateDirection(0, 0, direction);
  }
  render() {
    const {gameOver} = this.state;
    return (
      <Fragment>
        <WinningScreen
          gameOver={gameOver}
          restartGame={this.restartGame}
          submitSolution={this.submitSolution}
        />
      </Fragment>
    )
  }
}

export default observer(Updater);