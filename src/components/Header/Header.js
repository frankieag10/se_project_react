import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import avatarImage from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function Header({ handleOpenModal, currentLocation }) {
  const currentDate = new Date().toLocaleString("default", { month: "long", day: "numeric" });

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
              <p className="nav__user-title">Terrence Tegegne</p>
              <img
                className="nav__avatar"
                src={avatarImage}
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
            {currentDate}, {currentLocation}
          </p>
        </div>
        <div className="header__right-side">
          <ToggleSwitch />
          <button
            className="header__button"
            onClick={handleOpenModal}
          >
            + Add clothes
          </button>
          <Link
            to="/profile"
            className="header__link"
          >
            <p className="header__user-title">Terrance Tegegne</p>
          </Link>
          <Link to="/profile">
            <img
              className="header__avatar"
              src={avatarImage}
              alt="avatar"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
