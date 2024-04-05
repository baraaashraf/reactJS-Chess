import {
  PieceType,
  TeamType,
  Piece,
} from "../components/Chessboard/Chessboard";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);
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
    }

    return false;
  }
}
