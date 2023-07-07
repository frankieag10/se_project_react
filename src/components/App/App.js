import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";
import { getWeatherForecast, weatherData, weatherName } from "../../utils/WeatherApi";
import { Switch, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import api from "../../utils/Api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { useEscape } from "../hooks/useEscape";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [cardBackground, setCardBackground] = useState("Clear");
  const [location, setLocation] = useState("");
  const [dayType, setDayType] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getWeatherData();
    getItemList();
  }, []);

  useEffect(() => {
    const sunset = new Date(selectedCard.sys?.sunset * 1000);
    const sunrise = new Date(selectedCard.sys?.sunrise * 1000);
    if (Date.now() >= sunrise) {
      setDayType(true);
    } else if (Date.now() <= sunset) {
      setDayType(false);
    }
  }, [selectedCard]);

  function getWeatherData() {
    getWeatherForecast()
      .then((data) => {
        const weatherCondition = weatherName(data);
        setCardBackground(weatherCondition);
        const currentLocation = data.name;
        setLocation(currentLocation);
        const temperature = weatherData(data);
        setTemp(temperature);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getItemList() {
    setIsLoading(true);
    api
      .getItemList()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleOnAddItem(item) {
    handleSubmit(() => api.addItem(item));
  }

  function handleCardDelete(card) {
    handleSubmit(() => api.deleteItem(card));
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

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

  const openConfirmationModal = () => {
    setActiveModal("confirm");
  };

  useEscape(handleCloseModal);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          handleOpenModal={handleOpenModal}
          currenLocation={location}
        />
        <Switch>
          <Route
            exact
            path="/"
          >
            <Main
              onSelectCard={handleSelectedCard}
              cards={clothingItems}
              weatherTemp={temp}
              cardBackground={cardBackground}
              dayType={dayType}
            />
          </Route>
          <Route path="/profile">
            <Profile
              cards={clothingItems}
              onSelectCard={handleSelectedCard}
              handleOpenModal={handleOpenModal}
            />
          </Route>
        </Switch>
      </CurrentTemperatureUnitContext.Provider>
      <Footer />
      {activeModal === "open" && (
        <AddItemModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "open"}
          onAddItem={handleOnAddItem}
          buttonText={isLoading ? "Saving..." : "Add garment"}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          onClose={handleCloseModal}
          selectedCard={selectedCard}
          onDeleteItem={openConfirmationModal}
        />
      )}
      {activeModal === "confirm" && (
        <DeleteConfirmationModal
          onClose={handleCloseModal}
          onDeleteConfirm={() => handleCardDelete(selectedCard)}
          buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
        />
      )}
    </div>
  );
}

export default App;
