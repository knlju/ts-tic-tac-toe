import {Board} from "../types/game"
import TileContainer from "../components/TileContainer";

const useCreateBoard = (board: Board): React.ReactElement => {

  return (
    <>
      {
        board.map((tile, index) => (<TileContainer key={index} tile={tile} />))
      }
    </>
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