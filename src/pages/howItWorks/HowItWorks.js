import React from 'react';
import howitworksLocales from '../../locales/locales.howitworks.json';
import { H1, H2, H3 } from '../../components/typography';

const {
    title,
    subtitle,
    seniors,
    junior,
    seniorList,
    juniorList,
    descriptionTitle,
    description,
} = howitworksLocales;

export default function HowItWorks() {
    const lang = localStorage.getItem('lang');
    return (
        <div style={{ textAlign: 'center' }}>
            <H1>{title[lang]}</H1>
            <H2>{subtitle[lang]}</H2>
            <H3>{seniors[lang]}</H3>
            <ul>
                <li>{seniorList.first[lang]}</li>
                <li>{seniorList.second[lang]}</li>
                <li>{seniorList.third[lang]}</li>
                <li>{seniorList.fourth[lang]}</li>
                <li>{seniorList.fifth[lang]}</li>
            </ul>
            <H3>{junior[lang]}</H3>
            <ul>
                <li>{juniorList.first[lang]}</li>
                <li>{juniorList.second[lang]}</li>
                <li>{juniorList.third[lang]}</li>
                <li>{juniorList.fourth[lang]}</li>
                <li>{juniorList.fifth[lang]}</li>
            </ul>
            <H3>{descriptionTitle[lang]}</H3>
            <p>{description[lang]}</p>
        </div>
    );
}
