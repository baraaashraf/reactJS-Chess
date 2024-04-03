import './Chessboard.css'
import Tile from '../Tile/Tile'

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
            board.push(<Tile number={number} image={image} />)
        }
    }
    return (
        <div id='chessboard'>{board}</div>
    )
}

export default Chessboard