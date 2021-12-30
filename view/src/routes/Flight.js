import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
const Flight = () => {
  const [formData, setFormData] = useState({
    airlineName: "",
    source: "",
    sourceAirport: "",
    destination: "",
    destinationAirport: "",
    businessSeat: "",
    businessPrice: "",
    economySeat: "",
    economyPrice: "",
    firstclassSeat: "",
    firstclassPrice: "",
  });
  const [depatureDate, setDepatureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  async function addFlight(event) {
    event.preventDefault();
    console.log(formData);
    const departureDateTime =
      depatureDate.getFullYear() +
      "-" +
      depatureDate.getMonth() +
      "-" +
      depatureDate.getDay() +
      " " +
      departureTime +
      ":00";
    const arrivalDateTime =
      arrivalDate.getFullYear() +
      "-" +
      arrivalDate.getMonth() +
      "-" +
      arrivalDate.getDay() +
      " " +
      arrivalTime +
      ":00";
    console.log(arrivalDateTime);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        departureDateTime: departureDateTime,
        arrivalDateTime: arrivalDateTime,
      };
    });
    const results = await axios.post("/api/admin/addflights", formData);
    console.log(results.data);
  }

  return (
    <form>
      <label htmlFor="airlineName">Airline Name: </label>
      <input
        type="text"
        placeholder="Airline Name"
        onChange={handleChange}
        name="airlineName"
        value={formData.airlineName}
      />
      <br />
      <label htmlFor="source">Source: </label>
      <input
        type="text"
        placeholder="From"
        onChange={handleChange}
        name="source"
        value={formData.source}
      />
      <br />
      <label htmlFor="sourceAirport">Source Airport: </label>
      <input
        type="text"
        placeholder="Source Airport"
        onChange={handleChange}
        name="sourceAirport"
        value={formData.sourceAirport}
      />
      <br />
      <label htmlFor="destination">Destination: </label>
      <input
        type="text"
        placeholder="To"
        onChange={handleChange}
        name="destination"
        value={formData.destination}
      />
      <br />
      <label htmlFor="destinationAirport">Destination Airport: </label>
      <input
        type="text"
        placeholder="Destination Airport"
        onChange={handleChange}
        name="destinationAirport"
        value={formData.destinationAirport}
      />
      <br />
      <div>
        <label> Depature Date: </label>
        <DatePicker
          selected={depatureDate}
          onChange={(date) => setDepatureDate(date)}
        />
      </div>
      <br />
      <div>
        <label>Depature Time</label>
        <TimePicker
          onChange={(time) => setDepartureTime(time)}
          value={departureTime}
        />
      </div>
      <br />
      <div>
        <label>Arrival Date</label>
        <DatePicker
          selected={arrivalDate}
          onChange={(date) => setArrivalDate(date)}
        />
      </div>
      <br />
      <div>
        <label>Arrival Time</label>
        <TimePicker
          onChange={(time) => setArrivalTime(time)}
          value={arrivalTime}
        />
      </div>
      <br />
      <label htmlFor="businessSeat">Business Seat Count: </label>
      <input
        type="number"
        pattern="[0-9]{0-4}"
        placeholder="Business class seat count"
        onChange={handleChange}
        name="businessSeat"
        value={formData.businessSeat}
      />
      <br />
      <label htmlFor="businessPrice">Business Seat Price: </label>
      <input
        type="text"
        placeholder="Business class Price"
        onChange={handleChange}
        name="businessPrice"
        value={formData.businessPrice}
      />
      <br />
      <label htmlFor="economySeat">Economy Seat Count: </label>
      <input
        type="number"
        pattern="[0-9]{0-4}"
        placeholder="Economy class seat count"
        onChange={handleChange}
        name="economySeat"
        value={formData.economySeat}
      />
      <br />
      <label htmlFor="economyPrice">Economy seat price: </label>
      <input
        type="text"
        placeholder="Economy class Price"
        onChange={handleChange}
        name="economyPrice"
        value={formData.economyPrice}
      />
      <br />
      <label htmlFor="firstclassSeat">First class seat count: </label>
      <input
        type="number"
        pattern="[0-9]{0-4}"
        placeholder="First class seat count"
        onChange={handleChange}
        name="firstclassSeat"
        value={formData.firstclassSeat}
      />

      <br />
      <label htmlFor="firstclassPrice">First class seat price: </label>
      <input
        type="text"
        placeholder="First class Price"
        onChange={handleChange}
        name="firstclassPrice"
        value={formData.firstclassPrice}
      />
      <br />
      <button className="button" onClick={addFlight}>
        Add Flight
      </button>
    </form>
  );
};

export default Flight;
