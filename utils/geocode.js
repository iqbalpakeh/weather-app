const request = require("request");

/**
 * Mapbox URL definition
 */
const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const token =
  "?access_token=pk.eyJ1IjoicHJvZ3JlbWFzdHVkaW8iLCJhIjoiY2p0M2hkYWRzMDFybzN6cGhhYnRoeGxkNCJ9.UuLVEM2aYL-aQ5M-72Juzw";
const query = "&limit=1";

/**
 * Retrieve latitude and longitude from specified address
 *
 * @param {*} address
 * @param {*} callback
 */
const geocode = (address, callback) => {
  const url = `${baseUrl}/${address}.json${token}${query}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (body.message === "Not Found") {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
