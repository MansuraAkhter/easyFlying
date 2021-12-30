import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateFlight = (props) => {
  const { allflights, setAllFlights } = props;
  const { flightID } = useParams();
  let flight = {};
  for (let i = 0; i < allflights.length; i++) {
    if (allflights[i].flightID == flightID) {
      flight = allflights[i];
    }
  }
  return <div>{flight.airlineName}</div>;
};

export default UpdateFlight;
