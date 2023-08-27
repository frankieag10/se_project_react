import React from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleOpenEditModal, onLogoutUser }) {
  const userData = React.useContext(CurrentUserContext);

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
          <div className="header__avatar-placeholder">{userData?.name?.charAt().toUpperCase() || ""}</div>
        )}

        <p className="sidebar__user-title">{userData.name}</p>
      </div>
      <button
        className="sidebar__edit-info"
        onClick={handleOpenEditModal}
      >
        Change profile data
      </button>
      <button
        className="sidebar__logout"
        onClick={onLogoutUser}
      >
        Log out
      </button>
    </div>
  );
}
export default SideBar;
