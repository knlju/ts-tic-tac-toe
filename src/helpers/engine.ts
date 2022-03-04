import { Move } from '../contexts/gameReducer';
import { Board, Player } from './../types/game';
import getGameResult, { GameResult } from './gameEnded';

export function getOppositePlayer(player: Player) {
    return player === "o" ? "x" : "o"
}

export function findBestMove(board: Board, playerToMove: Player): Move {
    let bestMove: Move = {
        player: "x",
        tile: {
            coordinate: -1,
            fill: ""
        }
    }
    let bestMoveEval = playerToMove === "x" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
    getMoves(board, playerToMove).forEach(move => {
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
    })
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