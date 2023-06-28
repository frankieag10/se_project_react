import { weatherOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherBackground({ day, type }) {
  const weatherOption = weatherOptions.find((item) => item.day === day && item.type === type);
  console.log(weatherOption);

  const imageSourceUrl = weatherOption?.url || "";
  console.log(weatherOption?.url);
  return (
    <img
      className="weather__background"
      src={imageSourceUrl}
      alt="weather background"
    />
  );
}

export default WeatherBackground;
