import { useState, useRef, useEffect } from 'react'
import Chessboard from '../Chessboard/Chessboard'
import { Piece, PieceType, Position, TeamType, initialBoardState, samePosition } from '../../Constants'
import { bishopMove, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves, kingMove, knightMove, pawnMove, queenMove, rookMove } from '../../referee/Rules'

import whiterook from "../../assets/images/wR.png";
import blackrook from "../../assets/images/bR.png";

import whitebishop from "../../assets/images/wB.png";
import blackbishop from "../../assets/images/bB.png";

import whiteknight from "../../assets/images/wN.png";
import blackknight from "../../assets/images/bN.png";

import whitequeen from "../../assets/images/wQ.png";
import blackqueen from "../../assets/images/bQ.png";






const Referee = () => {
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const [promotionPawn, setPromotionPawn] = useState<Piece>()
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        updatePossibleMoves()
    }, [])


    function updatePossibleMoves() {
        setPieces((currentPieces) => {
            return currentPieces.map(p => {
                p.possibleMoves = getValidMoves(p, currentPieces);
                return p;
            });
        })
    }

    function playMove(playedPiece: Piece, destination: Position): boolean {
        const validMove = isValidMove(
            playedPiece.position,
            destination,
            playedPiece.type,
            playedPiece.team,
        );

        const enPassantMove = isEnPassantMove(
            playedPiece.position,
            destination,
            playedPiece.type,
            playedPiece.team,
        );

        const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;

        if (enPassantMove) {
            const updatedPieces = pieces.reduce((results, piece) => {
                if (samePosition(piece.position, playedPiece.position)) {
                    piece.enPassant = false;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    results.push(piece);
                } else if (
                    !samePosition(piece.position, { x: destination.x, y: destination.y - pawnDirection })
                ) {
                    if (piece.type === PieceType.PAWN) {
                        piece.enPassant = false;
                    }
                    results.push(piece);
                }

                return results;
            }, [] as Piece[]);
            updatePossibleMoves();
            setPieces(updatedPieces);
        } else if (validMove) {
            //UPDATES THE PIECE POSITION
            //AND IF A PIECE IS ATTACKED, REMOVE IT
            const updatedPieces = pieces.reduce((results, piece) => {
                if (samePosition(piece.position, playedPiece.position)) {
                    //GOOGLE ENPASSANT
                    piece.enPassant =
                        Math.abs(playedPiece.position.y - destination.y) === 2 &&
                        piece.type === PieceType.PAWN;

                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0

                    if (destination.y === promotionRow && piece.type === PieceType.PAWN) {
                        modalRef.current?.classList.remove("hidden")
                        setPromotionPawn(piece)
                        console.log("promte le pawn")
                    }
                    results.push(piece);
                } else if (!samePosition(piece.position, { x: destination.x, y: destination.y })) {
                    if (piece.type === PieceType.PAWN) {
                        piece.enPassant = false;
                    }
                    results.push(piece);
                }

                return results;
            }, [] as Piece[]);
            updatePossibleMoves()
            setPieces(updatedPieces);
        } else {
            //RESETS THE PIECE POSITION
            return false
        }
        return true
    }

    function isEnPassantMove(
        ps: Position,
        cs: Position,
        type: PieceType,
        team: TeamType,
    ) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if (
                (cs.x - ps.x === -1 || cs.x - ps.x === 1) &&
                cs.y - ps.y === pawnDirection
            ) {
                const piece = pieces.find(
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



    function isValidMove(
        ps: Position,
        cs: Position,
        type: PieceType,
        team: TeamType,
    ) {
        /// Move Logic
        let validMove = false;
        switch (type) {
            case PieceType.PAWN:
                validMove = pawnMove(ps, cs, team, pieces);
                console.log("PAWN");
                break;
            case PieceType.KNIGHT:
                validMove = knightMove(ps, cs, team, pieces);
                console.log("KNIGHT");
                break;
            case PieceType.BISHOP:
                validMove = bishopMove(ps, cs, team, pieces);
                console.log("BISHOP");
                break;
            case PieceType.ROOK:
                validMove = rookMove(ps, cs, team, pieces);
                console.log("ROOK");
                break;
            case PieceType.QUEEN:
                validMove = queenMove(ps, cs, team, pieces);
                break;
            case PieceType.KING:
                validMove = kingMove(ps, cs, team, pieces);
        }

        return validMove;
    }

    function getValidMoves(piece: Piece, pieces: Piece[]): Position[] {
        switch (piece.type) {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, pieces);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, pieces);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, pieces);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, pieces);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, pieces);
            case PieceType.KING:
                return getPossibleKingMoves(piece, pieces);
            default:
                return [];
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

 

    return (
        <>
            <div id='pawn-promotion-modal' className='hidden' ref={modalRef}>
                <div className='modal-body'>
                    <img onClick={() => { promotePawn(PieceType.BISHOP) }} src={promotionPawn?.team === TeamType.OUR ? whitebishop : blackbishop} alt="White Bishop" />
                    <img onClick={() => { promotePawn(PieceType.KNIGHT) }} src={promotionPawn?.team === TeamType.OUR ? whiteknight : blackknight} alt="White Knight" />
                    <img onClick={() => { promotePawn(PieceType.QUEEN) }} src={promotionPawn?.team === TeamType.OUR ? whitequeen : blackqueen} alt="White Queen" />
                    <img onClick={() => { promotePawn(PieceType.ROOK) }} src={promotionPawn?.team === TeamType.OUR ? whiterook : blackrook} alt="White Rook" />
                </div>
            </div>

            <Chessboard
                playMove={playMove}
                pieces={pieces}
            />
        </>
    )
}

export default Referee