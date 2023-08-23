import React from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ onAddItem, handleCloseModal, isOpen = false, buttonText }) {
  const { values, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      onClose={handleCloseModal}
      name="form"
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <label
          htmlFor="name"
          className="form__label"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form__input"
          placeholder="Name"
          name="name"
          minLength={1}
          maxLength={30}
          value={values.name}
          onChange={handleChange}
        />
        <label
          htmlFor="url"
          className="form__label"
        >
          Image
        </label>
        <input
          id="url"
          type="url"
          className="form__input"
          placeholder="Image URL"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <span className="form__label">Select the weather type:</span>
        <label
          htmlFor="weather-hot"
          className="form__label"
        >
          <input
            type="radio"
            value="Hot"
            onChange={handleChange}
            name="weather"
            id="weather-hot"
            className="form__input"
            checked={values.weather === "Hot"}
          />{" "}
          Hot
        </label>
        <label
          htmlFor="weather-warm"
          className="form__label"
        >
          <input
            type="radio"
            value="Warm"
            onChange={handleChange}
            name="weather"
            id="weather-warm"
            className="form__input"
            checked={values.weather === "Warm"}
          />{" "}
          Warm
        </label>
        <label
          htmlFor="weather-cold"
          className="form__label"
        >
          <input
            type="radio"
            value="Cold"
            onChange={handleChange}
            name="weather"
            id="weather-cold"
            className="form__input"
            checked={values.weather === "Cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
