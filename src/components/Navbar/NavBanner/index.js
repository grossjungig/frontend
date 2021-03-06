import React from 'react';
import './index.css';
import { banner } from '../../../locales/locales.navbar.json';
import PhoneIcon from '@material-ui/icons/Phone';

export default () => {
    const lang = localStorage.getItem('lang');
    return (
        <div className="nav-banner">
            <span>{ banner.text[lang] }</span>
            <div className="nav-banner__phone">
                <PhoneIcon/>
                <a href="tel:+493055231271"><span>30 55231271</span></a>
            </div>
        </div>
    )
};