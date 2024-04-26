import { PieceType, TeamType, Piece, Position } from "../Constants";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );
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
      (p) => p.position.x === x && p.position.y === y && p.team !== team
    );
    if (piece) {
      return true;
    }
    return false;
  }

  isEnPassantMove(
    ps: Position,
    cs: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    if (type === PieceType.PAWN) {
      if (
        (cs.x - ps.x === -1 || cs.x - ps.x === 1) &&
        cs.y - ps.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === cs.x &&
            p.position.y === cs.y - pawnDirection &&
            p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  isValidMove(
    ps: Position,
    cs: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    console.log(`
        previous squares: ${ps.x} - ${ps.y}
        current squares:  ${cs.x} - ${cs.y}
        piece type:  ${type} ___ ${team}
    `);

    /// Move Logic
    if (type === PieceType.PAWN) {
      const startingRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      if (
        ps.x === cs.x &&
        ps.y === startingRow &&
        cs.y - ps.y === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(cs.x, cs.y, boardState) &&
          !this.tileIsOccupied(cs.x, cs.y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (ps.x === cs.x && cs.y - ps.y === pawnDirection) {
        if (!this.tileIsOccupied(cs.x, cs.y, boardState)) {
          return true;
        }
      }
      /// Capture Logic
      else if (cs.x - ps.x === -1 && cs.y - ps.y === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(cs.x, cs.y, boardState, team)) {
          console.log("left enem pieceeee...");
          return true;
        }
      } else if (cs.x - ps.x === 1 && cs.y - ps.y === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(cs.x, cs.y, boardState, team)) {
          console.log("right pieceeee...");
          return true;
        }
      }
    } else if (type === PieceType.KNIGHT) {
      //TO THE TOP
      if(cs.y - ps.y === 2){
        if(cs.x - ps.x === -1){
          console.log("Top left knight move")
        }
        if(cs.x - ps.x === 1){
          console.log("Top right knight move")
        }
      }
      //TO THE RIGHT
      if(cs.x - ps.x === 2){
        if(cs.y - ps.y === 1){
          console.log("right top knight move")
        }
        if(cs.y - ps.y === -1){
          console.log("right bottom knight move")
        }
      }
      //TO THE BOTTOM
      if(cs.y - ps.y === -2){
        if(cs.x - ps.x === -1){
          console.log("Bottom left knight move")
        }
        if(cs.x - ps.x === 1){
          console.log("Bottom right knight move")
        }
      }
      //TO THE LEFT
      if(cs.x - ps.x === -2){
        if(cs.y - ps.y === 1){
          console.log("left top knight move")
        }
        if(cs.y - ps.y === -1){
          console.log("Left bottom knight move")
        }
      }
    }
    return false;
  }
}
