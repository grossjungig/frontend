import React from 'react';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import locales from '../../locales/locales.cookieconsent.json';

const CookieConsent = (props) => {
  const [cclang, setCcLanguage] = React.useState(localStorage.getItem("cclang"));

  const ccImageChange = () => {
    const cclanguage = localStorage.getItem("cclang");
    if (cclanguage === "en") {
      localStorage.setItem("cclang", "de");
      setCcLanguage("de")
    } else if (cclanguage === "de") {
      localStorage.setItem("cclang", "en");
      setCcLanguage("en")

    }
  };

  const warning = () => {

  }
  return (
    <div className="cc__overlay">
      <div className="cc__body">
        <div className="cc__content">
          <p className="cc__title">{locales.title[cclang]}</p>
          <p className="cc__text">{locales.content[cclang]}</p>
          <p className="cc__desc">{locales.desc[cclang]}  <span> <NavLink to="/"> {locales.cookie[cclang]} </NavLink> {cclang === "en" ? <span> and </span> : <span> und </span>} <NavLink to='/'>  {locales.privacy[cclang]} </NavLink> </span>.</p>
        </div>
        <div className="cc__buttons">
          <div className="main__buttons">
          <button className="whitecc__button" onClick={warning}>
              {locales.btnTextDismiss[cclang]}
            </button>

            <button className="bluecc__button" onClick={props.clicked}>
              {locales.btnTextAccept[cclang]}
            </button>
          </div>
          <div className="language__button">
          <button className="cc__language"
            onClick={(e) => ccImageChange(props.updatePage)}
            alt="Language Switcher"
          >
            {cclang === "de" ? "EN" : "DE"}
          </button>
          </div>
          
        </div>
      </div>
    </div>
  )
};

export default CookieConsent;