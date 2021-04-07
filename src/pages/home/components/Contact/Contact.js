import React, {Component} from "react";
import "./contact.css";
import homeLocales from "../../../../locales/locales.home.json";
import email from '../../../../assets/icons/email.svg'
import phone from '../../../../assets/icons/phone.svg'

class Contact extends Component {
  render() {
    const lang = localStorage.getItem("lang");
    return (
      <div id="home-page-contact">
        <h2>{homeLocales.contact[lang]}</h2>
        <div className={'home-contact-container'}>
          <div className={'home-contact-card'}>
            <div className={'home-contact-text-container'}>
              <h2>Großjungig AI <br/> {homeLocales.care[lang]}</h2>
              <h4>{homeLocales.contact_us[lang]}{" "}</h4>
            </div>
          </div>
          <div className={'home-contact-card'}>
            <div className={'home-contact-icons-container'}>
              <img className={'home-contact-card-image'} src={email} alt="contact-logo"/>
              <h4>info@grossjungig.de</h4>
            </div>
            <div className={'home-contact-icons-container'}>
              <img className={'home-contact-card-image'} src={phone} alt="contact-logo"/>
              <h4>+49 30 55231271</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact;