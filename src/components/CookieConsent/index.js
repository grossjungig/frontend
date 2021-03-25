import React from 'react';
import './index.css';

const CookieConsent = (props) => {
  return (
      <div className="cookie-consent">
        <div className="cookie-consent__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate unde fuga modi temporibus maiores hic excepturi ipsam eveniet ducimus eum.</div>
        <button className="cookie-consent__btn" onClick={props.clicked}>Got it!</button>
      </div> 
  )
};

export default CookieConsent;