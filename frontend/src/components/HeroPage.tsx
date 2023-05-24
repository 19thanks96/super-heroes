import * as React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, useParams,  } from 'react-router-dom';
import { fetchHero } from '../api';
import { SuperHero } from '../types';
import { url } from '../api';

export const HeroPage = () => {
    let { nickname } = useParams()
    const [hero, setHero] = useState<SuperHero>()
    useEffect(() => {
        setFetchedHero()
    }, [])
    async function setFetchedHero() {
    setHero(await fetchHero(nickname))
    }
    if(!hero) {
        return (<></>)
    }
    const heroImages = hero.images.map((element) => {
        return <img src={url + '/' + element} />
    })
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
                <div className="img">
                    {heroImages}
                </div>
        </>
    )
}