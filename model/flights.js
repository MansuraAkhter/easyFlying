const db = require("../db");

module.exports.createFlight = async (body) => {
  const [results, feilds] = await db.query("INSERT INTO flight set ?", {
    airlineName: body.airlineName,
    source: body.source,
    sourceAirport: body.sourceAirport,
    destinationAirport: body.destinationAirport,
    destination: body.destination,
    departureDateTime: new Date(body.departureDateTime),
    arrivalDateTime: new Date(body.arrivalDateTime),
    businessSeat: body.businessSeat,
    businessPrice: body.businessPrice,
    economySeat: body.economySeat,
    economyPrice: body.economyPrice,
    firstclassSeat: body.firstclassSeat,
    firstclassPrice: body.firstclassPrice,
  });
  return results;
};

module.exports.getFlights = async (body) => {
  const { firstDepartureDateTime, secondDepartureDateTime } = body;
  const [results, feilds] = await db.query(
    "Select * from flight order by flightID ASC",
    [firstDepartureDateTime, secondDepartureDateTime]
  );
  return results;
};

// module.exports.getFlights = async (body) => {
//   const { firstDepartureDateTime, secondDepartureDateTime } = body;
//   const [results, feilds] = await db.query(
//     "Select * from flight where departureDateTime >= ? and departureDateTime <= ?",
//     [firstDepartureDateTime, secondDepartureDateTime]
//   );
//   return results;
// };

module.exports.updateFlight = async (id, body) => {
  const [results, feilds] = await db.query(
    "UPDATE flight set ? WHERE flightID = ?",
    [body, id]
  );
  return results;
};

module.exports.deleteFlight = async (id) => {
  const [results, feilds] = await db.query(
    "DELETE FROM flight WHERE flightID = ?",
    id
  );
  return results;
};
