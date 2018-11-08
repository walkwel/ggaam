import React from 'react';
import ReactDOM from 'react-dom';
import { Game } from './component';

const defaultPlayer1Data = {
  pyCode: '',
  jsCode: ''
}

function getURLParameters(paramName) {
  const sURL = window.document.URL.toString();
  if (sURL.indexOf("?") > 0) {
    const arrParams = sURL.split("?");
    const arrURLParams = arrParams[1].split("&");
    const arrParamNames = new Array(arrURLParams.length);
    const arrParamValues = new Array(arrURLParams.length);
    for (let i = 0; i < arrURLParams.length; i++) {
      const sParam = arrURLParams[i].split("=");
      arrParamNames[i] = sParam[0];
      if (sParam[1] !== "")
        arrParamValues[i] = unescape(sParam[1]);
      else
        arrParamValues[i] = "No Value";
    }
    for (let i = 0; i < arrURLParams.length; i++) {
      if (arrParamNames[i] === paramName) {
        //alert("Parameter:" + arrParamValues[i]);
        return arrParamValues[i].split('#').join('');
      }
    }
    return '';
  }
}

function App() {
  const gameData = {
    playMode: 'manual code',
    levelsToWin: Number(getURLParameters('level')) || 3,
    gameTime: Number(getURLParameters('gameTime')) || 200,
    botsQuantities: Number(getURLParameters('botsQuantities')) || 1,
    gameType: getURLParameters('gameType') || 'game',
    scoreToWin: Number(getURLParameters('scoreToWin')) || 20,
    tournamentScoreToWin: Number(getURLParameters('tournamentScoreToWin')) || 3,
    singleWindowGame: getURLParameters('singleWindowGame') === 'true'
  }
  const playAsPlayer2 = getURLParameters('playAsPlayer2') === 'true';

  return (
    <Game
      player1Data={defaultPlayer1Data}
      gameData={gameData}
      playAsPlayer2={playAsPlayer2}
      onCommit={() => { }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));