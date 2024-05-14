import React from 'react'
import './Tile.css'

interface Props {
    number: number;
    image?: string;
    highlight: boolean
}

const Tile = ({ number, image, highlight }: Props) => {
    const className: string = ["square", number % 2 === 0 && 'dark-square', number % 2 !== 0 && 'light-square', highlight && "tile-highlight"].filter(Boolean).join(" ")
    console.log('highlight', highlight)
    return (
        <div className={className}>
            {image && <div className={'chess-piece'} style={{ backgroundImage: `url(${image})` }}></div>}
        </div>
    )
}

export default Tile