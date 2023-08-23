import React from "react";
import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "../ChangeProfileModal/ChangeProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ChangeProfileModal({ handleCloseModal, isOpen = { isOpen }, buttonText, onUpdateUser }) {
  const userData = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    if (!values.name && userData?.name) {
      setValues(userData);
    }
  }, [values.name, userData, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Change profile data"
      onClose={handleCloseModal}
      name="edit"
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
          onChange={handleChange}
          value={values.name}
        />
        <label
          htmlFor="url"
          className="form__label"
        >
          Avatar
        </label>
        <input
          id="url"
          type="url"
          className="form__input"
          placeholder="Avatar URL"
          name="avatar"
          onChange={handleChange}
          value={values.avatar}
        />
      </fieldset>
    </ModalWithForm>
  );
}

export default ChangeProfileModal;
