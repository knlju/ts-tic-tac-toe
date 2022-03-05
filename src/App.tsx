import React from 'react';
import Board from './components/Board';
import { useGameContext } from './contexts/GameContext';

function App() {

  const {dispatch, state} = useGameContext()

  return (
    <>
      <header>
        tic tac toe singleplayer
      </header>
      <div>
        <Board />
        <button onClick={() => dispatch({type: "UNDO"})}>
          undo
        </button>
        <button  onClick={() => dispatch({type: "RESTART"})}>
          reset
        </button>
      </div>
      <div>
        <h3>
          Result: {state.gameResult === "" ? "ongoing" : state.gameResult}
        </h3>
        <h3>
          playerToMove: {state.playerToMove}
        </h3>
      </div>
    </>
  );
}

export default App;
