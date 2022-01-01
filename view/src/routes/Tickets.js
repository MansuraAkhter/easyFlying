import axios from "axios";
import React, { useState, useEffect } from "react";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function getTickets() {
      const results = await axios.get("/api/user/ticket");
      console.log(results.data);
    }
  }, []);
  return <div>Tickets</div>;
};

export default Tickets;
