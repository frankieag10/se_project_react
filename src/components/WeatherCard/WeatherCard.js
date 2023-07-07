import React, { useContext } from "react";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

function WeatherCard({ day, type, temperature }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption = weatherOptions.find((item) => item.day === day && item.type === type);
  const imageSourceUrl = weatherOption?.url || "";

  const temperatureValue = temperature?.weather?.temperature?.[currentTemperatureUnit];
  const temperatureUnit = currentTemperatureUnit === "F" ? "°F" : "°C";

  return (
    <div className="weather-card">
      <span className="weather__temperature">
        {temperatureValue} {temperatureUnit}
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
