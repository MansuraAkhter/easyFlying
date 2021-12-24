import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./routes/Layout";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import AdminLogin from "./routes/AdminLogin";

var mydata = {
  name: "mansura",
  age: 23,
};

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>, // React.createElement(Hello, {datafrominternet: {}, class: "name"}) // Hello({id: "myid", class: "name"})
  document.getElementById("root")
);
//  React.createElement(AnotherComponent, {children: ShowMyData}) // Hello({id: "myid", class: "name"})
function Hello(x) {
  return (
    <div>
      <AnotherComponent>
        <ShowMyData datafrominternet={mydata} />
      </AnotherComponent>
    </div>
  );
}

function AnotherComponent(props) {
  return <div>I am anothe</div>;
}

function ShowMyData(props) {
  var [name, setName] = React.useState("");
  const handleClick = () => {
    setName("ayon");
  };
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <div>{name}</div>
      <div>Age: {props.datafrominternet.age}</div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
