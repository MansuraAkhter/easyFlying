import { Link, Outlet } from "react-router-dom";

const Layout = (props) => {
  let auth = props.auth;
  return (
    <div>
      Layout
      {!auth && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <Link to="/admin/login">AdminPannel</Link>
      <Outlet />
    </div>
  );
};

export default Layout;
