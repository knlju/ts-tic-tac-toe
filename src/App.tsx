import React from 'react';
import Board from './components/Board';
import { useGameContext } from './contexts/GameContext';
import { testEngine } from './helpers/engine';

function App() {

  const {dispatch, state} = useGameContext()

  return (
    <div>
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
        <button onClick={() => dispatch({type: 'PLAY_MOVE', payload: {move: testEngine(state.board, state.playerToMove)}})}>
          <h1>
            Commence testing
          </h1>
        </button>
      </div>
      <div>
        <h1>
          Result: {state.gameResult === "" ? "ongoing" : state.gameResult}
        </h1>
        <h1>
          playerToMove: {state.playerToMove}
        </h1>
      </div>
    </div>
  );
}

export default App;
