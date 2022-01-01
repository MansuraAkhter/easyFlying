import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("mansura1@gmail.com");
  const [password, setPassword] = useState("1234");
  const [confirmPass, setConfirmPass] = useState("1234");

  async function register() {
    if (password != confirmPass) {
      window.alert("password donot match");
      return;
    }
    const results = await axios.post("/api/user/register", {
      email: email,
      password: password,
      confirmPass: confirmPass,
    });
    if (results.data.success) {
      window.alert("Account created. Please login using your account!");
      navigate("/login");
    }
  }

  return (
    <div className="container-mid">
      <input
        type="text"
        value={email}
        placeholder="Email"
        className="login__input"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        className="login__input"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <input
        type="password"
        value={confirmPass}
        className="login__input"
        placeholder="Confirm Password"
        onChange={(event) => {
          setConfirmPass(event.target.value);
        }}
      />
      <button className="login__submit" onClick={register}>
        {" "}
        Register{" "}
      </button>
    </div>
  );
};

export default Register;
