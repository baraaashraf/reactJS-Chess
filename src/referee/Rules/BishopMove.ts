import { Position, TeamType, Piece } from "../../Constants";
import { tileIsOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

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

export const getPossibleBishopMoves = (
  bishop: Piece,
  boardstate: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  // Upper right movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x + i,
      y: bishop.position.y + i,
    };

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom right movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x + i,
      y: bishop.position.y - i,
    };

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom left movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x - i,
      y: bishop.position.y - i,
    };

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Top left movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x - i,
      y: bishop.position.y + i,
    };

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
