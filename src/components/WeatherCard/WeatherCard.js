import React from "react";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

function WeatherCard({ day, type, temperature }) {
  const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

  console.log(temperature?.weather?.temperature?.[currentTemperatureUnit]);
  // weatherOptions.find((item) => console.log(item.day === day && item.type === type));
  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  });
  const imageSourceUrl = weatherOption?.url || "";
  return (
    <div className="weather-card">
      <span className="weather__temperature">
        {temperature?.weather?.temperature?.[currentTemperatureUnit]}{" "}
        {currentTemperatureUnit === "F" ? "°F" : "°C"}
      </span>
      <img
        className="weather__bg"
        src={imageSourceUrl}
        alt="weather background"
      />
    </div>
  );
}

export default WeatherCard;
