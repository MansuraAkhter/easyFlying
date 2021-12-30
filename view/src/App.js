import Layout from "./routes/Layout";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import AdminLogin from "./routes/AdminLogin";
import Flight from "./routes/Flight";
import AllFlights from "./routes/AllFlights";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateFlight from "./routes/UpdateFlight";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [allflights, setAllFlights] = useState([]);
  useEffect(async () => {
    const result = await axios.post("/api/user/checklogin");
    if (result.data.success) {
      setAuth(true);
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout auth={auth} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/addflights" element={<Flight />} />
        <Route
          path="/admin/allflights"
          element={
            <AllFlights allflights={allflights} setAllFlights={setAllFlights} />
          }
        />
        <Route
          path="/admin/updateflight/:flightID"
          element={
            <UpdateFlight
              allflights={allflights}
              setAllFlights={setAllFlights}
            />
          }
        />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
