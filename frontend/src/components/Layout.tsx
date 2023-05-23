import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Link to="/">SuperheroList</Link>
            <Outlet />
        </>
    )
}

export default Layout
