import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
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
      navigate("/");
    }
  }
  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button className="button" onClick={login}>
        {" "}
        Login
      </button>
    </div>
  );
}

export default Login;
