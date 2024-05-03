import './Chessboard.css'
import Tile from '../Tile/Tile'
import { useRef, useState } from 'react'
import Referee from '../../referee/Referee'
import {
  verticalAxis,
  horizontalAxis,
  Piece,
  PieceType,
  TeamType,
  initialBoardState,
  Position,
  GRID_SIZE,
  samePosition
} from '../../Constants'

import whiterook from "../../assets/images/wR.png";
import blackrook from "../../assets/images/bR.png";

import whitebishop from "../../assets/images/wB.png";
import blackbishop from "../../assets/images/bB.png";

import whiteknight from "../../assets/images/wN.png";
import blackknight from "../../assets/images/bN.png";


import whitequeen from "../../assets/images/wQ.png";
import blackqueen from "../../assets/images/bQ.png";

const Chessboard = () => {
  const chessboardRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
  const [promotionPawn, setPromotionPawn] = useState<Piece>()
  const modalRef = useRef<HTMLDivElement>(null);
  const [activePiece, setActivePiece] = useState<HTMLElement | any>(null)
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 })

  const referee = new Referee()

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement
    const chessboard = chessboardRef.current;
    if (element.classList.contains('chess-piece') && chessboard) {
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE)
      const gridY = Math.abs(Math.ceil(((e.clientY - chessboard.offsetTop) - 800) / GRID_SIZE))
      console.log(gridX, gridY)
      setGrabPosition({
        x: gridX,
        y: gridY,
      })
      // console.log(e.target)
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
      element.style.position = 'absolute'
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element)
    }

  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      //If x is smaller than minimum amount
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      }
      //If x is bigger than maximum amount
      else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      }
      //If x is in the constraints
      else {
        activePiece.style.left = `${x}px`;
      }

      //If y is smaller than minimum amount
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      }
      //If y is bigger than maximum amount
      else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      }
      //If y is in the constraints
      else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else if (validMove) {
          //UPDATES THE PIECE POSITION
          //AND IF A PIECE IS ATTACKED, REMOVE IT
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              //GOOGLE ENPASSANT
              piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 &&
                piece.type === PieceType.PAWN;

              piece.position.x = x;
              piece.position.y = y;
              let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0

              if (y === promotionRow && piece.type === PieceType.PAWN) {
                modalRef.current?.classList.remove("hidden")
                setPromotionPawn(piece)
                console.log("promte le pawn")
              }
              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else {
          //RESETS THE PIECE POSITION
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return
    }

    const updatedPieces = pieces.reduce((results, piece) => {
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = pieceType
        //set piece color
        const teamType = (piece.team === TeamType.OUR) ? "w" : "b"
        //set piece image
        switch (pieceType) {
          case PieceType.ROOK:
            piece.image = teamType === "w" ? whiterook : blackrook
            break;
          case PieceType.KNIGHT:
            piece.image = teamType === "w" ? whiteknight : blackknight
            break;
          case PieceType.QUEEN:
            piece.image = teamType === "w" ? whitequeen : blackqueen
            break;
          case PieceType.BISHOP:
            piece.image = teamType === "w" ? whitebishop : blackbishop
            break;


        }
      }
      results.push(piece)
      return results
    }, [] as Piece[])
    setPieces(updatedPieces)
    modalRef.current?.classList.add("hidden")
  }

  function promotionTeamType() {
    return (promotionPawn?.team === TeamType.OUR ? 'w' : "b")
  }

  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const piece: any = pieces.find(p => samePosition(p.position, { x: i, y: j }))
      let image = piece ? piece.image : undefined;
      let number = (i + j)
      board.push(<Tile key={`${j}-${i}`} number={number} image={image} />)
    }
  }
  return (
    <>

      {/* coloor for the promtoion piecs */}
      <div id='pawn-promotion-modal' className='hidden' ref={modalRef}>
        <div className='modal-body'>
          <img onClick={() => { promotePawn(PieceType.BISHOP) }} src={promotionPawn?.team === TeamType.OUR ? whitebishop : blackbishop} alt="White Bishop" />
          <img onClick={() => { promotePawn(PieceType.KNIGHT) }} src={promotionPawn?.team === TeamType.OUR ? whiteknight : blackknight} alt="White Knight" />
          <img onClick={() => { promotePawn(PieceType.QUEEN) }} src={promotionPawn?.team === TeamType.OUR ? whitequeen : blackqueen} alt="White Queen" />
          <img onClick={() => { promotePawn(PieceType.ROOK) }} src={promotionPawn?.team === TeamType.OUR ? whiterook : blackrook} alt="White Rook" />
        </div>
      </div>


      <div
        onMouseMove={(e) => { movePiece(e) }}
        onMouseDown={(e) => { grabPiece(e) }}
        onMouseUp={(e) => { dropPiece(e) }}
        id='chessboard'
        ref={chessboardRef}>
        {board}
      </div></>


  )
}

export default Chessboard;