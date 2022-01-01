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
    console.log(depatureDate);
    const departureDateTime =
      depatureDate.getFullYear() +
      "-" +
      (depatureDate.getMonth() + 1) +
      "-" +
      depatureDate.getDate() +
      " " +
      departureTime +
      ":00";
    const arrivalDateTime =
      arrivalDate.getFullYear() +
      "-" +
      (arrivalDate.getMonth() + 1) +
      "-" +
      arrivalDate.getDate() +
      " " +
      arrivalTime +
      ":00";
    console.log(departureDateTime);
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
    <form className="container-mid">
      <div htmlFor="airlineName">Airline Name: </div>
      <input
        type="text"
        placeholder="Airline Name"
        className="login__input"
        onChange={handleChange}
        name="airlineName"
        value={formData.airlineName}
      />
      <br />
      <div htmlFor="source">Source: </div>
      <input
        type="text"
        placeholder="From"
        className="login__input"
        onChange={handleChange}
        name="source"
        value={formData.source}
      />
      <br />
      <div htmlFor="sourceAirport">Source Airport: </div>
      <input
        type="text"
        placeholder="Source Airport"
        className="login__input"
        onChange={handleChange}
        name="sourceAirport"
        value={formData.sourceAirport}
      />
      <br />
      <div htmlFor="destination">Destination: </div>
      <input
        type="text"
        placeholder="To"
        className="login__input"
        onChange={handleChange}
        name="destination"
        value={formData.destination}
      />
      <br />
      <div htmlFor="destinationAirport">Destination Airport: </div>
      <input
        type="text"
        placeholder="Destination Airport"
        className="login__input"
        onChange={handleChange}
        name="destinationAirport"
        value={formData.destinationAirport}
      />
      <br />
      <div>
        <div> Depature Date: </div>
        <DatePicker
          className="login__input"
          selected={depatureDate}
          onChange={(date) => setDepatureDate(date)}
        />
      </div>
      <br />
      <div>
        <div>Depature Time</div>
        <TimePicker
          className="login__input"
          onChange={(time) => setDepartureTime(time)}
          value={departureTime}
        />
      </div>
      <br />
      <div>
        <div>Arrival Date</div>
        <DatePicker
          className="login__input"
          selected={arrivalDate}
          onChange={(date) => setArrivalDate(date)}
        />
      </div>
      <br />
      <div>
        <div>Arrival Time</div>
        <TimePicker
          className="login__input"
          onChange={(time) => setArrivalTime(time)}
          value={arrivalTime}
        />
      </div>
      <br />
      <div htmlFor="businessSeat">Business Seat Count: </div>
      <input
        type="number"
        pattern="[0-9]{0-4}"
        className="login__input"
        placeholder="Business class seat count"
        onChange={handleChange}
        name="businessSeat"
        value={formData.businessSeat}
      />
      <br />
      <div htmlFor="businessPrice">Business Seat Price: </div>
      <input
        type="text"
        className="login__input"
        placeholder="Business class Price"
        onChange={handleChange}
        name="businessPrice"
        value={formData.businessPrice}
      />
      <br />
      <div htmlFor="economySeat">Economy Seat Count: </div>
      <input
        type="number"
        className="login__input"
        pattern="[0-9]{0-4}"
        placeholder="Economy class seat count"
        onChange={handleChange}
        name="economySeat"
        value={formData.economySeat}
      />
      <br />
      <div htmlFor="economyPrice">Economy seat price: </div>
      <input
        type="text"
        className="login__input"
        placeholder="Economy class Price"
        onChange={handleChange}
        name="economyPrice"
        value={formData.economyPrice}
      />
      <br />
      <div htmlFor="firstclassSeat">First class seat count: </div>
      <input
        type="number"
        className="login__input"
        pattern="[0-9]{0-4}"
        placeholder="First class seat count"
        onChange={handleChange}
        name="firstclassSeat"
        value={formData.firstclassSeat}
      />

      <br />
      <div htmlFor="firstclassPrice">First class seat price: </div>
      <input
        type="text"
        className="login__input"
        placeholder="First class Price"
        onChange={handleChange}
        name="firstclassPrice"
        value={formData.firstclassPrice}
      />
      <br />
      <button className="login__submit" onClick={addFlight}>
        Add Flight
      </button>
    </form>
  );
};

export default Flight;
