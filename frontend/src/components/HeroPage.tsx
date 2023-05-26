import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SuperHeroForm } from './SuperHeroForm'
import { deleteHero, fetchHero } from '../api'
import { SuperHero } from '../types'
import { useNavigate } from 'react-router-dom'
import { url } from '../api'

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
    const heroImages = hero.images.map((imglink) => {
        return <img key={imglink} src={url + '/' + imglink} />
    })
    function editSuperHero() {
        setEdit(true)
    }
    async function handleDeleteButtonClick() {
        await deleteHero(hero?._id)
        navigate('/')
    }
    if (edit) {
        return <SuperHeroForm hero={hero} />
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
            <div className="superpowers">
                <p>Superpowers: </p>
                <p>{hero.superpowers}</p>
            </div>
            <div className="img">{heroImages}</div>
            <button onClick={editSuperHero} type="button" className="edit">
                Edit
            </button>
            <button
                onClick={handleDeleteButtonClick}
                type="button"
                className="delete"
            >
                Delete
            </button>
        </>
    )
}
