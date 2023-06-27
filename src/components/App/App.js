import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import "./App.css";
import { getWeatherForecast, weatherData, weatherName } from "../../utils/WeatherApi";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [temp, setTemp] = React.useState(0);
  const [cardBackground, setCardBackground] = React.useState("Clear");
  const [location, setLocation] = React.useState("");
  const [dayType, setDayType] = React.useState(true);

  React.useEffect(() => {
    getWeatherForecast()
      .then((data) => {
        console.log(data);
        const {
          name,
          sys: { sunset, sunrise },
        } = data;

        const weatherCondition = weatherName(data);
        setCardBackground(weatherCondition);

        setLocation(name);

        const temperature = weatherData(data);
        setTemp(temperature);

        const now = Date.now();
        const sunriseTime = new Date(sunrise * 1000);
        const sunsetTime = new Date(sunset * 1000);

        setDayType(now >= sunriseTime && now <= sunsetTime);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleOpenModal = () => {
    setActiveModal("open");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  return (
    <div className="app">
      <Header
        handleOpenModal={handleOpenModal}
        currentLocation={location}
      />
      <Main
        onSelectCard={handleSelectedCard}
        temp={temp}
        cardBackground={cardBackground}
        dayType={dayType}
      />
      <Footer />
      {activeModal === "open" && (
        <ModalWithForm
          title="New garment"
          onClose={handleCloseModal}
          name="form"
          buttonText="Add garment"
        >
          <fieldset className="form__fieldset">
            <label
              htmlFor="name"
              className="form__label"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form__input"
              placeholder="Name"
            />
            <label
              htmlFor="url"
              className="form__label"
            >
              Image
            </label>
            <input
              id="url"
              type="url"
              className="form__input"
              placeholder="Image URL"
            />
          </fieldset>
          <fieldset className="form__fieldset">
            <span className="form__label">Select the weather type:</span>
            <label
              htmlFor="wather-hot"
              className="form__label"
            >
              <input
                type="radio"
                name="weatherType"
                id="wather-hot"
                className="form__input"
              />{" "}
              Hot
            </label>
            <label
              htmlFor="wather-warm"
              className="form__label"
            >
              <input
                type="radio"
                name="weatherType"
                id="wather-warm"
                className="form__input"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="wather-cold"
              className="form__label"
            >
              <input
                type="radio"
                name="weatherType"
                id="wather-cold"
                className="form__input"
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal
          onClose={handleCloseModal}
          selectedCard={selectedCard}
        ></ItemModal>
      )}
    </div>
  );
}

export default App;
