import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { SuperHero } from '../types'
import { fetchSuperHeroes, url } from '../api'
import './components.css'
export type SuperheroListProps = {
    superheroes: Array<SuperHero>
}

export const SuperheroList: React.FC<SuperheroListProps> = (props) => {
    const superHeroElements = props.superheroes.map((e, index) => {
        return (
            <div className="hero" key={e.nickname + index}>
                <div className="nickname">
                    <h2>{e.nickname.toLocaleUpperCase()}</h2>
                </div>
                <div className="realname">
                    <p>Realname: </p>
                    <p>{e.real_name}</p>
                </div>
                <div className="description">
                    <p>Description: </p>
                    <p>{e.origin_description}</p>
                </div>
                <div className="phrase">
                    <p>Catch Phrase: </p>
                    <p>{e.catch_phrase}</p>
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
    return (
        <>
            <div className="allhero">{superHeroElements}</div>
            <Link className='newhero' to="/createhero">Add new hero</Link>
        </>
    )
}
