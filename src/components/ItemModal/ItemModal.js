import "./ItemModal.css";
function ItemModal({ onClose, selectedCard }) {
  return (
    <div className={`modal modal__type_image`}>
      <div className="modal__content">
        <div className="modal__body">
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
          />
          <img
            src={selectedCard.link}
            className="modal__image"
            alt="aimeg of modal"
          />
        </div>
        <div className="modal__footer">
          <p className="modal__paragraph modal__item-name">{selectedCard.name}</p>
          <p className="modal__paragraph modal__weather-type">{selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
