import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

import homeLocales from "../../locales/locales.home.json";

import { H1, H2, H3, H4 } from '../../components/typography';
import { Button, SecButton, PrimaryButtonLong, Card, Card2, Card3 } from "../../components/styled";
import { MainPanel, MainRow, SecPanel, RowChoose, RowSearch,
  Mission, Why, How, HowGrid, CommunityPanel, ContactPanel,
  ContactRow, ContactInfo } from "./styled";

import { card3 } from "./cards";
import Partners from "./components/Partners/Partners";

class Home extends Component {
  render() {
    const lang = localStorage.getItem("lang");
    return (
      <>
        <div className="home-component">
          <MainPanel>
            <H1 style={{ textAlign: "center" }}>
              {homeLocales.find[lang]}
              <br /> {homeLocales.second[lang]}
              <br /> {homeLocales.grand[lang]}
            </H1>
            <MainRow>
              <RowChoose>
                <Link to="/berlin">
                  <Button label={homeLocales.offers[lang]}></Button>
                </Link>
                <Link to="/people">
                  <SecButton>{homeLocales.requests[lang]}</SecButton>
                </Link>
              </RowChoose>
              
              <RowSearch>
                <PrimaryButtonLong>
                  {homeLocales.search[lang]}
                </PrimaryButtonLong>
              </RowSearch>
            </MainRow>
          </MainPanel>
        </div>
        <Mission id="about">
          <H3 style={{ textAlign: "center" }}>
            {homeLocales.mission_1[lang]} <br /> {homeLocales.mission_2[lang]}
          </H3>
        </Mission>
        <Why>
          <H2 style={{ textAlign: "center" }}>{homeLocales.why[lang]}</H2>
          <div className="why-use">
            <Card
              title={homeLocales.card_1_titel[lang]}
              text={homeLocales.card_1[lang]}
              image="/image/community.png"
            />
            <Card
              title={homeLocales.card_2_titel[lang]}
              text={homeLocales.card_2[lang]}
              image="/image/savings.png"
            />
            <Card
              title={homeLocales.card_3_titel[lang]}
              text={homeLocales.card_3[lang]}
              image="/image/clarity.png"
            />
          </div>
        </Why>
        <How id="how-it-works">
          <H2  style={{ textAlign: "center" }}>{homeLocales.how[lang]}</H2>
          <HowGrid>
            <Card2 title="#1" text={homeLocales.step_1[lang]} />
            <Card2 title="#2" text={homeLocales.step_2[lang]} />
            <Card2 title="#3" text={homeLocales.step_3[lang]} />
            <Card2 title="#4" text={homeLocales.step_4[lang]} />
            <Card2 title="#5" text={homeLocales.step_5[lang]} />
            <Card2 title="#6" text={homeLocales.step_6[lang]} />
          </HowGrid>
        </How>
        <SecPanel>
          <Card3 text={homeLocales.opinion[lang]} source={card3[0].source} />
        </SecPanel>
        <CommunityPanel id="community">
          <H2 style={{ textAlign: "center" }}>{homeLocales.community[lang]}</H2>
          <img
            src="/image/community-group.png"
            alt="community"
            style={{ width: "100%", height: "auto" }}
          />
        </CommunityPanel>
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
        </ContactPanel>
        <Partners />
      </>
    );
  }
}

export default Home;
