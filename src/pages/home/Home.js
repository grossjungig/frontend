import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

import homeLocales from "../../locales/locales.home.json";
import { H1, H2, H3 } from '../../components/typography';
import { Button, SecButton, PrimaryButtonLong, Card2, Card3 } from "../../components/styled";
import Contact from "./components/Contact/Contact";
import Why from "./components/Why/Why.js";
import { MainPanel, MainRow, SecPanel, RowChoose, RowSearch,
  Mission, How, HowFlex } from "./styled";

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
          <H3 className="home-mission">
            {homeLocales.mission_1[lang]} <br /> {homeLocales.mission_2[lang]}
          </H3>
          <Link className="mission-button" to="/aboutus">Learn more</Link>
        </Mission>
        <Why />
        <How id="how-it-works">
          <H2 titleColor="white" className="how-it-works-title">{homeLocales.how[lang]}</H2>
          <div className="category-title">Seniors</div>
          <HowFlex>
            <Card2 title="#1" text={homeLocales.step_1[lang]} />
            <Card2 title="#2" text={homeLocales.step_2[lang]} />
            <Card2 title="#3" text={homeLocales.step_3[lang]} />
            <Card2 title="#4" text={homeLocales.step_4[lang]} />
          </HowFlex>
        </How>
        <How backgroundColor="#CFE7F0" id="how-it-works">
          <div className="category-title">Young</div>
          <HowFlex>
            <Card2 title="#1" text={homeLocales.step_1[lang]} />
            <Card2 title="#2" text={homeLocales.step_2[lang]} />
            <Card2 title="#3" text={homeLocales.step_3[lang]} />
            <Card2 title="#4" text={homeLocales.step_4[lang]} />
          </HowFlex>
        </How>
        <SecPanel>
          <Card3 text={homeLocales.opinion[lang]} source={card3[0].source} />
        </SecPanel>
        <Contact />
        <Partners />
      </>
    );
  }
}

export default Home;
