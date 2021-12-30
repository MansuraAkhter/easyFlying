import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

var mydata = {
  name: "mansura",
  age: 23,
};

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <BrowserRouter>
    <App />
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
