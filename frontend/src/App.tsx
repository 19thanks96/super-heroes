import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SuperheroList } from './components/SuperheroList'
import Layout from './components/Layout'
import { SuperHeroForm } from './components/CreateSuperHero'
import { MainPage } from './components/MainPage'
import { HeroPage } from './components/HeroPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="createhero" element={<SuperHeroForm />} />
                    <Route path="hero/:nickname" element={<HeroPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
