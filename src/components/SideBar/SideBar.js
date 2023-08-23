import React from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleOpenEditModal }) {
  const userData = React.useContext(CurrentUserContext);

  const firstLetter = userData?.name ? userData.name.charAt(0).toUpperCase() : "";

  return (
    <div className="sidebar">
      <div className="sidebar__info">
        {userData?.avatar ? (
          <img
            className="sidebar__user-avatar"
            src={userData?.avatar}
            alt="avatar"
          />
        ) : (
          <div className="header__avatar-placeholder">{firstLetter}</div>
        )}
        <p className="sidebar__user-title">{userData.name}</p>
      </div>
      <button
        className="sidebar__edit-info"
        onClick={handleOpenEditModal}
      >
        Change profile data
      </button>
      <button className="sidebar__logout">Log out</button>
    </div>
  );
}
export default SideBar;
