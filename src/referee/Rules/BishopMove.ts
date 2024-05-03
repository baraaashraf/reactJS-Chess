import { Position, TeamType, Piece } from "../../Constants";
import { tileIsOccupiedByOpponent,tileIsOccupied } from "./GeneralRules";

export const bishopMove = (
  ps: Position,
  cs: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  //Up right movement
  for (let i = 1; i < 8; i++) {
    //Up right movement
    if (cs.x > ps.x && cs.y > ps.y) {
      let passedPosition: Position = { x: ps.x + i, y: ps.y + i };
      if (
        passedPosition.x === cs.x &&
        passedPosition.y === cs.y &&
        tileIsOccupiedByOpponent(cs, boardState, team)
      ) {
        console.log("enemy piece");
        return true;
      }
      if (tileIsOccupied(passedPosition, boardState)) {
        console.log("Illegal move");
        break;
      }
    }

    if (cs.x - ps.x === i && cs.y - ps.y === i) {
      return true;
    }
    //Bottom right movement
    if (cs.x > ps.x && cs.y < ps.y) {
      let passedPosition: Position = { x: ps.x + i, y: ps.y - i };
      if (
        passedPosition.x === cs.x &&
        passedPosition.y === cs.y &&
        tileIsOccupiedByOpponent(cs, boardState, team)
      ) {
        console.log("enemy piece");
        return true;
      }
      if (tileIsOccupied(passedPosition, boardState)) {
        console.log("Illegal move");
        break;
      }
    }

    if (cs.x - ps.x === i && cs.y - ps.y === -i) {
      return true;
    }

    //Bottom left movement
    if (cs.x < ps.x && cs.y < ps.y) {
      let passedPosition: Position = { x: ps.x - i, y: ps.y - i };
      if (
        passedPosition.x === cs.x &&
        passedPosition.y === cs.y &&
        tileIsOccupiedByOpponent(cs, boardState, team)
      ) {
        console.log("enemy piece");
        return true;
      }
      if (tileIsOccupied(passedPosition, boardState)) {
        console.log("Illegal move");
        break;
      }
    }

    if (cs.x - ps.x === -i && cs.y - ps.y === -i) {
      return true;
    }

    //Top left movement
    if (cs.x < ps.x && cs.y > ps.y) {
      let passedPosition: Position = { x: ps.x - i, y: ps.y + i };
      if (
        passedPosition.x === cs.x &&
        passedPosition.y === cs.y &&
        tileIsOccupiedByOpponent(cs, boardState, team)
      ) {
        console.log("enemy piece");
        return true;
      }
      if (tileIsOccupied(passedPosition, boardState)) {
        console.log("Illegal move");
        break;
      }
    }

    if (cs.x - ps.x === -i && cs.y - ps.y === i) {
      return true;
    }
  }
  return false;
};
