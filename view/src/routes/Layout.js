import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
    return ( 
        <div>
            Layout
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Outlet/>
        </div>


     );
}
 
export default Layout;