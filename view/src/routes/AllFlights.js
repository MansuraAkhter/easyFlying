import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllFlights = (props) => {
  const { allflights, setAllFlights } = props;
  const [refresh, setRefresh] = useState(true);

  useEffect(async () => {
    const results = await axios.get("/api/admin/getflights");
    setAllFlights(results.data);
  }, [refresh]);
  async function deleteFlight(flightID) {
    const results = await axios.post(`/api/admin/deleteflights/${flightID}`);
    setRefresh((prev) => !prev);
  }
  return (
    <div>
      {allflights.length > 0
        ? allflights.map((flight) => {
            return (
              <div key={flight.flightID}>
                <div>Airline Name: {flight.airlineName}</div>
                <div>From: {flight.source}</div>
                <div>Sorce Airport: {flight.sourceAirport}</div>
                <div>To: {flight.destination}</div>
                <div>Destination Airport: {flight.destinationAirport}</div>
                <div>
                  Departure Time:
                  {new Date(flight.departureDateTime).toUTCString()}
                </div>
                <div>
                  Arrival Time: {new Date(flight.arrivalDateTime).toUTCString()}
                </div>
                <div>Business seat count: {flight.businessSeat}</div>
                <div>Business seat price: {flight.businessPrice}</div>
                <div>Economy seat count:{flight.economySeat}</div>
                <div>Ecomnomy seat price: {flight.economyPrice}</div>
                <div>First class seat count: {flight.firstclassSeat}</div>
                <div>First class seat price: {flight.firstclassPrice}</div>
                <br></br>
                <Link to={`/admin/updateflight/${flight.flightID}`}>Edit</Link>
                <button onClick={() => deleteFlight(flight.flightID)}>
                  Delete{" "}
                </button>
              </div>
            );
          })
        : "nothing to show"}
    </div>
  );
};

export default AllFlights;
