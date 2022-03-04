import React, { createContext, useContext, useReducer, useState } from 'react'
import gameReducer, {Action} from './gameReducer'
import initialState, {GameState} from './initialState'

interface GameContextType {
  state: GameState,
  dispatch: React.Dispatch<Action>
}

const GameContext = createContext<any>(initialState)

export const useGameContext = () => useContext<GameContextType>(GameContext)

type Props = {
  children: JSX.Element
}

const GameProvider = ({children}: Props) => {

  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider