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

const Chessboard = () => {
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
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

        const chessboard = chessboardRef.current
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE)
            const y = Math.abs(Math.ceil(((e.clientY - chessboard.offsetTop) - 800) / GRID_SIZE))
            console.log(x, y)
            const currentPiece = pieces.find(p => samePosition(p.position, grabPosition))
            if (currentPiece) {
                const validMove = referee.isValidMove(
                    grabPosition,
                    {
                        x,
                        y,
                    },
                    currentPiece.type,
                    currentPiece.team,
                    pieces)


                const isEnpassantMove = referee.isEnPassantMove(
                    grabPosition,
                    {
                        x,
                        y
                    },
                    currentPiece.type,
                    currentPiece.team,
                    pieces)

                const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

                if (isEnpassantMove) {
                    const updatesPieces = pieces.reduce((results, piece) => {
                        if (
                            samePosition(piece.position, grabPosition)

                        ) {
                            piece.enPassant = false;
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece)
                        } else if (
                            !(
                                samePosition(piece.position, { x, y: y - pawnDirection })
                            )
                        ) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece)
                        }
                        return results;
                    }, [] as Piece[])

                    setPieces(updatesPieces)

                } else if (validMove) {
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if (
                            samePosition(piece.position, grabPosition)
                        ) {
                            //Special Movee
                            piece.enPassant = Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN
                            piece.position.x = x
                            piece.position.y = y
                            results.push(piece)
                        } else if (!(samePosition(piece.position, grabPosition))) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece)
                        }

                        return results
                    }, [] as Piece[])

                    setPieces(updatedPieces)
                } else {
                    activePiece.style.position = 'relative'
                    activePiece.style.removeProperty('left')
                    activePiece.style.removeProperty('top')
                }
            }
            setActivePiece(null)
        }
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