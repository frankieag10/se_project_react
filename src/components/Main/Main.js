import React, { useContext } from "react";
import "../Main/Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  onSelectCard,
  onCardLike,
  weatherTemp,
  cardBackground,
  dayType,
  cards,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temprature?.[currentTemperatureUnit] || 999;
  const currentTemp = weatherTemp?.weather?.temperature?.[currentTemperatureUnit];

  const getWeatherType = () => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType();

  const filteredCards = cards.filter((card) => card.weather.toLowerCase() === weatherType);

  return (
    <main className="Main">
      <section
        className="weather"
        id="weather-section"
      >
        <WeatherCard
          day={dayType}
          type={cardBackground}
          temperature={weatherTemp}
        />
      </section>
      <section
        className="items"
        id="items-section"
      >
        <span className="weather__suggest">
          Today is {currentTemp}
          {currentTemperatureUnit === "F" ? "°F" : "°C"} / You may want to wear:
        </span>
        <div className="card-container">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                isLoggedIn={isLoggedIn}
                onLikeClick={onCardLike}
                card={item}
                onSelectCard={onSelectCard}
                key={item.id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
