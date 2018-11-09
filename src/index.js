import React from 'react';
import ReactDOM from 'react-dom';
import { Game } from './component';

const defaultPlayer1Data = {
  pyCode: '',
  jsCode: ''
}


const App = () => {
  const props = {
    playMode: 'manual code',
    levelsToWin: 3,
    gameTime:  200,
    botsQuantities: 1,
    gameType: 'game', //gameTournament
    scoreToWin: 20,
    tournamentScoreToWin:  3,
    singleWindowGame: true
  }

  return (
    <Game
      player1Data={defaultPlayer1Data}
      gameData={props}
      playAsPlayer2={false}
      onCommit={() => { }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));