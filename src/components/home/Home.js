import React, { Component } from "react";
import { Link } from "react-router-dom";
import homeLocales from "../../locales/locales.home.json";
import "./home.css";
import { H1, H2, H4 } from "../typography";
import {
  Button,
  SecButton,
  SearchFieldLong,
  PrimaryButtonLong,
  Card,
  Card2,
  Card3,
} from "../styled";
import {
  MainPanel,
  MainRow,
  SecPanel,
  RowChoose,
  RowSelect,
  RowSearch,
  Mission,
  Why,
  HowGrid,
  CommunityPanel,
  ContactPanel,
  ContactRow,
  ContactInfo,
} from "./styled";

import { cards, card3, howCards } from "./cards";

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
                <SecButton>{homeLocales.requests[lang]}</SecButton>
              </RowChoose>
              <RowSelect>
                <SearchFieldLong
                  placeholder={homeLocales.city[lang]}
                  input=""
                ></SearchFieldLong>
              </RowSelect>
              <RowSearch>
                <PrimaryButtonLong>
                  {homeLocales.search[lang]}
                </PrimaryButtonLong>
              </RowSearch>
            </MainRow>
          </MainPanel>
        </div>
        <Mission id="about">
          <h2 style={{ color: "#202020", fontWeight: "500" }}>
            {homeLocales.mission_1[lang]} <br /> {homeLocales.mission_2[lang]}
          </h2>
        </Mission>
        <Why>
          <h3 style={{ fontSize: "25px", color: "black", textAlign: "center" }}>
            {homeLocales.why[lang]}
          </h3>
          <div className="why-use">
            {cards.map(({ title, text, image }, index) => (
              <Card key={index} title={title} text={text} image={image} />
            ))}
          </div>
        </Why>
        <h3
          id="how-it-works"
          style={{
            margin: "1.5rem",

            fontSize: "25px",
            color: "black",
            textAlign: "center",
          }}
        >
          {homeLocales.how[lang]}
        </h3>
        <HowGrid>
          {howCards.map(({ title, image, text }, index) => (
            <Card2 key={index} title={title} text={text} image={image} />
          ))}
        </HowGrid>
        <SecPanel>
          <Card3 text={card3[0].text} source={card3[0].source} />
        </SecPanel>
        <CommunityPanel id="community">
          <p>{homeLocales.community[lang]}</p>
          <img
            src="/image/community-group.png"
            alt="community"
            style={{ width: "100%", height: "auto" }}
          />
        </CommunityPanel>
        <h3
          id="how-it-works"
          style={{
            margin: "1.5rem",

            fontSize: "25px",
            color: "black",
            textAlign: "center",
          }}
        >
          {homeLocales.contact[lang]}
        </h3>
        <ContactPanel>
          <ContactInfo>
            <H2 style={{ textAlign: "center" }}>
              Grossjungig AI <br />
              cares about our community
            </H2>
            <H4 style={{ textAlign: "center" }}>
              If you have questions we are happy to answer them!
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
      </>
    );
  }
}

export default Home;
