import React from "react";
import "./aboutUs.css";
import { coreStaff, staff } from './data';

import aboutLocales from "../../locales/locales.aboutus.json";
import { Icon, MainPanel, Paragraph } from "./styled";
import { H1, H2, H4 } from '../../components/typography';
import StaffBoard from "./components/StaffBoard";

const {
  title,
  subtitle,
  description,
  question,
  answer,
  teamTitle,
  team,
} = aboutLocales;

const AboutUs = () => {
  const lang = localStorage.getItem("lang");

  return (
    <>
      <section className="hero-component">
        <MainPanel>
          <H4>{title[lang]}</H4>
          <H1 style={{ textAlign: "center" }}>{subtitle[lang]}</H1>
        </MainPanel>
      </section>
      <section className="aboutus-content">
        <Paragraph>{description.first[lang]}</Paragraph>
        <Icon image={"image/hands_heart_icon.png"}></Icon>
        <Paragraph>{description.second[lang]}</Paragraph>
        <Icon image={"image/home_heart_icon.png"}></Icon>
        <H2 style={{ marginBottom: "0" }}>{question[lang]}</H2>
        <Paragraph style={{ marginTop: "0" }}>{answer[lang]}</Paragraph>
      </section>

      <section className="team-big">

        <div className="team-big__intro">
          <h2>{teamTitle[lang]}</h2>
          <p>{team.intro.p1[lang]}</p>
          <p>{team.intro.p2[lang]}</p>
          <h3>{team.intro.facts.title[lang]}</h3>
          <ul>
            { team.intro.facts[lang].map(item => <li>{item}</li>)}
          </ul>
        </div>
        
        <StaffBoard
          className="core-staff" team={coreStaff} lang={lang}
          color="#fff" height="240"
        />

      </section>
      <section className="team-small">

        <StaffBoard
            className="staff" team={staff} lang={lang}
            color="#365fa7" height="160"
        />

      </section>
    </>
  );
};

export default AboutUs;
