import React, { Component } from "react";
import { Link } from "react-router-dom";
import homeLocales from "../../locales/locales.home.json";
import "./home.css";
import { H1 } from "../typography";
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
              Find your <br /> second <br /> grand family
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
            Grossjungig is reinventing intergenerational co-living in big cities
            by bringing seniors and youth together. <br /> We make the world
            more connected and promote social cohesion.
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
          How does it work?
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
          <p>Community</p>
          <img
            src="/image/community-group.png"
            alt="community"
            style={{ width: "100%", height: "auto" }}
          />
        </CommunityPanel>
        <ContactPanel>
          <p>Contact</p>
          <img
            src="/image/contact.png"
            alt="contact"
            style={{ width: "100%", height: "auto" }}
          />
        </ContactPanel>
      </>
    );
  }
}

export default Home;
