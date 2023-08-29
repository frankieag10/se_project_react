import React, { useContext, useState } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ onSelectCard, card, onLikeClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(card.likes.includes(currentUser._id));

  const handleLikeClick = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);

    onLikeClick({ id: card._id, isLiked: newLikeStatus, user: currentUser });
  };

  return (
    <div className="card">
      <div className="card__header">
        <span className="card__text">{card.name}</span>
        {isLoggedIn && (
          <button
            className={isLiked ? "card__like-button_liked" : "card__like-button"}
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
      <img
        src={card.imageUrl}
        className="card__image"
        alt={card.name}
        onClick={() => onSelectCard(card)}
      />
    </div>
  );
}

export default ItemCard;
