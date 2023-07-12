import { handleServerResponse } from "./Api";

const latitude = 34.05;
const longitude = -118.24;
const APIkey = "48dd2c71369f97404ad7ca3630020d84";

export const getWeatherForecast = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(handleServerResponse);
  return weatherApi;
};

const weatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };

  return { weather };
};
const weatherName = (data) => {
  const name = data.weather[0].main;
  return name;
};

export { weatherData, weatherName };
