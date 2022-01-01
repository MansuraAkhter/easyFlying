const db = require("../db");

module.exports.search = async (body) => {
  const {
    source,
    destination,
    firstDepartureDateTime,
    secondDepartureDateTime,
  } = body;
  const [results, feilds] = await db.query(
    "Select * from flight where source like ? and destination like ? and departureDateTime >= ? and departureDateTime <= ?",
    [
      "%" + source + "%",
      "%" + destination + "%",
      firstDepartureDateTime,
      secondDepartureDateTime,
    ]
  );
  console.log(results);
  return results;
};

module.exports.getFlightDetails = async (flightID) => {
  const [results, fields] = await db.query(
    "SELECT * from flight where flightID = ?",
    [flightID]
  );
  return results;
};

module.exports.bookEconomySeats = async (seatCount, flightID) => {
  const [results, fields] = await db.query(
    "Update flight set economySeat = economySeat - ? where flightID = ?",
    [seatCount, flightID]
  );
  return results;
};

module.exports.bookBusinessSeats = async (seatCount, flightID) => {
  const [results, fields] = await db.query(
    "Update flight set businessSeat = businessSeat - ? where flightID = ?",
    [seatCount, flightID]
  );
  return results;
};

module.exports.bookFirstClassSeats = async (seatCount, flightID) => {
  const [results, fields] = await db.query(
    "Update flight set firstclassSeat = firstclassSeat - ? where flightID = ?",
    [seatCount, flightID]
  );
  return results;
};

module.exports.insertTicket = async (userID, flightID, totalPrice) => {
  const [results, fields] = await db.query("Insert into ticket set ?", {
    userID,
    flightID,
    totalPrice,
  });
  return results;
};

module.exports.getUserTickets = async (userID) => {
  const [results, fields] = await db.query(
    "SELECT * from ticket inner join flight on ticket.flightID = flight.flightID where ticket.userID = ?",
    [userID]
  );
  return results;
};
