import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import avatarImage from "../../images/Ellipse_18.png";

function Header({ handleOpenModal, currentLocation }) {
  const currentDate = new Date().toLocaleString("default", { month: "long", day: "numeric" });

  return (
    <div>
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
            <p className="nav__user-title">Terrence Tegegne</p>
            <img
              className="nav__avatar"
              src={avatarImage}
              alt="avatar"
            />
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
        <div className="header__left">
          <img
            src={logo}
            alt="logo"
            className="header__logo"
          />
          <p className="header__date">
            {currentDate}, {currentLocation}
          </p>
        </div>
        <div className="header__right">
          <button
            className="header__button"
            onClick={handleOpenModal}
          >
            + Add clothes
          </button>
          <p className="header__user-title">Terrence Tegegne</p>
          <img
            className="header__avatar"
            src={avatarImage}
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}
export default Header;
