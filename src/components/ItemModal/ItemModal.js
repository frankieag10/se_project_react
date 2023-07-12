import "./ItemModal.css";

function ItemModal({ onClose, selectedCard, onDeleteItem }) {
  return (
    <div className="modal modal__type_image">
      <div className="modal__content">
        <div className="modal__body">
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
          />
          <img
            src={selectedCard.imageUrl}
            className="modal__image"
            alt={selectedCard.name}
          />
        </div>
        <div className="modal__footer">
          <div className="modal__footer-top">
            <p className="modal__paragraph modal__item-name">{selectedCard.name}</p>
            <button
              className="modal__delete-button"
              onClick={onDeleteItem}
            >
              Delete item
            </button>
          </div>
          <p className="modal__paragraph modal__weather-type">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
