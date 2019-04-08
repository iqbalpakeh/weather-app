const request = require("request");

/**
 * Darksky URL definition
 */
const baseUrl = "https://api.darksky.net/forecast";
const key = "/7be8d242628e88a181da27110e7ea8f0";
const query = "?units=si&lang=en";

/**
 * Retrieve data forecast from latitude and longitude
 *
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} callback
 */
const forecast = (latitude, longitude, callback) => {
  const url = `${baseUrl}${key}/${latitude}, ${longitude}${query}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It's currently ${
          body.currently.temperature
        } degrees Celcius out. There's a ${
          body.currently.precipProbability
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
