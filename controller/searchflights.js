const searchflights = require("../model/searchflights");

module.exports.search = async (req, res) => {
  try {
    const searchFlights = await searchflights.search(req.body);
    console.log(req.body);
    res.send(searchFlights);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports.book = async (req, res) => {
  const userID = req.user.userID;
  const flightID = req.params.flightID;
  const { flightType, seatCount } = req.body;
  try {
    const flightResults = await searchflights.getFlightDetails(flightID);
    const flightDetails = flightResults[0];

    if (flightType == "economy") {
      if (flightDetails.economySeat > seatCount) {
        const totalPrice = flightDetails.economyPrice * seatCount;
        const bookingResults = await searchflights.bookEconomySeats(
          seatCount,
          flightID
        );
        const insertResults = await searchflights.insertTicket(
          userID,
          flightID,
          totalPrice
        );
        return res.send("Booked Economy successfully");
      }
    } else if (flightType == "business") {
      if (flightDetails.businessSeat > seatCount) {
        const totalPrice = flightDetails.businessPrice * seatCount;
        const bookingResults = await searchflights.bookBusinessSeats(
          seatCount,
          flightID
        );
        const insertResults = await searchflights.insertTicket(
          userID,
          flightID,
          totalPrice
        );
      }
      return res.send("Booked Business uccessfully");
    } else if (flightType == "firtclass") {
      if (flightDetails.firstclassSeat > seatCount) {
        const totalPrice = flightDetails.firstclassPrice * seatCount;
        const bookingResults = await searchflights.bookFirstClassSeats(
          seatCount,
          flightID
        );
        const insertResults = await searchflights.insertTicket(
          userID,
          flightID,
          totalPrice
        );
      }
      return res.send("Booked Business successfully");
    }
    res.send("error");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports.getUserTickets = async (req, res) => {
  const userID = req.user.userID;
  console.log(userID);
  try {
    const userTickets = await searchflights.getUserTickets(userID);
    res.send(userTickets);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
