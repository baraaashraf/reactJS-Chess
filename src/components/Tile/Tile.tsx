import React from 'react'
import './Tile.css'

interface Props {
    number: number;
    image?: string;
}

const Tile = ({ number, image }: Props) => {
    return (
        <div className={`square  ${number % 2 === 1 ? "light-square" : "dark-square"}`}>
            {image && <div className={'chess-piece'} style={{ backgroundImage: `url(${image})` }}></div>}
        </div>
    )
}

export default Tile