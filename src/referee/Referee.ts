import {
  PieceType,
  TeamType,
  Piece,
  Position,
  samePosition,
} from "../Constants";

export default class Referee {
  tileIsEmptyOrOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ) {
    return (
      !this.tileIsOccupied(position, boardState) ||
      this.tileIsOccupiedByOpponent(position, boardState, team)
    );
  }

  tileIsOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position));

    if (piece) {
      console.log("occupied tile")
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
    );

    if (piece) {
      console.log("occupied by opp")

      return true;
    } else {
      return false;
    }
  }

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
    console.log(`
        previous squares: ${ps.x} - ${ps.y}
        current squares:  ${cs.x} - ${cs.y}
        piece type:  ${type} ___ ${team}
    `);

    /// Move Logic
    if (type === PieceType.PAWN) {
      const startingRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      if (
        ps.x === cs.x &&
        ps.y === startingRow &&
        cs.y - ps.y === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(cs, boardState) &&
          !this.tileIsOccupied({ x: cs.x, y: cs.y - pawnDirection }, boardState)
        ) {
          return true;
        }
      } else if (ps.x === cs.x && cs.y - ps.y === pawnDirection) {
        if (!this.tileIsOccupied(cs, boardState)) {
          return true;
        }
      }
      /// Capture Logic
      else if (cs.x - ps.x === -1 && cs.y - ps.y === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(cs, boardState, team)) {
          console.log("left enem pieceeee...");
          return true;
        }
      } else if (cs.x - ps.x === 1 && cs.y - ps.y === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(cs, boardState, team)) {
          console.log("right pieceeee...");
          return true;
        }
      }
    } else if (type === PieceType.KNIGHT) {
      for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
          //TOP and BOTTOM
          if (cs.y - ps.y === 2 * i) {
            if (cs.x - ps.x === j) {
              if (this.tileIsEmptyOrOccupiedByOpponent(cs, boardState, team)) {
                return true;
              }
            }
          }
          // RIGHT AND LEFT
          if (cs.x - ps.x === 2 * i) {
            if (cs.y - ps.y === j) {
              if (this.tileIsEmptyOrOccupiedByOpponent(cs, boardState, team)) {
                return true;
              }
            }
          }
        }
      }
    } else if(type === PieceType.BISHOP){

      //Up right movement
      for(let i = 1; i < 8; i++)
      {
        //Up right movement
        if(cs.x > ps.x && cs.y > ps.y) {
          let passedPosition: Position = {x: ps.x + i, y: ps.y + i};
          if((passedPosition.x === cs.x && passedPosition.y === cs.y)&&this.tileIsOccupiedByOpponent(cs,boardState,team)){
              console.log('enemy piece')
              return true;
          }
          if(this.tileIsOccupied(passedPosition, boardState)) {
            console.log("Illegal move");
            break;
          }
        }

        if(cs.x - ps.x === i && cs.y - ps.y === i) {
          return true;
        }
        //Bottom right movement
        if(cs.x > ps.x && cs.y < ps.y) {
          let passedPosition: Position = {x: ps.x + i, y: ps.y - i};
          if((passedPosition.x === cs.x && passedPosition.y === cs.y)&&this.tileIsOccupiedByOpponent(cs,boardState,team)){
            console.log('enemy piece')
            return true;
        }
          if(this.tileIsOccupied(passedPosition, boardState)) {
            console.log("Illegal move");
            break;
          }
        }

        if(cs.x - ps.x === i && cs.y - ps.y === -i) {
          return true;
        }

        //Bottom left movement
        if(cs.x < ps.x && cs.y < ps.y) {
          let passedPosition: Position = {x: ps.x - i, y: ps.y - i};
          if((passedPosition.x === cs.x && passedPosition.y === cs.y)&&this.tileIsOccupiedByOpponent(cs,boardState,team)){
            console.log('enemy piece')
            return true;
        }
          if(this.tileIsOccupied(passedPosition, boardState)) {
            console.log("Illegal move");
            break;
          }
        }

        if(cs.x - ps.x === -i && cs.y - ps.y === -i) {
          return true;
        }

        //Top left movement
        if(cs.x < ps.x && cs.y > ps.y) {
          let passedPosition: Position = {x: ps.x - i, y: ps.y+i};
          if((passedPosition.x === cs.x && passedPosition.y === cs.y)&&this.tileIsOccupiedByOpponent(cs,boardState,team)){
            console.log('enemy piece')
            return true;
        }
          if(this.tileIsOccupied(passedPosition, boardState)) {
            console.log("Illegal move");
            break;
          }
        }

        if(cs.x - ps.x === -i && cs.y - ps.y === i) {
          return true;
        }
      }
    }
    else if(type === PieceType.ROOK){
      if(ps.x === cs.x) {
        console.log("Moving vertically!");

        for(let i = 1; i < 8; i++) {
          let multiplier = (cs.y < ps.y) ? -1 : 1;

          let passedPosition: Position = {x: ps.x, y: ps.y + (i * multiplier)}; 
          if(passedPosition.x === cs.x && passedPosition.y === cs.y) {
            console.log("Arrived!");
            break;
          }
        }
      }

      if(ps.y === cs.y) {
        console.log("Moving horizontally!");

        for(let i = 1; i < 8; i++) {
          let multiplier = (cs.x < ps.x) ? -1 : 1;

          let passedPosition: Position = {x: ps.x + (i * multiplier), y: ps.y};
          if(passedPosition.x === cs.x && passedPosition.y === cs.y) {
            console.log("Arrived!");
            break;
          }
        }
      }
    }

    return false;
  }
}
