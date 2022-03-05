export interface Tile {
    coordinate: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    // coordinate: number,
    fill: "x" | "o" | ""
}

export type Player = "x" | "o"

export type Board = Tile[]