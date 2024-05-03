import { rookMove } from "./RookMoves";
import { bishopMove } from "./BishopMove";
import { Position, TeamType, Piece } from "../../Constants";

export const queenMove = (
  ps: Position,
  cs: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  return (
    bishopMove(ps, cs, team, boardState) || rookMove(ps, cs, team, boardState)
  );
};
