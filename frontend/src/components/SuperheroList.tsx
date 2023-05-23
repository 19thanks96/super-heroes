export type SuperheroListProps = {
    superheroes : Array<SuperHero>;
}

export type SuperHero = {
    nickname : string;
    real_name: string;
    origin_description: string;
    catch_phrase: string;
}

export const SuperheroList: React.FC<SuperheroListProps> = (props) => {
    if(props?.superheroes?.length === 0) {
        return(
            <>
            <h1>You have no heroes created yet</h1>
            <button>Add new hero</button></>
        )
    }
    return (
        <>

        </>
    )
}
