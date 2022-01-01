import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = (props) => {
  let auth = props.auth;
  let navigate = useNavigate();
  return (
    <>
      <div className="navbar">
        <Link to="/" className="title">
          <div>Easy Flying</div>
          <svg
            width="24px"
            height="24px"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </Link>

        <div>
          {!auth && (
            <>
              <Link className="link" to="/login">
                Login
              </Link>
              <Link className="link" to="/register">
                Register
              </Link>
            </>
          )}
          <Link className="link" to="/tickets">
            My Tickets
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
