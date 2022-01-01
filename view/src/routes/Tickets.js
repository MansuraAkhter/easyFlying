import axios from "axios";
import React, { useState, useEffect } from "react";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function getTickets() {
      const results = await axios.get("/api/user/ticket");
      setTickets(results.data);
    }
    getTickets();
  }, []);
  return (
    <div>
      {tickets.length > 0 ? (
        <div>
          <div className="info">All tickets</div>
          {tickets.map((flight) => {
            console.log(flight);
            return (
              <div className="flight-container">
                <div>{flight.airlineName}</div>
                <div>
                  From: {flight.source}, {flight.sourceAirport}
                </div>
                <div>
                  To: {flight.destination}, {flight.destinationAirport}
                </div>
                <div>{new Date(flight.departureDateTime).toUTCString()}</div>
                <div>Total Price: {flight.totalPrice}</div>
              </div>
            );
          })}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Tickets;
