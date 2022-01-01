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
import Book from "./routes/Book";
import AdminLayout from "./routes/AdminLayout";
import Tickets from "./routes/Tickets";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [allflights, setAllFlights] = useState([]);
  useEffect(async () => {
    const result = await axios.post("/api/user/checklogin");
    if (result.data.success) {
      setAuth(true);
    }
    const resultAdmin = await axios.post("/api/admin/checklogin");
    if (resultAdmin.data.success) {
      setAdminAuth(true);
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout auth={auth} />}>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/book/:flightID" element={<Book />} />
        <Route index element={<Home />} />
      </Route>

      <Route path="/admin" element={<AdminLayout adminAuth={adminAuth} />}>
        <Route
          path="login"
          element={<AdminLogin setAdminAuth={setAdminAuth} />}
        />
        <Route path="addflights" element={<Flight />} />
        <Route
          index
          path="allflights"
          element={
            <AllFlights allflights={allflights} setAllFlights={setAllFlights} />
          }
        />
        <Route
          call
          d
          path="updateflight/:flightID"
          element={
            <UpdateFlight
              allflights={allflights}
              setAllFlights={setAllFlights}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
