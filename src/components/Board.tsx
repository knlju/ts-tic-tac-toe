import React from 'react'
import {useGameContext} from '../contexts/GameContext'
import useCreateBoard from '../helpers/createBoard'
import {getEndStrikeLike} from "../helpers/gameEnded";

type Props = {}

const Board = (props: Props) => {

  const {state} = useGameContext()

  const {strikeLine} = state

  return (
    <div>
      <div className="board">
        <div className={"line " + getEndStrikeLike(strikeLine)} />
       {useCreateBoard(state.board)}
      </div>
    </div>
  )
}

export default Board