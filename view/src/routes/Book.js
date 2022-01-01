import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const Book = () => {
  let { flightID } = useParams();
  let navigate = useNavigate();
  const [flight, setFlight] = useState({});
  const [seatType, setSeatType] = useState("");
  const [seatCount, setSeatCount] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);

  const options = [
    { value: "economy", label: "Economy" },
    { value: "business", label: "Business" },
    { value: "firstclass", label: "First Class" },
  ];
  function handleSelect(selected) {
    const seatType = selected.value;
    setSeatType(selected);
    if (seatType == "economy") {
      setTicketPrice(flight.economyPrice);
    } else if (seatType == "business") {
      setTicketPrice(flight.businessPrice);
    } else if (seatType == "firstclass") {
      setTicketPrice(flight.firstclassPrice);
    }
  }

  async function bookTicket() {
    const bookResult = await axios.post(`/api/user/bookflight/${flightID}`, {
      flightType: seatType.value,
      seatCount,
    });
    window.alert(bookResult.data);
    navigate("/");
  }

  useEffect(() => {
    async function getFlightDetails() {
      const result = await axios.get(`/api/user/getflight/${flightID}`);
      const flight = result.data[0];
      console.log(flight);
      setFlight(flight);
    }
    getFlightDetails();
  }, []);
  return (
    <div className="container-mid">
      <div className="flight-container">
        <div>{flight.airlineName}</div>
        <div>
          From: {flight.source}, {flight.sourceAirport}
        </div>
        <div>
          To: {flight.destination}, {flight.destinationAirport}
        </div>
        <div>{new Date(flight.departureDateTime).toUTCString()}</div>
        {seatType.value == "business" && (
          <div>Business Price: {flight.businessPrice}</div>
        )}
        {seatType.value == "firstclass" && (
          <div>First Class Price: {flight.firstclassPrice}</div>
        )}
        {seatType.value == "economy" && (
          <div>Economy Price: {flight.economyPrice}</div>
        )}
      </div>
      <div>Select your seat type: </div>
      <Select onChange={handleSelect} options={options} value={seatType} />
      {seatType != "" && (
        <>
          <div className="info">How many seats?: </div>
          <input
            type="number"
            className="login__input"
            value={seatCount}
            onChange={(event) => {
              setSeatCount(event.target.value);
            }}
          />
        </>
      )}
      <div className="info">Your total price: </div>
      <div className="info">{seatCount * ticketPrice}</div>
      <button className="login__submit" onClick={bookTicket}>
        Book ticket
      </button>
    </div>
  );
};

export default Book;
