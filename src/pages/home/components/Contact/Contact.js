import React, {Component} from "react";
import styles from "./contact.module.css";
import homeLocales from "../../../../locales/locales.home.json";
import email from '../../../../assets/icons/email.svg'
import phone from '../../../../assets/icons/phone.svg'
import facebook from '../../../../assets/icons/facebook.svg'
import youtube from '../../../../assets/icons/youtube.svg'
import insta from '../../../../assets/icons/insta.svg'
import linkedIn from '../../../../assets/icons/linkedIn.svg'
import whatsapp from '../../../../assets/icons/whatsapp.svg'
class Contact extends Component {
  render() {
    const lang = localStorage.getItem("lang");
    return (
      <div className={styles.main}>
        {/* <h2>{homeLocales.contact[lang]}</h2> */}
        <div className={styles.container}>
          <div className={styles.textCard}>
            <div className={styles.textContainer}>
              <h2>Großjungig AI <br/> {homeLocales.care[lang]}</h2>
              <h4>{homeLocales.contact_us[lang]}{" "}</h4>
            </div>
          </div>
          <div className={styles.iconsCard}>
          <h3>{homeLocales.contact[lang]}:</h3>
            <div className={styles.iconContainer}>
              
              <div className={styles.icon}>
                <img src={email} alt="contact-logo"/>
                <h4>info@grossjungig.de</h4>
              </div>
              <div className={styles.icon}>
                <img src={phone} alt="contact-logo"/>
                <h4>+49 30 55231271</h4>
              </div>
            </div>
            <h3>{homeLocales.social[lang]}:</h3>
            <div className={styles.iconSocialContainer}>
              <a href={homeLocales.social.facebook} target={'_blank'} rel={'noreferrer'}><img src={facebook} alt="facebook-logo"/></a>
              <a href={homeLocales.social.youtube} target={'_blank'} rel={'noreferrer'}><img src={youtube} alt="youtube-logo"/></a>
              <a href={homeLocales.social.insta} target={'_blank'} rel={'noreferrer'}><img src={insta} alt="insta-logo"/></a>
              <a href={homeLocales.social.linkedIn} target={'_blank'} rel={'noreferrer'}><img src={linkedIn} alt="linkedIn-logo"/></a>
            </div>
            <h3>{homeLocales.whatsapp[lang]}</h3>
<div>              <img src={whatsapp} alt="contact-logo"/>
                <h4>+49 1575 1587481</h4>
</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact;