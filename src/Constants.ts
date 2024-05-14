// Images
import whitepawn from "./assets/images/wp.png";
import blackpawn from "./assets/images/bp.png";

import whiterook from "./assets/images/wR.png";
import blackrook from "./assets/images/bR.png";

import whitebishop from "./assets/images/wB.png";
import blackbishop from "./assets/images/bB.png";

import whiteknight from "./assets/images/wN.png";
import blackknight from "./assets/images/bN.png";

import whitequeen from "./assets/images/wQ.png";
import blackqueen from "./assets/images/bQ.png";

import whiteking from "./assets/images/wK.png";
import blackking from "./assets/images/bK.png";

export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const GRID_SIZE = 100;

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
  x: number;
  y: number;
}

export enum TeamType {
  OPPONENT,
  OUR,
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  KING,
  QUEEN,
}
export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
  possibleMoves?: Position[];
}

export const initialBoardState: Piece[] = [];

// Inserting White Pawns
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: whitepawn,
    position: { x: i, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  });
}

// Inserting Black Pawns
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: blackpawn,
    position: { x: i, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  });
}
// Inserting Rooks
// white
initialBoardState.push({
  image: whiterook,
  position: { x: 7, y: 0 },

  type: PieceType.ROOK,
  team: TeamType.OUR,
});
initialBoardState.push({
  image: whiterook,
  position: { x: 0, y: 0 },
  type: PieceType.ROOK,
  team: TeamType.OUR,
});
// black
initialBoardState.push({
  image: blackrook,
  position: { x: 7, y: 7 },
  type: PieceType.ROOK,
  team: TeamType.OPPONENT,
});
initialBoardState.push({
  image: blackrook,
  position: { x: 0, y: 7 },
  type: PieceType.ROOK,
  team: TeamType.OPPONENT,
});

// Inserting Knights
// white
initialBoardState.push({
  image: whiteknight,
  position: { x: 6, y: 0 },
  type: PieceType.KNIGHT,
  team: TeamType.OUR,
});
initialBoardState.push({
  image: whiteknight,
  position: { x: 1, y: 0 },
  type: PieceType.KNIGHT,
  team: TeamType.OUR,
});
// black
initialBoardState.push({
  image: blackknight,
  position: { x: 6, y: 7 },
  type: PieceType.KNIGHT,
  team: TeamType.OPPONENT,
});
initialBoardState.push({
  image: blackknight,
  position: { x: 1, y: 7 },
  type: PieceType.KNIGHT,
  team: TeamType.OPPONENT,
});

// Inserting Bishops
// white
initialBoardState.push({
  image: whitebishop,
  position: { x: 5, y: 0 },
  type: PieceType.BISHOP,
  team: TeamType.OUR,
});
initialBoardState.push({
  image: whitebishop,
  position: { x: 2, y: 0 },
  type: PieceType.BISHOP,
  team: TeamType.OUR,
});
// black
initialBoardState.push({
  image: blackbishop,
  position: { x: 5, y: 7 },
  type: PieceType.BISHOP,
  team: TeamType.OPPONENT,
});
initialBoardState.push({
  image: blackbishop,
  position: { x: 2, y: 7 },
  type: PieceType.BISHOP,
  team: TeamType.OPPONENT,
});

// Inserting Kings
// white
initialBoardState.push({
  image: whiteking,
  position: { x: 4, y: 0 },
  type: PieceType.KING,
  team: TeamType.OUR,
});
// black
initialBoardState.push({
  image: blackking,
  position: { x: 4, y: 7 },
  type: PieceType.KING,
  team: TeamType.OPPONENT,
});

// Inserting Queens
// white
initialBoardState.push({
  image: whitequeen,
  position: { x: 3, y: 0 },
  type: PieceType.QUEEN,
  team: TeamType.OUR,
});
// black
initialBoardState.push({
  image: blackqueen,
  position: { x: 3, y: 7 },
  type: PieceType.QUEEN,
  team: TeamType.OPPONENT,
});
