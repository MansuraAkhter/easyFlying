import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const results = await axios.post(
      "/api/admin/login",
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
      window.alert("logged in successfully");
      props.setAdminAuth(true);
      navigate("/admin/allflights");
    }
  }
  return (
    <div className="container-mid">
      <input
        type="text"
        className="login__input"
        placeholder="Email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      <input
        type="password"
        className="login__input"
        placeholder="password"
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
