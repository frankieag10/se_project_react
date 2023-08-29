import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ cards, onSelectCard, onCardLike, onLogoutUser, handleOpenModal, handleOpenChangeModal, isLoggedIn }) {
  return (
    <div className="profile">
      <SideBar
        handleOpenChangeModal={handleOpenChangeModal}
        onLogoutUser={onLogoutUser}
      />
      <ClothesSection
        isLoggedIn={isLoggedIn}
        onLikeClick={onCardLike}
        sectionData={cards}
        onSelectCard={onSelectCard}
        handleAddButton={handleOpenModal}
      />
    </div>
  );
}
export default Profile;
