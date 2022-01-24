import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  async function register() {
    if (password != confirmPass) {
      window.alert("passwords do not match");
      return;
    }
    const results = await axios.post("/api/user/register", {
      name: name,
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
        value={name}
        placeholder="Name"
        className="login__input"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
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
