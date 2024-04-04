import './Chessboard.css'
import Tile from '../Tile/Tile'
import { useRef, useState } from 'react'

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



interface Piece {
    image: string
    x: number
    y: number
}

const pieces: Piece[] = []

// Inserting White Pawns
for (let i = 0; i < 8; i++) {
    pieces.push({ image: whitepawn, x: i, y: 1 })
}

// Inserting Black Pawns
for (let i = 0; i < 8; i++) {
    pieces.push({ image: blackpawn, x: i, y: 6 })
}

// Inserting Rooks
// white
pieces.push({ image: whiterook, x: 7, y: 0 })
pieces.push({ image: whiterook, x: 0, y: 0 })
// black
pieces.push({ image: blackrook, x: 7, y: 7 })
pieces.push({ image: blackrook, x: 0, y: 7 })

// Inserting Knights
// white
pieces.push({ image: whiteknight, x: 6, y: 0 })
pieces.push({ image: whiteknight, x: 1, y: 0 })
// black
pieces.push({ image: blackknight, x: 6, y: 7 })
pieces.push({ image: blackknight, x: 1, y: 7 })

// Inserting Bishops
// white
pieces.push({ image: whitebishop, x: 5, y: 0 })
pieces.push({ image: whitebishop, x: 2, y: 0 })
// black
pieces.push({ image: blackbishop, x: 5, y: 7 })
pieces.push({ image: blackbishop, x: 2, y: 7 })

// Inserting Kings
// white
pieces.push({ image: whiteking, x: 4, y: 0 })
// black
pieces.push({ image: blackking, x: 4, y: 7 })

// Inserting Queens
// white
pieces.push({ image: whitequeen, x: 3, y: 0 })
// black
pieces.push({ image: blackqueen, x: 3, y: 7 })



const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', "h"]
const verticalAxis = ['1', '2', '3', '4', '5', "6", '7', '8']



const Chessboard = () => {
    const chessboardRef = useRef<HTMLDivElement>(null);

    let activePiece: HTMLElement | null = null;

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement
        if (element.classList.contains('chess-piece')) {
            console.log(e.target)
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = 'absolute'
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            activePiece = element

        }

    }

    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 25
            const minY = chessboard.offsetTop - 25
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 75
            console.log(activePiece)
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = 'absolute'
    

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
        if (activePiece) {
            activePiece = null;
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