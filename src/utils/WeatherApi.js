const latitude = 34.05;
const longitude = -118.24;
const APIkey = "48dd2c71369f97404ad7ca3630020d84";

export const getWeatherForecast = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
  return weatherApi;
};
const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const weatherData = (data) => {
  const {
    main: { temp },
  } = data;
  return Math.ceil(temp);
};

const weatherName = (data) => {
  const {
    weather: [{ main }],
  } = data;
  return main;
};

export { weatherData, weatherName };
