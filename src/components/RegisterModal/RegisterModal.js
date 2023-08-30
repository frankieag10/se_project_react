import React from "react";
import "../RegisterModal/RegisterModal.css";
import { Link } from "react-router-dom";
import { useEscape } from "../../hooks/useEscape";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ onRegisterUser, handleCloseModal, isOpen = { isOpen }, buttonText, handleOpenLoginModal }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    console.log(values);
    onRegisterUser(values);
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      onClose={handleCloseModal}
      name="register"
      buttonText={buttonText}
      onSubmit={handleOnSubmit}
    >
      <fieldset className="form__fieldset">
        <label
          htmlFor="email"
          className="form__label"
        >
          Email
        </label>
        <input
          value={values.email}
          type="email"
          id="email"
          className="form__input"
          placeholder="Email"
          name="email"
          minLength={1}
          maxLength={30}
          onChange={handleChange}
        />

        <label
          htmlFor="password"
          className="form__label"
        >
          Password
        </label>
        <input
          value={values.password}
          id="password"
          type="password"
          className="form__input"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <label
          htmlFor="name"
          className="form__label"
        >
          Name
        </label>
        <input
          value={values.name}
          type="text"
          id="name"
          className="form__input"
          placeholder="Name"
          name="name"
          minLength={1}
          maxLength={30}
          onChange={handleChange}
        />

        <label
          htmlFor="url"
          className="form__label"
        >
          Avtar URL
        </label>
        <input
          value={values.avatar}
          id="avatar"
          type="url"
          className="form__input"
          placeholder="Avatar URL"
          name="avatar"
          onChange={handleChange}
        />
      </fieldset>
      <Link
        to="/signin"
        onClick={handleOpenLoginModal}
        className="modal__register"
      >
        Or Log in
      </Link>
    </ModalWithForm>
  );
}

export default RegisterModal;
