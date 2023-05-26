import { Outlet, Link } from 'react-router-dom'


const Layout = () => {
    return (
        <>
            <Link className="herolist" to="/">
                SuperheroList
            </Link>
            <Outlet />
        </>
    )
}

export default Layout
