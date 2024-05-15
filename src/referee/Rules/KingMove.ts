import { Position, TeamType, Piece } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent,tileIsOccupied,tileIsOccupiedByOpponent } from "./GeneralRules";
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


export const getPossibleKingMoves = (king: Piece, boardstate: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  // Top movement
  for(let i = 1; i < 2; i++) {
    const destination: Position = {x: king.position.x, y: king.position.y + i};

    if(!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement
  for(let i = 1; i < 2; i++) {
    const destination: Position = {x: king.position.x, y: king.position.y - i};

    if(!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement
  for(let i = 1; i < 2; i++) {
    const destination: Position = {x: king.position.x - i, y: king.position.y};

    if(!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement
  for(let i = 1; i < 2; i++) {
    const destination: Position = {x: king.position.x + i, y: king.position.y};

    if(!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Upper right movement
  for(let i = 1; i < 2; i++) {
    const destination: Position = {x: king.position.x + i, y: king.position.y + i};

    if(!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom right movement
  for(let i = 1; i < 2; i++) {
    const destination: Position = {x: king.position.x + i, y: king.position.y - i};

    if(!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom left movement
  for(let i = 1; i < 2; i++) {
    const destination: Position = {x: king.position.x - i, y: king.position.y - i};

    if(!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Top left movement
  for(let i = 1; i < 2; i++) {
    const destination: Position = {x: king.position.x - i, y: king.position.y + i};

    if(!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(tileIsOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
}

