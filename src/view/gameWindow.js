import React from 'react';
import { Stage } from 'react-game-kit';
import Tile from './tile';
import Characters from './characters';



const GameWindow = (props) => (
    <div className="stage" style={{ width: '100%' }}>
        <Stage width={1100} height={480}>
            <Tile></Tile>
            <Characters store={props.store} gameId={0}></Characters>
        </Stage>
    </div>
);

export default GameWindow;