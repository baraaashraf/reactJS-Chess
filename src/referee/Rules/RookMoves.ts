import { Position, TeamType, Piece } from "../../Constants";
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent
} from "./GeneralRules";

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
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
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
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
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
};

export const getPossibleRookMoves = (
  rook: Piece,
  boardstate: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  // Top movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: rook.position.x,
      y: rook.position.y + i,
    };

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: rook.position.x,
      y: rook.position.y - i,
    };

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: rook.position.x - i,
      y: rook.position.y,
    };

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: rook.position.x + i,
      y: rook.position.y,
    };

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
