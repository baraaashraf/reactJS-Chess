import { Position, TeamType, Piece } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent,tileIsOccupied } from "./GeneralRules";
import { samePosition } from "../../Constants";


export const kingMove = (
  ps: Position,
  cs: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 2; i++) {
    //Diagonal
    let multiplierX = cs.x < ps.x ? -1 : cs.x > ps.x ? 1 : 0;
    let multiplierY = cs.y < ps.y ? -1 : cs.y > ps.y ? 1 : 0;

    let passedPosition: Position = {
      x: ps.x + i * multiplierX,
      y: ps.y + i * multiplierY,
    };

    if (samePosition(passedPosition, cs)) {
      if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
        return true;
      }
    } else {
      if (tileIsOccupied(passedPosition, boardState)) {
        break;
      }
    }
  }
  return false;
};
