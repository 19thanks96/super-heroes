import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSuperHeroes } from '../api'
import { SuperHeroDTO, SuperHeroArray } from '../types'
import { SuperheroList } from './SuperheroList'

export const MainPage = () => {
    const [superheroes, setSuperheroes] = useState<SuperHeroArray>([])
    useEffect(() => {
        superHeroEffect()
    }, [])
    async function superHeroEffect() {
        setSuperheroes(await fetchSuperHeroes())
    }
    return (
        <>
            <SuperheroList superheroes={superheroes} />
        </>
    )
}
