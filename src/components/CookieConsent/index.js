import React from 'react';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import locales from '../../locales/locales.cookieconsent.json';

const CookieConsent = (props) => {
  const [lang, setLanguage] = React.useState(localStorage.getItem("lang"));

  const imageChange = () => {
    const language = localStorage.getItem("lang");
    if (language === "en") {
      localStorage.setItem("lang", "de");
      setLanguage("de")
    } else if (language === "de") {
      localStorage.setItem("lang", "en");
      setLanguage("en")

    }
  };

  const warning = () => {
    toast.warning(locales.dismiss[lang], {
      position: "top-center",
      autoClose: 60000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <div className="cc__body">
      <div className="cc__content">
        <p className="cc__title">{locales.title[lang]}</p>
        <p className="cc__text">{locales.content[lang]}</p>
        <p className="cc__desc">{locales.desc[lang]}  <span> <NavLink to="/"> {locales.cookie[lang]} </NavLink> {lang === "en" ? <span> and </span> : <span> und </span>} <NavLink to='/'>  {locales.privacy[lang]} </NavLink> </span>.</p>
      </div>
      <div className="cc__buttons">
        <button className="whitecc__button" onClick={warning}>
          {locales.btnTextDismiss[lang]}
        </button>
        <ToastContainer
          position="top-center"
          autoClose={60000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <button className="bluecc__button" onClick={props.clicked}>
          {locales.btnTextAccept[lang]}
        </button>

        <button className="cc__language"
          onClick={(e) => imageChange(props.updatePage)}
          alt="Language Switcher"
        >
          {lang === "de" ? "EN" : "DE"}
        </button>
      </div>
    </div>
  )
};

export default CookieConsent;