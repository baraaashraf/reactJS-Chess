import { Position, TeamType, Piece } from "../../Constants";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const pawnMove = (
  ps: Position,
  cs: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const startingRow = team === TeamType.OUR ? 1 : 6;
  const pawnDirection = team === TeamType.OUR ? 1 : -1;

  if (
    ps.x === cs.x &&
    ps.y === startingRow &&
    cs.y - ps.y === 2 * pawnDirection
  ) {
    if (
      !tileIsOccupied(cs, boardState) &&
      !tileIsOccupied({ x: cs.x, y: cs.y - pawnDirection }, boardState)
    ) {
      return true;
    }
  } else if (ps.x === cs.x && cs.y - ps.y === pawnDirection) {
    if (!tileIsOccupied(cs, boardState)) {
      return true;
    }
  }
  /// Capture Logic
  else if (cs.x - ps.x === -1 && cs.y - ps.y === pawnDirection) {
    if (tileIsOccupiedByOpponent(cs, boardState, team)) {
      console.log("left enem pieceeee...");
      return true;
    }
  } else if (cs.x - ps.x === 1 && cs.y - ps.y === pawnDirection) {
    if (tileIsOccupiedByOpponent(cs, boardState, team)) {
      console.log("right pieceeee...");
      return true;
    }
  }
  return false;
};

export const GetPossiblePawnMoves = (pawn: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  const specialRow = pawn.team === TeamType.OUR ? 1 : 6;
  const pawnDirection = pawn.team === TeamType.OUR ? 1 : -1;

  if (!tileIsOccupied(
    { x: pawn.position.x, y: pawn.position.y + pawnDirection },
    boardState)) {
    possibleMoves.push({ x: pawn.position.x, y: pawn.position.y + pawnDirection });

    if (pawn.position.y === specialRow &&
      !tileIsOccupied({ x: pawn.position.x, y: pawn.position.y + pawnDirection * 2 },
        boardState)) {
      possibleMoves.push({ x: pawn.position.x, y: pawn.position.y + pawnDirection * 2 })
    }
  }

  return possibleMoves;
}