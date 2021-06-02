import React from 'react';
import styles from  "./index.module.css";
import Partner from './components/Partners';
import partnersLocales from '../../locales/locales.partners.json';
import avatar from "../../assets/icons/avatar/Avatar.svg";

const PartnerIndex = () => {
    const lang = localStorage.getItem("lang");
    return (
        <div>
            <div className={styles["partner-label"]}>
                <img src={ avatar } alt="people" />
                <p> {  partnersLocales.sideheading[lang]  } </p>
            </div>  
            <Partner />
        </div>
    )
}

export default PartnerIndex
