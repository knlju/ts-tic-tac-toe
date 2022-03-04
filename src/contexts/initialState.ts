import { initialBoard } from './../helpers/createBoard';
import {Board, Player} from "../types/game"

export interface GameState {
    board: Board,
    humanPlayer: Player,
    playerToMove: Player,
    thinking: boolean,
    gameEnded: boolean,
    gameResult: "X won" | "O won" | "Draw" | ""
}

const initialState: GameState = {
    board: initialBoard,
    humanPlayer: "x",
    playerToMove: "x",
    thinking: false,
    gameEnded: false,
    gameResult: ''
}

export default initialState