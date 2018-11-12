import { extendObservable } from 'mobx';
import config from './config';
import { NOT_STARTED} from './view/constants'

class passengerStore {
  constructor() {
    let position = [{}];
    for (var i = 0; i < config.maxBotsQuantityPerGame; i++) {
      position[0] = config.player1StartingPoint;
    }
    extendObservable(this, {
      time: config.time,
      prevTime: Date.now(),
      position: position,
      botsQuantity: config.botsQuantityPerGame,
      direction: 'up',
      passengers: [[], []],
      score: [0, 0],
      mode: NOT_STARTED,
      player1Func: undefined,
      player2Func: undefined,
      func: '',
      needToRestartGame: false,
      editorMode: config.editorMode,
      editorPyCode: '',
      currentLevel: 1,
      showGameSimulation: false,
      tournamentScoreBeaten: false,
      scale: 1
    });
  }
  updatePosition(gameId, playerId, newPosition, offset) {
    if (Math.abs(this.position[gameId].x - newPosition.x) >= offset || Math.abs(this.position[gameId].y - newPosition.y) >= offset) {
      this.position[gameId] = newPosition;
    }
  }
  resetGame() {
    this.updatePosition(0,0,{x:0,y:0}, 0);
    this.direction = [['right', 'down'], ['right', 'down']];
  }
  updateDirection(gameId, playerId, newDirection) {
    this.direction = newDirection;
    // var direction = 'right';
    // if (newDirection.right)
    //   direction = 'right';
    // else if (newDirection.left)
    //   direction = 'left';
    // else if (newDirection.up)
    //   direction = 'up';
    // else if (newDirection.down)
    //   direction = 'down';
    // if (this.direction[gameId][playerId] !== direction) {
    //   this.direction[gameId][playerId] = direction;
    // }
  }
  updateScore(gameId, score) {
    if (this.score[gameId] !== score) {

      this.score[gameId] = score;
    }
  }
}

export default new passengerStore();