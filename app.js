
const yargs = require('yargs');

const brain = require('./brain');

const argv = yargs
  .options({
    address: {
      demande: true,
      alias: 'a',
      describe: 'Address to fetch weather from',
      string: true,
    },
    default: {
      alias: 'd',
      describe: 'The default address for comparing and to use if none other is provided',
      string: true,
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

if (argv.default) {
  console.log(argv.default);
  brain.setDefaultAddress(argv.default);
}

let address = '';
if (!argv.address) {
  address = brain.getDefaultAddress();
} else {
  address = argv.address;
}
if (!address) {
  console.log('You need to have an address specified or a default one set');
  return;
}

brain.getWeather(address);


// const encodedAddress = encodeURIComponent(argv.address);
// const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

// axios.get(geocodeUrl).then((response) => {
//   if (response.data.status === 'ZERO_RESULTS') {
//     throw new Error('Unable to find that address');
//   }
//   console.log(`Address: ${response.data.results[0].formatted_address}`);

//   const apiKey = '23e414512f7ae28cc525a82c4d97b7e6';
//   const latitude = response.data.results[0].geometry.location.lat;
//   const longitude = response.data.results[0].geometry.location.lng;
//   const weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=si`;
//   return axios.get(weatherUrl);

// }).then((response) => {
//   if (response.status !== 200) {
//     throw new Error('Unable to fetch weather');
//   }
//   const temperature = response.data.currently.temperature;
//   const apparentTemperature = response.data.currently.apparentTemperature;
//   console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);

// }).catch((e) => {
//   if (e.code === 'ENOTFOUND') {
//     console.log('Unable to connect to the API server');
//   } else {
//     console.log(e.message);
//   }
// });
