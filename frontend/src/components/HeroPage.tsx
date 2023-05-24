import * as React from 'react'
import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { SuperHeroForm } from './CreateSuperHero'
import { fetchHero } from '../api'
import { SuperHero } from '../types'
import { url } from '../api'

export const HeroPage = () => {
    const [edit, setEdit] = useState<boolean>(false)
    let { nickname } = useParams()
    const [hero, setHero] = useState<SuperHero>()
    useEffect(() => {
        setFetchedHero()
    }, [])
    async function setFetchedHero() {
        setHero(await fetchHero(nickname))
    }
    if (!hero) {
        return <></>
    }
    const heroImages = hero.images.map((element) => {
        return <img src={url + '/' + element} />
    })
    function editSuperHero() {
        setEdit(true)
    }
    if(edit) {return <SuperHeroForm superheroes={hero}/>} 
    
    return (
        <>
            {nickname}
            <div className="realname">
                <p>Realname: </p>
                <p>{hero.real_name}</p>
            </div>
            <div className="description">
                <p>Description: </p>
                <p>{hero.origin_description}</p>
            </div>
            <div className="phrase">
                <p>Catch Phrase: </p>
                <p>{hero.catch_phrase}</p>
            </div>
            <div className="img">{heroImages}</div>
            <button onClick={editSuperHero} type='button'>Edit</button>
        </>
    )
}
