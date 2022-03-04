import { Player, Board } from './../types/game';
import { Tile } from "../types/game"
import initialState, { GameState } from './initialState';
import getGameResult, { GameResult } from '../helpers/gameEnded';
import { findBestMove, getOppositePlayer } from '../helpers/engine';

type ACTIONTYPES = {
    type: "PLAY_MOVE",
    payload: {
        move: Move
    }
} | {
    type: "UNDO"
} | {
    type: "RESTART"
}

export type Action = ACTIONTYPES

export interface Move {
    tile: Tile, 
    player: Player
}

const gameReducer = (state: GameState, action: Action): GameState => {
    switch(action.type) {
        case "RESTART":
            return initialState
        case "UNDO":
            alert("UNDO")
            return state
        case "PLAY_MOVE":
            const {playerToMove, humanPlayer, board, gameEnded} = state
            if(gameEnded) {
                alert("Game already ended bruv")
                return state
            }
            const { player, tile } = action.payload.move
            if(tile.fill !== "") {
                return state
            }
            if(playerToMove === humanPlayer) {
                // const boardCopy = [...board]
                const newBoard: Board = board.map(currTile => {
                    if(currTile.coordinate === tile.coordinate) {
                        return {
                            coordinate: tile.coordinate,
                            fill: player
                        }
                    } else {
                        return {...currTile}
                    }
                })

                const gameResult = getGameResult(newBoard)
                let gameEndedResult: {
                    gameResult: "Draw" | "X won" | "O won" | "",
                    gameEnded: boolean
                } | null = null
                if(gameResult !== GameResult.NONE) {
                    console.log(gameResult)
                    const gameResultValue = gameResult === GameResult.DRAW ? 
                        "Draw" : GameResult.XWON ? "X won"
                        : "O won" 
                    gameEndedResult = {
                        gameResult: gameResultValue,
                        gameEnded: true
                    }
                }
                const oppositePlayer = getOppositePlayer(playerToMove)

                return {
                    ...state,
                    humanPlayer: oppositePlayer,
                    board: newBoard,
                    playerToMove: oppositePlayer,
                    ...gameEndedResult
                }
            } else {
                alert("not your move")
            }
            return state
        default:
            return state
    }
}

export default gameReducer
