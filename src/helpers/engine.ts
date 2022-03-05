import {Move} from '../contexts/gameReducer';
import {Board, Player} from './../types/game';
import getGameResult, {GameResult} from './gameEnded';
import {StrikeLine} from "../contexts/initialState";

export function getOppositePlayer(player: Player) {
    return player === "o" ? "x" : "o"
}

export function getStrikeLine(board: Board): StrikeLine {

    if((board[0].fill === "x" && board[1].fill === "x" && board[2].fill === "x") || (board[0].fill === "o" && board[1].fill === "o" && board[2].fill === "o")) {
        return StrikeLine.V1
    }

    if((board[3].fill === "x" && board[4].fill === "x" && board[5].fill === "x") || (board[3].fill === "o" && board[4].fill === "o" && board[5].fill === "o")) {
        return StrikeLine.V2
    }

    if((board[6].fill === "x" && board[7].fill === "x" && board[8].fill === "x") || (board[6].fill === "o" && board[7].fill === "o" && board[8].fill === "o")) {
        return StrikeLine.V3
    }

    if((board[0].fill === "x" && board[3].fill === "x" && board[6].fill === "x") || (board[0].fill === "o" && board[3].fill === "o" && board[6].fill === "o")) {
        return StrikeLine.H1
    }

    if((board[1].fill === "x" && board[4].fill === "x" && board[7].fill === "x") || (board[1].fill === "o" && board[4].fill === "o" && board[7].fill === "o")) {
        return StrikeLine.H2
    }

    if((board[2].fill === "x" && board[5].fill === "x" && board[8].fill === "x") || (board[2].fill === "o" && board[5].fill === "o" && board[8].fill === "o")) {
        return StrikeLine.H3
    }

    if((board[0].fill === "x" && board[4].fill === "x" && board[8].fill === "x") || (board[0].fill === "o" && board[4].fill === "o" && board[8].fill === "o")) {
        return StrikeLine.D2
    }

    if((board[2].fill === "x" && board[4].fill === "x" && board[6].fill === "x") || (board[2].fill === "o" && board[4].fill === "o" && board[6].fill === "o")) {
        return StrikeLine.D1
    }

    return StrikeLine.NONE
}

/**
 * Should always return Move
 * if you get null something went wrong
 *
 * @param board
 * @param playerToMove
 */
export function findBestMove(board: Board, playerToMove: Player): Move {
    let bestMove: Move
    let bestMoveEval = playerToMove === "x" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
    for (const move of getMoves(board, playerToMove)) {
        const newBoard = makeMove(board, move)
        const oppositePlayer = getOppositePlayer(playerToMove)
        const currMoveEval = minimax(newBoard, oppositePlayer)
        if(playerToMove === "x") {
            if(bestMoveEval < currMoveEval) {
                bestMoveEval = currMoveEval
                bestMove = move
            }
        } else {
            if(bestMoveEval > currMoveEval) {
                bestMoveEval = currMoveEval
                bestMove = move
            }
        }
    }
    // TODO
    // @ts-ignore
    return bestMove
}

function makeMove(board: Board, move: Move) {
    return board.map(tile => {
        if(tile.coordinate === move.tile.coordinate) {
            return {
                ...tile,
                fill: move.player
            }
        }
        return tile
    })
}

function getMoves(board: Board, playerToMove: Player): Move[] {
    return board.filter(tile => tile.fill === '').map(
        tile => {
            return {
                player: playerToMove,
                tile: tile
            }
        }
    )
}

type GameEnding = 1 | 0 | -1

function minimax(board: Board, player: Player): GameEnding {
    const gameResult = getGameResult(board)
    if(getGameResult(board) !== GameResult.NONE) {
        if(gameResult === GameResult.OWON) return -1
        if(gameResult === GameResult.XWON) return 1
        return 0
    }

    if(player === 'x') {
        let bestVal: GameEnding = -1
        getMoves(board, player).forEach(move => {
            const value = minimax(makeMove(board, move), "o")!
            if(value > bestVal) bestVal = value
        })
        return bestVal
    }

    if(player === 'o') {
        let bestVal: GameEnding = 1
        getMoves(board, player).forEach(move => {
            const value = minimax(makeMove(board, move), "x")!
            if(value < bestVal) bestVal = value
        })
        return bestVal
    }

    // should never reach
    alert("error")
    return 0
}

const testBoard: Board = [
    {coordinate: 0, fill: "o"}, 
    {coordinate: 1, fill: ""}, 
    {coordinate: 2, fill: ""}, 
    {coordinate: 3, fill: ""}, 
    {coordinate: 4, fill: "o"}, 
    {coordinate: 5, fill: ""}, 
    {coordinate: 6, fill: ""}, 
    {coordinate: 7, fill: ""}, 
    {coordinate: 8, fill: ""}
]

export function testEngine(testBoard: Board, playerToMove: Player) {
    console.log("------------------------------")
    console.log("Testing the engine")
    const moveFound = findBestMove(testBoard, playerToMove)
    console.log("Move found:")
    console.log(moveFound)
    console.log("------------------------------")

    return moveFound
}