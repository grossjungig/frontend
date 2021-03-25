import React from 'react';
import './index.css';
import locales from '../../locales/locales.cookieconsent.json';

const CookieConsent = (props) => {
  const lang = localStorage.getItem("lang");
  return (
      <div className="cookie-consent">
        <p className="cookie-consent__text">{locales.content[lang]}</p>
        <button className="cookie-consent__btn" onClick={props.clicked}>
          {locales.btnText[lang]}
        </button>
      </div>
  )
};

export default CookieConsent;