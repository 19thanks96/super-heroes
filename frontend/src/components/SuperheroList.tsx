import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { SuperHero,   } from '../types'
import { fetchSuperHeroes, url} from '../api'
export type SuperheroListProps = {
    superheroes: Array<SuperHero>
}

export const SuperheroList: React.FC<SuperheroListProps> = (props) => {
    const superHeroElements = props.superheroes.map((e, index) => {
        return (
            <div className="hero" key={e.nickname + index}>
                <div className="nickname">
                    <h2>{e.nickname}</h2>
                </div>
                <div className="realname">
                    <p>Realname:</p>
                    {e.real_name}
                </div>
                <div className="description">
                    <p>Description</p>
                    {e.origin_description}
                </div>
                <div className="phrase">
                    <p>Catch Phrase</p>
                    {e.catch_phrase}
                </div>
                <div className="img">
                    <img src={url + '/' + e.images[0]} />
                </div>
            </div>
        )
    })
    if (props?.superheroes?.length === 0) {
        return (
            <>
                <h1>You have no heroes created yet</h1>
                <Link to="/createhero">Add new hero</Link>
            </>
        )
    }
    return <div>{superHeroElements}</div>
}
