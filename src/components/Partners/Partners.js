import React from 'react';
import styled from 'styled-components';
import './Partners.css';

import audalis from '../../assets/images/partners/audalis.jpeg';
import esf from '../../assets/images/partners/esf.jpeg';
import eu from '../../assets/images/partners/eu.jpeg';
import fub from '../../assets/images/partners/fub.jpeg';
import gzentrale from '../../assets/images/partners/gzentrale.png';
import profund from '../../assets/images/partners/profund.png';

const logos = [ eu, esf, fub, gzentrale, audalis, profund ];

const Partners = () => {
    return (
        <div className="partner-panel">
            <h2 className="partner-panel__title">Partners</h2>
            <div className="partner-panel__items">{ logos.map((logo, index) => (
                <div className="partner" id={'p'+index} key={index} >
                    <img src={logo} alt="partner logo"/>
                </div>
            ))}</div>
        </div>
    );
};

export default Partners;