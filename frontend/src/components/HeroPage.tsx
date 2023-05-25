import * as React from 'react'
import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { SuperHeroForm } from './SuperHeroForm'
import { deleteHero, fetchHero } from '../api'
import { SuperHero } from '../types'
import { useNavigate } from 'react-router-dom'
import { url } from '../api'
import { setDefaultResultOrder } from 'dns'

export const HeroPage = () => {
    const navigate = useNavigate()
    const [edit, setEdit] = useState<boolean>(false)
    let { _id } = useParams()
    const [hero, setHero] = useState<SuperHero>()
    useEffect(() => {
        setFetchedHero()
    }, [])
    async function setFetchedHero() {
        setHero(await fetchHero(_id))
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
    async function handleDeleteButtonClick() {
        await deleteHero(hero?._id)
        navigate('/')
    }
    if (edit) {
        return <SuperHeroForm superheroes={hero} />
    }

    return (
        <>
            {hero.nickname}
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
            <button onClick={editSuperHero} type="button">
                Edit
            </button>
            <button onClick={handleDeleteButtonClick} type="button">
                Delete
            </button>
        </>
    )
}
