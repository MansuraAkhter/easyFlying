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
    departureDate: "",
    arrivalDate: "",
    departureTime: "",
    arrivalTime: "",
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
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  return (
    <form>
      <input
        type="text"
        placeholder="Airline Name"
        onChange={handleChange}
        name="airlineName"
        value={formData.airlineName}
      />
      <br />

      <input
        type="text"
        placeholder="From"
        onChange={handleChange}
        name="source"
        value={formData.source}
      />
      <br />

      <input
        type="text"
        placeholder="Departure Airport"
        onChange={handleChange}
        name="departureAirport"
        value={formData.departureAirport}
      />
      <br />
      <input
        type="text"
        placeholder="To"
        onChange={handleChange}
        name="destination"
        value={formData.destination}
      />
      <br />
      <input
        type="text"
        placeholder="Destination Airport"
        onChange={handleChange}
        name="destinationAirport"
        value={formData.destinationAirport}
      />
      <br />
      <div>
        <DatePicker
          selected={depatureDate}
          onChange={(date) => setDepatureDate(date)}
        />
      </div>
      <br />
      <div>
        <TimePicker onChange={() => {}} />
      </div>
      <br />
      <div>
        <DatePicker
          selected={arrivalDate}
          onChange={(date) =>
            console.log(date.getDate(), date.getFullYear(), date.getMonth())
          }
        />
      </div>
      <br />
      <div>
        <TimePicker
          onChange={(date) => {
            console.log(date);
            // console.log(date.getHours(), date.getMinutes(), date.getSeconds());
          }}
        />
      </div>
      <br />
      <input
        type="number"
        pattern="[0-9]{0-4}"
        placeholder="Business class seat count"
        onChange={handleChange}
        name="businessSeat"
        value={formData.businessSeat}
      />
      <br />
      <input
        type="text"
        placeholder="Business class Price"
        onChange={handleChange}
        name="businessPrice"
        value={formData.businessPrice}
      />
      <br />

      <input
        type="number"
        pattern="[0-9]{0-4}"
        placeholder="Economy class seat count"
        onChange={handleChange}
        name="economySeat"
        value={formData.economySeat}
      />
      <br />
      <input
        type="text"
        placeholder="Economy class Price"
        onChange={handleChange}
        name="economyPrice"
        value={formData.economyPrice}
      />
      <br />
      <input
        type="number"
        pattern="[0-9]{0-4}"
        placeholder="First class seat count"
        onChange={handleChange}
        name="firstclassSeat"
        value={formData.firstclassSeat}
      />

      <br />
      <input
        type="text"
        placeholder="First class Price"
        onChange={handleChange}
        name="firstclassPrice"
        value={formData.firstclassPrice}
      />
      <br />

      <fieldset>
        <legend></legend>

        <input
          type="radio"
          id="unemployed"
          name="employment"
          value="unemployed"
          checked={formData.employment === "unemployed"}
          onChange={handleChange}
        />
        <label htmlFor="unemployed">Unemployed</label>
        <br />

        <input
          type="radio"
          id="part-time"
          name="employment"
          value="part-time"
          checked={formData.employment === "part-time"}
          onChange={handleChange}
        />
        <label htmlFor="part-time">Part-time</label>
        <br />

        <input
          type="radio"
          id="full-time"
          name="employment"
          value="full-time"
          checked={formData.employment === "full-time"}
          onChange={handleChange}
        />
        <label htmlFor="full-time">Full-time</label>
        <br />
      </fieldset>
    </form>
  );
};

export default Flight;
