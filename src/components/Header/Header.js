import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleOpenModal,
  isLoggedIn,
  handleOpenLoginModal,
  handleOpenSignupModal,
  currenLocation,
}) {
  const currentDate = new Date().toLocaleString("default", { month: "long", day: "numeric" });

  const userData = React.useContext(CurrentUserContext);
  console.log(userData);
  return (
    <header>
      <nav className="nav">
        <img
          src={logo}
          alt="logo"
          className="nav__logo"
        />
        <button className="nav__menu-button"></button>
        <menu className="nav__menu">
          <button className="nav__menu-close"></button>
          <div className="nav__user-info">
            <Link to="/profile">
              <p className="nav__user-title">{"userData?.name"}</p>
              <img
                className="nav__avatar"
                src={"userData?.avatar"}
                alt="avatar"
              />
            </Link>
          </div>
          <button
            className="nav__button"
            onClick={handleOpenModal}
          >
            + Add clothes
          </button>
        </menu>
      </nav>

      <div className="header">
        <div className="header__left-side">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="header__logo"
            />
          </Link>
          <p className="header__date">
            {currentDate}, {currenLocation}
          </p>
        </div>

        {isLoggedIn ? (
          <div className="header__right-side">
            <button
              className="header__button"
              onClick={handleOpenModal}
            >
              + Add clothes
            </button>
            <ToggleSwitch />
            <Link
              to="/profile"
              className="header__link"
            >
              <p className="header__user-title">{isLoggedIn ? userData?.name : "No logged in"}</p>
            </Link>
            <Link to="/profile">
              {userData?.avatar ? (
                <img
                  className="header__avatar"
                  src={userData?.avatar}
                  alt="avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {Array.from(userData?.name)[0].toUpperCase()}
                </div>
              )}
            </Link>
          </div>
        ) : (
          <div className="header__right-side">
            <ToggleSwitch />
            <button
              className="header__login-button"
              onClick={handleOpenLoginModal}
            >
              Log in
            </button>
            <button
              className="header__signup-button"
              onClick={handleOpenSignupModal}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
