import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [firstDepatureDate, setFirstDepatureDate] = useState(null);
  const [secondDepatureDate, setSecondDepatureDate] = useState(null);
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
  });
  const [allFlights, setAllFlights] = useState([]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  async function searchFlight(event) {
    const firstDepartureDateTime =
      firstDepatureDate.getFullYear() +
      "-" +
      (firstDepatureDate.getMonth() + 1) +
      "-" +
      firstDepatureDate.getDate() +
      " 00:00:00";
    const secondDepartureDateTime =
      secondDepatureDate.getFullYear() +
      "-" +
      (secondDepatureDate.getMonth() + 1) +
      "-" +
      secondDepatureDate.getDate() +
      " 00:00:00";
    console.log(firstDepartureDateTime);
    console.log(secondDepartureDateTime);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        firstDepartureDateTime: firstDepartureDateTime,
        secondDepartureDateTime: secondDepartureDateTime,
      };
    });
    const results = await axios.post("/api/user/searchflights", formData);
    console.log(typeof results.data);
    setAllFlights(results.data);
    console.log(allFlights[0]);
  }

  return (
    <div>
      <label htmlFor="source">From: </label>
      <input
        type="text"
        name="source"
        placeholder="search.."
        value={formData.source}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="destination">To: </label>
      <input
        type="text"
        name="destination"
        placeholder="search.."
        value={formData.destination}
        onChange={handleChange}
      />
      <br />
      <div>
        <label> Depature Date between: </label>
        <DatePicker
          selected={firstDepatureDate}
          onChange={(date) => setFirstDepatureDate(date)}
        />
      </div>
      <br />
      <div>
        <DatePicker
          selected={secondDepatureDate}
          onChange={(date) => setSecondDepatureDate(date)}
        />
      </div>
      <br />
      <button className="button" onClick={searchFlight}>
        Search
      </button>

      {allFlights.length > 0 ? (
        <div>
          {allFlights.map((flight) => {
            console.log(flight);
            return (
              <>
                <div>{flight.airlineName}</div>
                <Link to={`/book/${flight.flightID}`}>Book</Link>
              </>
            );
          })}
        </div>
      ) : (
        "Click search to show flights"
      )}
    </div>
  );
}

export default Search;
