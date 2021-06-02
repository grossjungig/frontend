import React from 'react';
import styles from './partners.module.css';
import { partners } from './data';
import partnersLocals from '../../../locales/locales.partners.json';

const Partners = () => {
    const lang = localStorage.getItem('lang');

    return (
        <div className={styles["partner-panel"]}>
            <div className={styles.main}>{partners.map((p) => (
                <div className={styles.image} key={p.name} >
                    <img className={styles["partner-logo"]} src={p.logo}  alt={p.name + ' logo'} />
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <a href={p.link} target="_blank" rel="noreferrer" >
                                <button className={styles["hover-button"]} title={ p.name }> {partnersLocals.cardinfo[lang]}</button>
                            </a></div>
                    </div>

                </div>
            ))}</div>
        </div>
    );
};

export default Partners;