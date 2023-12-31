import React, { useState, useEffect } from "react";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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
import LoginModal from "../LoginModal/LoginModal";
import auth from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ChangeProfileModal from "../ChangeProfileModal/ChangeProfileModal";

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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [token, setToken] = React.useState(localStorage.getItem("jwt"));
  //const errorHandler = require('./middlewares/error-handler');

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

  React.useEffect(() => {
    if (token) {
      handleTokenCheck(token).finally(() => {
        setIsLoading(true);
        setIsLoggedIn(true);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  function getItemList() {
    function makeRequest() {
      return api.getItemList().then((data) => {
        setClothingItems(data);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleOnAddItem(item) {
    function makeRequest() {
      return api.addItem(item, token).then((newItem) => {
        console.log(newItem);
        setClothingItems([newItem, ...clothingItems]);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete(item) {
    function makeRequest() {
      return api.removeItem(item._id, token).then(() => {
        setClothingItems((cards) => cards.filter((card) => card._id !== item._id));
      });
    }

    handleSubmit(makeRequest);
  }

  function onRegisterUser({ name, avatar, email, password }) {
    function makeRequest() {
      return auth.signupUser({ name, avatar, email, password }).then((user) => {
        console.log(user);
        history.push("/signin");
      });
    }
    handleSubmit(makeRequest);
  }

  function onSignInUser({ email, password }) {
    function makeRequest() {
      return auth.signinUser({ email, password }).then((data) => {
        if (data.token) {
          console.log("sign in data", data);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          handleTokenCheck(data.token);
          history.push("/profile");
        }
      });
    }
    handleSubmit(makeRequest);
  }
  function onLogoutUser() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  function onUpdateUser({ name, avatar }) {
    function makeRequest() {
      return auth.updateUser({ name, avatar }, token).then((res) => {
        setCurrentUser(res);
        console.log(res);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleTokenCheck(token) {
    if (token) {
      return auth
        .checkToken(token)
        .then((res) => {
          console.log(res);
          setCurrentUser(res);
          history.push("/profile");
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
    console.log("confirm delete modal opened");
    setActiveModal("confirm");
  };

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleOpenChangeModal = () => {
    setActiveModal("edit");
  };

  const handleOpenSignupModal = () => {
    setActiveModal("register");
  };

  const handleLikeClick = ({ id, isLiked }) => {
    isLiked
      ? api

          .addItemLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) => cards.map((c) => (c._id === id ? updatedCard : c)));
          })
          .catch((err) => console.log(err))
      : api

          .removeItemLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) => cards.map((c) => (c._id === id ? updatedCard : c)));
          })
          .catch((err) => console.log(err));
  };

  useEscape(handleCloseModal);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
          <Header
            isLoggedIn={isLoggedIn}
            handleOpenModal={handleOpenModal}
            currenLocation={location}
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenSignupModal={handleOpenSignupModal}
          />
          <Switch>
            <Route
              exact
              path="/"
            >
              <Main
                isLoggedIn={isLoggedIn}
                onCardLike={handleLikeClick}
                onSelectCard={handleSelectedCard}
                cards={clothingItems}
                weatherTemp={temp}
                cardBackground={cardBackground}
                dayType={dayType}
              />
            </Route>
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              path="/profile"
            >
              <Profile
                isLoggedIn={isLoggedIn}
                cards={clothingItems}
                onSelectCard={handleSelectedCard}
                handleOpenModal={handleOpenModal}
                handleOpenChangeModal={handleOpenChangeModal}
                onUpdateUser={onUpdateUser}
                onCardLike={handleLikeClick}
                onLogoutUser={onLogoutUser}
              />
            </ProtectedRoute>
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
            isLoggedIn={isLoggedIn}
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
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login"}
            buttonText={isLoading ? "Logging in..." : "Login"}
            handleOpenSignupModal={handleOpenSignupModal}
            onSignInUser={onSignInUser}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "register"}
            buttonText="Next"
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenSignupModal={handleOpenSignupModal}
            onRegisterUser={onRegisterUser}
          />
        )}
      </div>
      {activeModal === "edit" && (
        <ChangeProfileModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "edit"}
          onUpdateUser={onUpdateUser}
          buttonText={isLoading ? "Saving Changes..." : "Save Changes"}
        />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
