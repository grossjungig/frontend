import React from "react";
import "./aboutUs.css";
import { coreStaff } from './data';

import aboutLocales from "../../locales/locales.aboutus.json";
import { Icon, MainPanel, Paragraph, TeamItem } from "./styled";
import { H1, H2, H4 } from '../../components/typography';

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
        
        <H2 style={{ color: "#fff", marginBottom: "0" }}>{teamTitle[lang]}</H2>
        <Paragraph style={{ color: "#fff", marginTop: "0" }}>
          {team.intro[lang]}
        </Paragraph>

        <div className="team-flex">{ coreStaff.map(cs => (
          <TeamItem 
            image={cs.img} name={cs.name}
            role={cs.role[lang]} color="#fff" height="240"
          />
        ))}</div>

      </section>
      <section className="team-small">
        <div className="team-grid">
          <TeamItem
            image="image/TeamProfilePics/Luca.png"
            name="Luca"
            role={team.Luca[lang]}
            color="#365FA7"
            height="160"
          ></TeamItem>
          <TeamItem
            image="image/TeamProfilePics/Tammy.png"
            name="Tammy"
            role={team.Tammy[lang]}
            color="#365FA7"
            height="160"
          ></TeamItem>
          <TeamItem
            image="image/TeamProfilePics/Rosina.png"
            name="Rosina"
            role={team.Rosina[lang]}
            color="#365FA7"
            height="160"
          ></TeamItem>
          <TeamItem
            image="image/TeamProfilePics/Vicky.png"
            name="Vicky"
            role={team.Vicky[lang]}
            color="#365FA7"
            height="160"
          ></TeamItem>
          <TeamItem
            image="image/TeamProfilePics/Magdalena.png"
            name="Magdalena"
            role={team.Magda[lang]}
            color="#365FA7"
            height="160"
          ></TeamItem>
          <TeamItem
            image="image/TeamProfilePics/Nida.png"
            name="Nida"
            role={team.Nida[lang]}
            color="#365FA7"
            height="160"
          ></TeamItem>
          <TeamItem
            image="image/TeamProfilePics/Maria.png"
            name="Maria"
            role={team.Maria[lang]}
            color="#365FA7"
            height="160"
          ></TeamItem>
          <TeamItem
            image="image/TeamProfilePics/Skander.png"
            name="Skander"
            role={team.Skander[lang]}
            color="#365FA7"
            height="160"
          ></TeamItem>
          <TeamItem
            image="image/TeamProfilePics/Vlad.png"
            name="Vlad"
            role={team.Vlad[lang]}
            color="#365FA7"
            height="160"
          ></TeamItem>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
