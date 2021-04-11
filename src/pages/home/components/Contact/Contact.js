import React, {Component} from "react";
import "./contact.css";
import homeLocales from "../../../../locales/locales.home.json";
import email from '../../../../assets/icons/email.svg'
import phone from '../../../../assets/icons/phone.svg'
import facebook from '../../../../assets/icons/facebook.svg'
import youtube from '../../../../assets/icons/youtube.svg'
import insta from '../../../../assets/icons/insta.svg'
import linkedIn from '../../../../assets/icons/linkedIn.svg'

class Contact extends Component {
  render() {
    const lang = localStorage.getItem("lang");
    return (
      <div id="home-page-contact">
        <h2>{homeLocales.contact[lang]}</h2>
        <div className={'home-contact-container'}>
          <div className={'home-contact-text-card'}>
            <div className={'home-contact-text-container'}>
              <h2>Großjungig AI <br/> {homeLocales.care[lang]}</h2>
              <h4>{homeLocales.contact_us[lang]}{" "}</h4>
            </div>
          </div>
          <div className={'home-contact-icons-card'}>
            <div className={'home-contact-icon-container'}>
              <div className={'home-contact-icon'}>
                <img src={email} alt="contact-logo"/>
                <h4>info@grossjungig.de</h4>
              </div>
              <div className={'home-contact-icon'}>
                <img src={phone} alt="contact-logo"/>
                <h4>+49 30 55231271</h4>
              </div>
            </div>
            <h4>{homeLocales.social[lang]}</h4>
            <div className={'home-contact-icon-social-container'}>
              <a href={homeLocales.social.facebook} target={'_blank'} rel={'noreferrer'}><img src={facebook} alt="facebook-logo"/></a>
              <a href={homeLocales.social.youtube} target={'_blank'} rel={'noreferrer'}><img src={youtube} alt="youtube-logo"/></a>
              <a href={homeLocales.social.insta} target={'_blank'} rel={'noreferrer'}><img src={insta} alt="insta-logo"/></a>
              <a href={homeLocales.social.linkedIn} target={'_blank'} rel={'noreferrer'}><img src={linkedIn} alt="linkedIn-logo"/></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact;