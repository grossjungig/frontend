import React from 'react';
import aboutLocales from "../../locales/locales.aboutus.json";
import { H1, H2, H3 } from '../typography';

const { title, subtitle, description, question, answer, teamTitle, team  } = aboutLocales;

export default function AboutUs() {
    const lang = localStorage.getItem("lang");
    return (
        <div style={{ textAlign: "center" }}>
            <H1>{title[lang]}</H1>
            <H2>{subtitle[lang]}</H2>
            <p>{description.first[lang]}</p>
            <p>{description.second[lang]}</p>
            <H3>{question[lang]}</H3>
            <p>{answer[lang]}</p>
            <H3>{teamTitle[lang]}</H3>
            <p>{team.intro[lang]}</p>
            <ul>
                <li>{team.anastasia[lang]}</li>
                <li>{team.olga[lang]}</li>
                <li>{team.menna[lang]}</li>
            </ul>
        </div>
    )
}
