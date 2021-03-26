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
              <img className={'home-contact-card-image'} src={email} alt="community-logo"/>
              <h4>info@grossjungig.de</h4>
            </div>
            <div className={'home-contact-icons-container'}>
              <img className={'home-contact-card-image'} src={phone} alt="community-logo"/>
              <h4>+49 30 55231271</h4>
            </div>
          </div>
        </div>

        {/*
        <H2 id="contact" style={{ textAlign: "center" }}>{homeLocales.contact[lang]}</H2>
        <ContactPanel >
          <ContactInfo>
            <H2 style={{ textAlign: "center" }}>
              Großjungig AI <br />
              {homeLocales.care[lang]}
            </H2>
            <H4 style={{ textAlign: "center" }}>
              {homeLocales.contact_us[lang]}{" "}
            </H4>
          </ContactInfo>
          <ContactRow>
            <img
              style={{ height: "59px", width: "59px", itemsAlign: "center" }}
              src="../image/Email.png"
              alt="email"
            />
            <H4>info@grossjungig.de</H4>
            <img
              style={{ height: "59px", width: "59px", itemsAlign: "center" }}
              src="../image/phone.png"
              alt="phone"
            />
            <H4>+49 30 55231271</H4>
          </ContactRow>
        </ContactPanel>*/}
        {/*

        <div className={"why-cards-scroll-container"}>
          <div className={"why-cards-container"}>
            <div className={"why-cards"}>
              <div className={'card'}>
                <div className={'card-title'}>{homeLocales.card_1_titel[lang]}</div>
                <img className={'card-image'} src={community} alt="community-logo"/>
                <div className={'card-text'}>{homeLocales.card_1[lang]}</div>
              </div>
              <div className={'card'}>
                <div className={'card-title'}>{homeLocales.card_2_titel[lang]}</div>
                <img className={'card-image'} src={savings} alt="savings-logo"/>
                <div className={'card-text'}>{homeLocales.card_2[lang]}</div>
              </div>
              <div className={'card'}>
                <div className={'card-title'}>{homeLocales.card_3_titel[lang]}</div>
                <img className={'card-image'} src={clarity} alt="clarity-logo"/>
                <div className={'card-text'}>{homeLocales.card_3[lang]}</div>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    )
  }
}

export default Contact;