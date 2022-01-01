import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    const results = await axios.post(
      "/api/user/login",
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    console.log(results.data);
    if (results.data.success) {
      props.setAuth(true);
      navigate("/");
    }
  }
  return (
    <div className="container-mid">
      <input
        className="login__input"
        type="text"
        value={email}
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      <input
        type="password"
        className="login__input"
        placeholder="Password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button className="login__submit" onClick={login}>
        {" "}
        Login
      </button>
    </div>
  );
}

export default Login;
