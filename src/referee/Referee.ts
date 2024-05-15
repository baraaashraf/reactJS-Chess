import { PieceType, TeamType, Piece, Position } from "../Constants";
//RULES
import {
  pawnMove,
  knightMove,
  bishopMove,
  kingMove,
  queenMove,
  rookMove,
  getPossiblePawnMoves,
  getPossibleBishopMoves,
  getPossibleKingMoves,
  getPossibleKnightMoves,
  getPossibleQueenMoves,
  getPossibleRookMoves,
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

  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMoves(piece, boardState);
      case PieceType.KNIGHT:
        return getPossibleKnightMoves(piece, boardState);
      case PieceType.BISHOP:
        return getPossibleBishopMoves(piece, boardState);
      case PieceType.ROOK:
        return getPossibleRookMoves(piece, boardState);
      case PieceType.QUEEN:
        return getPossibleQueenMoves(piece, boardState);
      case PieceType.KING:
        return getPossibleKingMoves(piece, boardState);
      default:
        return [];
    }
  }
}
