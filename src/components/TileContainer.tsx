import React from "react"
import {Tile} from "../types/game"
import {useGameContext} from "../contexts/GameContext";

type Props = {
  tile: Tile
}

function TileContainer({tile}: Props) {

  const {dispatch, state} = useGameContext()

  return (
    <div
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
  )
}

export default TileContainer