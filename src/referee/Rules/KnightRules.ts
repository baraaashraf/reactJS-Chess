import { Position, TeamType, Piece } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const knightMove = (
  ps: Position,
  cs: Position,
  team: TeamType,
  boardState: Piece[]
) => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      //TOP and BOTTOM
      if (cs.y - ps.y === 2 * i) {
        if (cs.x - ps.x === j) {
          if (tileIsEmptyOrOccupiedByOpponent(cs, boardState, team)) {
            return true;
          }
        }
      }
      // RIGHT AND LEFT
      if (cs.x - ps.x === 2 * i) {
        if (cs.y - ps.y === j) {
          if (tileIsEmptyOrOccupiedByOpponent(cs, boardState, team)) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export const getPossibleKnightMoves = (
  knight: Piece,
  boardstate: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove: Position = {
        x: knight.position.x + j,
        y: knight.position.y + i * 2,
      };
      const horizontalMove: Position = {
        x: knight.position.x + i * 2,
        y: +knight.position.y + j,
      };

      if (
        tileIsEmptyOrOccupiedByOpponent(verticalMove, boardstate, knight.team)
      ) {
        possibleMoves.push(verticalMove);
      }

      if (
        tileIsEmptyOrOccupiedByOpponent(horizontalMove, boardstate, knight.team)
      ) {
        possibleMoves.push(horizontalMove);
      }
    }
  }
  return possibleMoves;
};
