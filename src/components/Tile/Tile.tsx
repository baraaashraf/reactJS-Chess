import React from 'react'
import './Tile.css'

interface Props {
    number: number;
    image?: string;
}

const Tile = ({ number, image }: Props) => {
    return (
        <div className={`square  ${number % 2 === 1 ? "light-square" : "dark-square"}`}>
            <img className={'piece-img'} src={image} alt="" />
        </div>)
}

export default Tile