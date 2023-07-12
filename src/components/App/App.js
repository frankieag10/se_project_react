import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import api from "../../utils/Api";
import { getWeatherForecast, weatherData, weatherName } from "../../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";
import { useEscape } from "../../hooks/useEscape";

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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    function getItemList() {
      api
        .getItemList()
        .then((data) => {
          setClothingItems(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function handleWeatherData(data) {
      const weatherCondition = weatherName(data);
      setCardBackground(weatherCondition);
      const currentLocation = data.name;
      setLocation(currentLocation);
      const temperature = weatherData(data);
      setTemp(temperature);
      const sunset = new Date(data.sys.sunset * 1000);
      const sunrise = new Date(data.sys.sunrise * 1000);
      if (Date.now() >= sunrise) {
        setDayType(true);
      } else if (Date.now() <= sunset) {
        setDayType(false);
      }
    }

    getWeatherForecast()
      .then((data) => {
        handleWeatherData(data);
        getItemList();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleOnAddItem(item) {
    function makeRequest() {
      return api.addItem(item).then((newItem) => {
        console.log(newItem);
        setClothingItems((prevItems) => [newItem, ...prevItems]);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete(card) {
    function makeRequest() {
      return api.addItem(card).then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
      });
    }

    handleSubmit(makeRequest);
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleOpenModal = () => {
    setActiveModal("open");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setShowConfirmationModal(false);
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const openConfirmationModal = () => {
    setActiveModal("confirm delete modal opened");
    setShowConfirmationModal(true);
  };

  useEscape(handleCloseModal);

  return (
    <BrowserRouter>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            handleOpenModal={handleOpenModal}
            currentLocation={location}
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
        {showConfirmationModal && (
          <DeleteConfirmationModal
            onClose={handleCloseModal}
            onDeleteConfirm={() => handleCardDelete(selectedCard)}
            buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
