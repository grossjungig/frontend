import React from 'react';
import howitworksLocales from '../../locales/locales.howitworks.json';

import seniorsi from "../../assets/icons/seniors.svg"
import youth from "../../assets/icons/youth.svg"
import styles from  "./howitworks.module.css"


const { title, seniors, junior, seniorList, juniorList, faq} = howitworksLocales;

export default function HowItWorks() {
    const lang = localStorage.getItem("lang");
    return (

        <div className={styles.main}>
        <div className={styles["how-it-works-contatiner"]}>
<div className={`${styles["target-container"]} ${styles["senior-colors"]}`}>
    <h2 >{title[lang]}</h2>
    <img src={seniorsi} alt="seniors icon" />
    <h2 className={styles["people-header"]}>{seniors[lang]}</h2>
    <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>1</p>
        <p className={styles["step-text"]}>{seniorList.first[lang]}</p>
        
    </div>
    <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>2</p>
        <p className={styles["step-text"]}>{seniorList.second[lang]}</p>
        
    </div>
    <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>3</p>
        <p className={styles["step-text"]}>{seniorList.third[lang]}</p>
        
    </div>
    <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>4</p>
        <p className={styles["step-text"]}>{seniorList.fourth[lang]}</p>
        
    </div>
    </div><div className={`${styles["target-container"]} ${styles["youth-colors"]}`}>
    <h2 className={styles["title-youth"]}>{title[lang]}</h2>
    <img src={youth} alt="youth icon" />
    <h2 className={styles["people-header"]}>{junior[lang]}</h2>
    <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>1</p>
        <p className={styles["step-text"]}>{juniorList.first[lang]}</p>
        
    </div>
    <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>2</p>
        <p className={styles["step-text"]}>{juniorList.second[lang]}</p>
        
    </div>
    <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>3</p>
        <p className={styles["step-text"]}>{juniorList.third[lang]}</p>
        
    </div>
    <div className={styles["step-container"]}>
        <p className={styles["step-num"]}>4</p>
        <p className={styles["step-text"]}>{juniorList.fourth[lang]}</p>
        
    </div>
    </div>

    </div>
<div className={styles["faq-section"]}>
    <p>{faq.header[lang]}</p>
    <button>{faq.button[lang]}</button>
</div>
        </div>
    )
}
