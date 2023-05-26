import { useEffect, useState } from 'react'
import { fetchSuperHeroes } from '../api'
import {  SuperHeroArray } from '../types'
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
