import React, {createContext, useContext, useEffect, useReducer, useState} from 'react'
import gameReducer, {Action} from './gameReducer'
import initialState, {GameState} from './initialState'
import {testEngine} from "../helpers/engine";

interface GameContextType {
  state: GameState,
  dispatch: React.Dispatch<Action>
}

const GameContext = createContext<any>(initialState)

export const useGameContext = () => useContext<GameContextType>(GameContext)

type Props = {
  children: JSX.Element
}

const GameProvider = (props: Props) => {

  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    if (state.playerToMove !== state.humanPlayer) {
      dispatch({type: 'PLAY_MOVE', payload: {move: testEngine(state.board, (state.playerToMove))}})
    }
  }, [state.playerToMove])

  const {children} = props

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider