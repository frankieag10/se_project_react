import React from "react";
import "./DeleteConfirmationModal.css";
function DeleteConfirmationModal({ onClose, onDeleteConfirm, buttonText }) {
  return (
    <div className="modal modal__type_confirm">
      <div className="modal__content">
        <div className="modal__content-body">
          <button
            className="modal__close"
            onClick={onClose}
          ></button>
          <p className="modal__text">
            Are you sure you want to delete this item? This action is irreversible.
          </p>
          <button
            className="modal__yes-button"
            onClick={onDeleteConfirm}
          >
            {buttonText}
          </button>
          <button
            className="modal__cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmationModal;
