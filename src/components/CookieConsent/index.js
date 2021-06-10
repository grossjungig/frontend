import React from 'react';
import { NavLink } from "react-router-dom";
import styles from'./index.module.css';
import locales from '../../locales/locales.cookieconsent.json';

const CookieConsent = (props) => {
  const lang = localStorage.getItem("lang");
  return (
      <div className={styles["cc__body"]}>
        <div className={styles["cc__content"]}>
          <p className={styles["cc__title"]}>{locales.title[lang]}</p>
          <p className={styles["cc__text"]}>{locales.content[lang]}</p>
          <p className={styles["cc__desc"]}>{locales.desc[lang]}  <span> <NavLink to="/"> {locales.cookie[lang]} </NavLink> {lang === "en" ? <span> and </span> : <span> und </span>} <NavLink to='/termsandconditions'>  {locales.privacy[lang]} </NavLink> </span>.</p>
        </div>
        <div className={styles["cc__buttons"]}>
            <button className={styles["whitecc__button"]} onClick={props.clicked}>
              {locales.btnTextDismiss[lang]}
            </button>

            <button className={styles["bluecc__button"]} onClick={props.clicked}>
              {locales.btnTextAccept[lang]}
            </button>
        </div>
      </div>
  )
};

export default CookieConsent;