import { Link } from "react-router-dom"
import { SuperHero } from "../types"
export type SuperheroListProps = {
    superheroes: Array<SuperHero>
}

export const SuperheroList: React.FC<SuperheroListProps> = (props) => {
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
