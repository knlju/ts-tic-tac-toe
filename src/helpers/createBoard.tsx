import { useGameContext } from "../contexts/GameContext"
import {Board} from "../types/game"

const useCreateBoard = (board: Board): React.ReactElement => {
    
    const {dispatch, state} = useGameContext()
    
    return (
        <div className="board">
            {
                board.map((tile, index) => (
                    <div 
                        key={index} 
                        className="tile"
                        onClick={() => dispatch({
                            type: "PLAY_MOVE",
                            payload: {
                                move: {
                                    player: state.humanPlayer,
                                    tile: tile
                                }
                            }
                        })}
                    >
                        {tile.fill}
                    </div>
                ))
            }
        </div>
    )
}

export const initialBoard: Board = [
    {coordinate: 0, fill: ""}, 
    {coordinate: 1, fill: ""}, 
    {coordinate: 2, fill: ""}, 
    {coordinate: 3, fill: ""}, 
    {coordinate: 4, fill: ""}, 
    {coordinate: 5, fill: ""}, 
    {coordinate: 6, fill: ""}, 
    {coordinate: 7, fill: ""}, 
    {coordinate: 8, fill: ""}
]

export default useCreateBoard