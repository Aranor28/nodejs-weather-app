
const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
  .options({
    address: {
      demande: true,
      alias: 'a',
      describe: 'Address to fetch weather from',
      string: true,
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  console.log(`Address: ${response.data.results[0].formatted_address}`);

  const apiKey = '23e414512f7ae28cc525a82c4d97b7e6';
  const latitude = response.data.results[0].geometry.location.lat;
  const longitude = response.data.results[0].geometry.location.lng;
  const weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=si`;
  return axios.get(weatherUrl);

}).then((response) => {
  if (response.status !== 200) {
    throw new Error('Unable to fetch weather');
  }
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);

}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to the API server');
  } else {
    console.log(e.message);
  }
});
