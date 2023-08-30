import React from "react";
import "./LoginModal.css";
import { Link } from "react-router-dom";
import { useEscape } from "../../hooks/useEscape";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ onSignInUser, handleCloseModal, isOpen = { isOpen }, buttonText, handleOpenSignupModal }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    console.log(values);
    onSignInUser(values);
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log in"
      onClose={handleCloseModal}
      name="login"
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
      </fieldset>
      <Link
        to="/signup"
        onClick={handleOpenSignupModal}
        className="modal__register"
      >
        Or Register
      </Link>
    </ModalWithForm>
  );
}

export default LoginModal;
