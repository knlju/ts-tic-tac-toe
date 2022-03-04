import React from 'react'
import { useGameContext } from '../contexts/GameContext'
import useCreateBoard, {initialBoard} from '../helpers/createBoard'

type Props = {}

const Board = (props: Props) => {

  const {state} = useGameContext() 

  return (
    <div>
        {useCreateBoard(state.board)}
    </div>
  )
}

export default Board