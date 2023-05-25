import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { SuperHero } from '../types'
import { fetchSuperHeroes, url } from '../api'
import './components.css'
import { useNavigate } from 'react-router-dom'
export type SuperheroListProps = {
    superheroes: Array<SuperHero>
}


export const SuperheroList: React.FC<SuperheroListProps> = (props) => {
    const navigate = useNavigate()
    function showHero(hero:SuperHero) {
        navigate("/hero/" + hero._id);
    }
    const superHeroElements = props.superheroes.map((hero, index) => {
        return (
            
            <div className="hero" key={hero.nickname + index} onClick={() => {
                showHero(hero)
            }}>
                <div className="nickname">
                    <h2>{hero.nickname.toLocaleUpperCase()}</h2>
                </div>
                
                <div className="img">
                    <img src={url + '/' + hero.images[0]} />
                </div>
            </div>
        )
    })
    if (props?.superheroes?.length === 0) {
        return (
            <>
                <h1>You have no heroes created yet</h1>
                <Link className='newhero' to="/createhero">Add new hero</Link>
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
