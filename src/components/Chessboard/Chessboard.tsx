import './Chessboard.css'
import Tile from '../Tile/Tile'
import { useRef, useState } from 'react'
import Referee from '../../referee/Referee'
// Images
import whitepawn from '../../assets/images/wp.png'
import blackpawn from '../../assets/images/bp.png'

import whiterook from '../../assets/images/wR.png'
import blackrook from '../../assets/images/bR.png'

import whitebishop from '../../assets/images/wB.png'
import blackbishop from '../../assets/images/bB.png'

import whiteknight from '../../assets/images/wN.png'
import blackknight from '../../assets/images/bN.png'

import whiteking from '../../assets/images/wK.png'
import blackking from '../../assets/images/bK.png'

import whitequeen from '../../assets/images/wQ.png'
import blackqueen from '../../assets/images/bQ.png'



export interface Piece {
    image: string
    x: number
    y: number
    type: PieceType
    team: TeamType
}

export enum TeamType {
    OPPONENT,
    OUR
}

export enum PieceType {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    KING,
    QUEEN
}

const pieces: Piece[] = []





const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', "h"]
const verticalAxis = ['1', '2', '3', '4', '5', "6", '7', '8']

const initialBoardState: Piece[] = []

// Inserting White Pawns
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: whitepawn, x: i, y: 1, type: PieceType.PAWN, team: TeamType.OUR })
}

// Inserting Black Pawns
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: blackpawn, x: i, y: 6, type: PieceType.PAWN, team: TeamType.OPPONENT })
}
// Inserting Rooks
// white
initialBoardState.push({ image: whiterook, x: 7, y: 0, type: PieceType.ROOK, team: TeamType.OUR })
initialBoardState.push({ image: whiterook, x: 0, y: 0, type: PieceType.ROOK, team: TeamType.OUR })
// black
initialBoardState.push({ image: blackrook, x: 7, y: 7, type: PieceType.ROOK, team: TeamType.OPPONENT })
initialBoardState.push({ image: blackrook, x: 0, y: 7, type: PieceType.ROOK, team: TeamType.OPPONENT })

// Inserting Knights
// white
initialBoardState.push({ image: whiteknight, x: 6, y: 0, type: PieceType.KNIGHT, team: TeamType.OUR })
initialBoardState.push({ image: whiteknight, x: 1, y: 0, type: PieceType.KNIGHT, team: TeamType.OUR })
// black
initialBoardState.push({ image: blackknight, x: 6, y: 7, type: PieceType.KNIGHT, team: TeamType.OPPONENT })
initialBoardState.push({ image: blackknight, x: 1, y: 7, type: PieceType.KNIGHT, team: TeamType.OPPONENT })

// Inserting Bishops
// white
initialBoardState.push({ image: whitebishop, x: 5, y: 0, type: PieceType.BISHOP, team: TeamType.OUR })
initialBoardState.push({ image: whitebishop, x: 2, y: 0, type: PieceType.BISHOP, team: TeamType.OUR })
// black
initialBoardState.push({ image: blackbishop, x: 5, y: 7, type: PieceType.BISHOP, team: TeamType.OPPONENT })
initialBoardState.push({ image: blackbishop, x: 2, y: 7, type: PieceType.BISHOP, team: TeamType.OPPONENT })

// Inserting Kings
// white
initialBoardState.push({ image: whiteking, x: 4, y: 0, type: PieceType.KING, team: TeamType.OUR })
// black
initialBoardState.push({ image: blackking, x: 4, y: 7, type: PieceType.KING, team: TeamType.OPPONENT })

// Inserting Queens
// white
initialBoardState.push({ image: whitequeen, x: 3, y: 0, type: PieceType.QUEEN, team: TeamType.OUR })
// black
initialBoardState.push({ image: blackqueen, x: 3, y: 7, type: PieceType.QUEEN, team: TeamType.OPPONENT })

const Chessboard = () => {
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const [activePiece, setActivePiece] = useState<HTMLElement | any>(null)
    const [gridX, setGridX] = useState(0)
    const [gridY, setGridY] = useState(0)

    const referee = new Referee()


    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement
        const chessboard = chessboardRef.current;
        if (element.classList.contains('chess-piece') && chessboard) {
            const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / 100)
            const gridY = Math.abs(Math.ceil(((e.clientY - chessboard.offsetTop) - 800) / 100))
            console.log(gridX, gridY)
            setGridX(gridX)
            setGridY(gridY)
            // console.log(e.target)
            const x = e.clientX - 50;
            const y = e.clientY - 50;
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
        const chessboard = chessboardRef.current
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100)
            const y = Math.abs(Math.ceil(((e.clientY - chessboard.offsetTop) - 800) / 100))
            console.log(x, y)

            //Updates the piece's position
            setPieces((value) => {
                const pieces = value.map(p => {
                    if (p.x === gridX && p.y === gridY) {
                        const validMove = referee.isValidMove(gridX, gridY, x, y, p.type, p.team, value);

                        if (validMove) {
                            p.x = x
                            p.y = y
                        } else {
                            //RESETS THE PIECE POSITION
                            activePiece.style.position = "relative";
                            activePiece.style.removeProperty("top");
                            activePiece.style.removeProperty("left");
                        }

                    }
                    return p;
                })
                return pieces
            })
            setActivePiece(null)
        }
    }

    let board = [];
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            let image = undefined
            pieces.forEach(piece => {
                if (piece.x === i && piece.y === j) {
                    image = piece.image
                }
            })

            let number = (i + j)
            board.push(<Tile key={`${j}-${i}`} number={number} image={image} />)
        }
    }
    return (
        <div
            onMouseMove={(e) => { movePiece(e) }}
            onMouseDown={(e) => { grabPiece(e) }}
            onMouseUp={(e) => { dropPiece(e) }}
            id='chessboard'
            ref={chessboardRef}>
            {board}
        </div>

    )
}

export default Chessboard;