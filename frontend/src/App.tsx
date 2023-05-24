import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SuperheroList } from './components/SuperheroList'
import Layout from './components/Layout'
import { CreateSuperHero } from './components/CreateSuperHero'
import { MainPage } from './components/MainPage'


function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={<MainPage />}
                    />
                    <Route path="createhero" element={<CreateSuperHero />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
