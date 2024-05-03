import { Position, TeamType, Piece } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent,tileIsOccupied } from "./GeneralRules";

export const rookMove = (
    ps: Position,
    cs: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean => {
    if (ps.x === cs.x) {
      console.log("Moving vertically!");

      for (let i = 1; i < 8; i++) {
        let multiplier = cs.y < ps.y ? -1 : 1;

        let passedPosition: Position = { x: ps.x, y: ps.y + i * multiplier };
        if (passedPosition.x === cs.x && passedPosition.y === cs.y) {
          if (
           tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }

    if (ps.y === cs.y) {
      console.log("Moving horizontally!");

      for (let i = 1; i < 8; i++) {
        let multiplier = cs.x < ps.x ? -1 : 1;

        let passedPosition: Position = { x: ps.x + i * multiplier, y: ps.y };
        if (passedPosition.x === cs.x && passedPosition.y === cs.y) {
          if (
           tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }
