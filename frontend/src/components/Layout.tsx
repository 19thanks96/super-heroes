import { Outlet, Link } from 'react-router-dom'
import './components.css'

const Layout = () => {
    return (
        <>
            <Link className='herolist' to="/">SuperheroList</Link>
            <Outlet />
        </>
    )
}

export default Layout
