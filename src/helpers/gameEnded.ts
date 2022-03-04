import { Board } from './../types/game';

export enum GameResult {
    OWON,
    DRAW,
    XWON,
    NONE
}

const getGameResult  = (board: Board) => {
    if(board[0].fill === "x" && board[1].fill === "x" && board[2].fill === "x") {
        return GameResult.XWON
    }
    if(board[3].fill === "x" && board[4].fill === "x" && board[5].fill === "x") {
        return GameResult.XWON
    }
    if(board[6].fill === "x" && board[7].fill === "x" && board[8].fill === "x") {
        return GameResult.XWON
    }
    if(board[0].fill === "x" && board[3].fill === "x" && board[6].fill === "x") {
        return GameResult.XWON
    }
    if(board[1].fill === "x" && board[4].fill === "x" && board[7].fill === "x") {
        return GameResult.XWON
    }
    if(board[2].fill === "x" && board[5].fill === "x" && board[8].fill === "x") {
        return GameResult.XWON
    }
    if(board[0].fill === "x" && board[4].fill === "x" && board[8].fill === "x") {
        return GameResult.XWON
    }
    if(board[2].fill === "x" && board[4].fill === "x" && board[6].fill === "x") {
        return GameResult.XWON
    }
    


    if(board[0].fill === "o" && board[1].fill === "o" && board[2].fill === "o") {
        return GameResult.OWON
    }
    if(board[3].fill === "o" && board[4].fill === "o" && board[5].fill === "o") {
        return GameResult.OWON
    }
    if(board[6].fill === "o" && board[7].fill === "o" && board[8].fill === "o") {
        return GameResult.OWON
    }
    if(board[0].fill === "o" && board[3].fill === "o" && board[6].fill === "o") {
        return GameResult.OWON
    }
    if(board[1].fill === "o" && board[4].fill === "o" && board[7].fill === "o") {
        return GameResult.OWON
    }
    if(board[2].fill === "o" && board[5].fill === "o" && board[8].fill === "o") {
        return GameResult.OWON
    }
    if(board[0].fill === "o" && board[4].fill === "o" && board[8].fill === "o") {
        return GameResult.OWON
    }
    if(board[2].fill === "o" && board[4].fill === "o" && board[6].fill === "o") {
        return GameResult.OWON
    }

    if(board.find(tile => tile.fill === "")) {
        return GameResult.NONE
    }

    return GameResult.DRAW
}

export default getGameResult