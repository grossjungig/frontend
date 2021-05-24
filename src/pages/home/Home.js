import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

import homeLocales from "../../locales/locales.home.json";
import { H2, H3 } from '../../components/typography';
import { Card2, Card3 } from "../../components/styled";
import Hero from "../home/components/Hero/Hero";
import Why from "./components/Why/Why.js";
import Contact from "./components/Contact/Contact";
import {SecPanel, Mission, How, HowFlex } from "./styled";
import { card3 } from "./cards";
import Partners from "./components/Partners/Partners";


class Home extends Component {
  render() {
    const lang = localStorage.getItem("lang");
    return (
      <>
        <Hero/>
        <Mission id="about">
          <H3 className="home-mission">
            {homeLocales.mission_1[lang]} <br /> {homeLocales.mission_2[lang]}
          </H3>
          <Link className="mission-button" to="/aboutus">Learn more</Link>
        </Mission>
        <Why />
        <How id="how-it-works">
          <H2 titleColor="white" className="how-it-works-title">{homeLocales.how[lang]}</H2>
          <div className="category-title-container">
            <div className="category-title">{homeLocales.senior[lang]}</div>
          </div>
          <HowFlex>
            <Card2 title="#1" text={homeLocales.step_1_sr[lang]} />
            <Card2 title="#2" text={homeLocales.step_2_sr[lang]} />
            <Card2 title="#3" text={homeLocales.step_3_sr[lang]} />
            <Card2 title="#4" text={homeLocales.step_4_sr[lang]} />
            <Card2 title="#5" text={homeLocales.step_5_sr[lang]} />
          </HowFlex>
        </How>
        <How backgroundColor="#CFE7F0" id="how-it-works">
          <div className="category-title-container">
            <div className="category-title">{homeLocales.young[lang]}</div>
          </div>
          <HowFlex>
            <Card2 title="#1" text={homeLocales.step_1_jr[lang]} />
            <Card2 title="#2" text={homeLocales.step_2_jr[lang]} />
            <Card2 title="#3" text={homeLocales.step_3_jr[lang]} />
            <Card2 title="#4" text={homeLocales.step_4_jr[lang]} />
            <Card2 title="#5" text={homeLocales.step_5_jr[lang]} />
          </HowFlex>
        </How>
        <SecPanel>
          <Card3 text={homeLocales.opinion[lang]} source={card3[0].source} />
        </SecPanel>
        <h2 className="contact-header">{homeLocales.contact[lang]}</h2>
        <Contact />
        <Partners />
      </>
    );
  }
}

export default Home;
