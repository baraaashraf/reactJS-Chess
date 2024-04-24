import {
  PieceType,
  TeamType,
  Piece,
} from "../components/Chessboard/Chessboard";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      console.log("Tile is occupied...");

      return true;
    }
    return false;
  }

  tileIsOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );
    if (piece) {
      return true;
    }
    return false;
  }

  isValidMove(
    px: number,
    py: number,
    cx: number,
    cy: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    console.log(`
        previous squares: ${px} - ${py}
        current squares:  ${cx} - ${cy}
        piece type:  ${type} ___ ${team}
    `);

    /// Move Logic
    if (type === PieceType.PAWN) {
      const startingRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      if (px === cx && py === startingRow && cy - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(cx, cy, boardState) &&
          !this.tileIsOccupied(cx, cy - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === cx && cy - py === pawnDirection) {
        if (!this.tileIsOccupied(cx, cy, boardState)) {
          return true;
        }
      }
      /// Capture Logic
      else if (cx - px === -1 && cy - py === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(cx, cy, boardState, team)) {
          console.log("left enem pieceeee...");
          return true;
        }
      } else if (cx - px === 1 && cy - py === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(cx, cy, boardState, team)) {
          console.log("right pieceeee...");
          return true;
        }
      }
    }

    return false;
  }
}
