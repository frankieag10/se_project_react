import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import avatarImage from "../../images/Ellipse_18.png";

function Header({ handleOpenModal, currentLocation }) {
  const currentDate = new Date().toLocaleString("default", { month: "long", day: "numeric" });

  return (
    <header className="header">
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
    </header>
  );
}
export default Header;
