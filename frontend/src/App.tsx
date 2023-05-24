import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SuperheroList } from './components/SuperheroList'
import Layout from './components/Layout'
import { CreateSuperHero } from './components/CreateSuperHero'
import { fetchSuperHeroes } from './api'
import { SuperHero, SuperHeroArray } from './types'


function App() {
    const [superheroes, setSuperheroes] = useState<SuperHeroArray>([])
    useEffect(() => {
        superHeroEffect()
    }, [])
    async function superHeroEffect() {
        setSuperheroes(await fetchSuperHeroes())
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<SuperheroList superheroes={superheroes} />} />
                    <Route path="createhero" element={<CreateSuperHero />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
