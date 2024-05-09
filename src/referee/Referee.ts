import { PieceType, TeamType, Piece, Position } from "../Constants";
//RULES
import {
  pawnMove,
  knightMove,
  bishopMove,
  kingMove,
  queenMove,
  rookMove,
  GetPossiblePawnMoves,
} from "./Rules";

export default class Referee {
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
    /// Move Logic
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(ps, cs, team, boardState);
        console.log("PAWN");
        break;
      case PieceType.KNIGHT:
        validMove = knightMove(ps, cs, team, boardState);
        console.log("KNIGHT");
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(ps, cs, team, boardState);
        console.log("BISHOP");
        break;
      case PieceType.ROOK:
        validMove = rookMove(ps, cs, team, boardState);
        console.log("ROOK");
        break;
      case PieceType.QUEEN:
        validMove = queenMove(ps, cs, team, boardState);
        break;
      case PieceType.KING:
        validMove = kingMove(ps, cs, team, boardState);
    }

    return validMove;
  }

  getValidMode(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return GetPossiblePawnMoves(piece, boardState);
      case PieceType.BISHOP:
      case PieceType.KNIGHT:
      case PieceType.ROOK:
      case PieceType.KING:
      case PieceType.QUEEN:
      default:
        return [];
    }
  }
}
