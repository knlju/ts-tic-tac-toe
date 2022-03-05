import { initialBoard } from './../helpers/createBoard';
import {Board, Player} from "../types/game"

export enum StrikeLine {
    H1, H2, H3, V1, V2, V3, D1, D2, NONE
}

export interface GameState {
    board: Board,
    humanPlayer: Player,
    playerToMove: Player,
    thinking: boolean,
    gameEnded: boolean,
    gameResult: "X won" | "O won" | "Draw" | "",
    strikeLine: StrikeLine
}

const initialState: GameState = {
    board: initialBoard,
    humanPlayer: "x",
    playerToMove: "x",
    thinking: false,
    gameEnded: false,
    gameResult: '',
    strikeLine: StrikeLine.NONE
}

export default initialState