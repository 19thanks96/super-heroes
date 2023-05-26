import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { MainPage } from './components/MainPage'
import { HeroPage } from './components/HeroPage'
import { CreateHeroPage } from './components/CreateHeroPage'
import './components/components.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="createhero" element={<CreateHeroPage />} />
                    <Route path="hero/:_id" element={<HeroPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
