import { useEffect, useState } from 'react'
import { fetchSuperHeroes } from '../api'
import {  SuperHeroArray } from '../types'
import { SuperheroList } from './SuperheroList'

export const MainPage = () => {
    const [superheroes, setSuperheroes] = useState<SuperHeroArray>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(0)
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1) 
    useEffect(() => {
        superHeroEffect()
    }, [currentPageNumber])
    async function superHeroEffect() {
        const response = await fetchSuperHeroes(currentPageNumber)
        setSuperheroes(response.heroes)
        setPageSize(response.pageSize)
        setTotalCount(response.totalCount)
    }
    const numPages = totalCount/ pageSize
    let pageButtons = []

    async function goToPage(pageNumber:number) {
        setCurrentPageNumber(pageNumber)
    }
    
    for (let i = 0; i < numPages; i++) {
        const pageNumber = i + 1
        const button = <button type='button' key={pageNumber} onClick={() => {goToPage(pageNumber)}}>{pageNumber}</button>
        pageButtons.push(button)
    }
    return (
        <>
            <SuperheroList superheroes={superheroes} />
            <div className='pageButtons'>{pageButtons}</div>
            <div className='count'>Total count: {Math.ceil(totalCount/pageSize)}</div>
        </>
    )
}
