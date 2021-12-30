import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllFlights = (props) => {
  const { allflights, setAllFlights } = props;

  useEffect(async () => {
    const results = await axios.get("/api/admin/getflights");
    setAllFlights(results.data);
  }, []);
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
              </div>
            );
          })
        : "nothing to show"}
    </div>
  );
};

export default AllFlights;
