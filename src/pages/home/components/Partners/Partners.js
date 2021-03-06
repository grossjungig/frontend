import React from 'react';
import './Partners.css';
import { partners } from './data';
import homeLocales from '../../../../locales/locales.home.json';

const { title } = homeLocales.partners;

const Partners = () => {
    const lang = localStorage.getItem('lang');
    return (
        <div className="partner-panel">
            <h2 className="partner-panel__title">{title[lang]}</h2>
            <div className="partner-panel__items">{ partners.map((p) => (
                <div className="partner" key={p.name} >
                    <a href={p.link} target="_blank" rel="noreferrer" >
                        <img src={p.logo} alt={p.name + ' logo'} />
                    </a>
                </div>
            ))}</div>
        </div>
    );
};

export default Partners;