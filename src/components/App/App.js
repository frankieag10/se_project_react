/*import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
//import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import "./App.css";
import { getWeatherForecast, weatherData, weatherName } from "../../utils/WeatherApi";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import { useEscape } from "../hooks/useEscape";
import AddItemModal from "../AddItemModal/AddItemModal";
import api from "../../utils/Api";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [temp, setTemp] = React.useState(0);
  const [cardBackground, setCardBackground] = React.useState("Clear");
  const [location, setLocation] = React.useState("");
  const [dayType, setDayType] = React.useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState("F");
  const [clothingItems, setClothingItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherForecast();
        const weatherCondition = weatherName(data);
        setCardBackground(weatherCondition);
        setLocation(data.name);
        setTemp(weatherData(data));

        const sunset = new Date(data.sys.sunset * 1000);
        const sunrise = new Date(data.sys.sunrise * 1000);
        setDayType(Date.now() >= sunrise ? true : Date.now() <= sunset ? false : null);
      } catch (err) {
        console.error(err);
      }
    };

    const getItemList = async () => {
      try {
        const data = await api.getItemList();
        setClothingItems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    getItemList();
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
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      });
    }

    handleSubmit(makeRequest);
  }

  function handleCardDelete(card) {
    function makeRequest() {
      return api.addItem(card).then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        handleCloseModal();
      });
    }

    handleSubmit(makeRequest);
  }

  const handleToggleSwitchChange = (e) => {
    currentTemperatureUnit === "C"
      ? setCurrentTemperatureUnit("F")
      : setCurrentTemperatureUnit("C");
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
    console.log("confirm delete modal open");
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
        >
          {" "}
        </ItemModal>
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
*/
/*import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
//import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";
import { getWeatherForecast, weatherData, weatherName } from "../../utils/WeatherApi";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import api from "../../utils/Api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { useEscape } from "../hooks/useEscape";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  // const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [temp, setTemp] = React.useState(0);
  const [cardBackground, setCardBackground] = React.useState("Clear");
  const [location, setLocation] = React.useState("");
  const [dayType, setDayType] = React.useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState("F");
  const [clothingItems, setClothingItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getWeatherForecast()
      .then((data) => {
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
        getItemList();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function getItemList() {
    function makeRequest() {
      return api
        .getItemList()
        .then((data) => {
          setClothingItems(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    handleSubmit(makeRequest);
  }

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
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      });
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete(card) {
    function makeRequest() {
      return api.addItem(card).then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        handleCloseModal();
      });
    }
    handleSubmit(makeRequest);
  }

  const handleToggleSwitchChange = (e) => {
    currentTemperatureUnit === "C"
      ? setCurrentTemperatureUnit("F")
      : setCurrentTemperatureUnit("C");
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
    console.log("confrim delete modal opened!");
    setActiveModal("confirm");
  };
  useEscape(handleCloseModal);

  // const toggleMobileMenu = () => {

  // }

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
        >
          {" "}
        </ItemModal>
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
*/

import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";
import api from "../../utils/Api";
import { getWeatherForecast, weatherData, weatherName } from "../../utils/WeatherApi";
import { useEscape } from "../hooks/useEscape";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

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
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleOnAddItem(item) {
    setIsLoading(true);
    api
      .addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteItem(card)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
