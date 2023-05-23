import { Link } from "react-router-dom"
import { useEffect } from "react"
import { SuperHero } from "../types"
import { fetchSuperHeroes } from "../api"
export type SuperheroListProps = {
    superheroes: Array<SuperHero>
}

export const SuperheroList: React.FC<SuperheroListProps> = (props) => {
    useEffect(() => {superHeroEffect()}, [])
    async function superHeroEffect() {
    const superheroes = await fetchSuperHeroes()
    }
    if (props?.superheroes?.length === 0) {
        return (
            <>
                <h1>You have no heroes created yet</h1>
                <Link to="/createhero">Add new hero</Link>
            </>
        )
    }
    return <></>
}
