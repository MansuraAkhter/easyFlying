const flights = require("../model/flights");

module.exports.getflights = async (req, res) => {
  try {
    const modelflights = await flights.getFlights(req.body);
    res.send(modelflights);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports.getflight = async (req, res) => {
  const flightID = req.params.flightID;
  try {
    const modelflights = await flights.getFlight(flightID);
    res.send(modelflights);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports.addflights = async (req, res) => {
  const body = req.body;

  try {
    const createFlight = await flights.createFlight(body);
    res.send({ success: true, msg: "flight inserted" });
  } catch (err) {
    res.send(err);
  }
};

module.exports.updateflights = async (req, res) => {
  const body = req.body;
  let id = req.params.flightID;

  try {
    const updateFlight = await flights.updateFlight(id, body);
    res.send({ success: true, msg: "flight updated" });
  } catch (error) {
    res.send(error);
  }
};

module.exports.deleteflights = async (req, res) => {
  let id = req.params.flightID;
  try {
    const deleteFlight = await flights.deleteFlight(id);
    res.send({ success: true, msg: "flight deleted" });
  } catch (error) {
    res.send({ success: false, msg: "flight not deleted" });
  }
};
