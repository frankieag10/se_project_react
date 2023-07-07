import React from "react";
import "./SideBar.css";
import avatarImage from "../../images/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__info">
        <img
          src={avatarImage}
          alt="User avatar"
          className="sidebar__user-avatar"
        />
        <p className="sidebar__user-title">frank aguirre</p>
      </div>
    </div>
  );
}
export default SideBar;
