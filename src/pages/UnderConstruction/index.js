import React from 'react';
import Countdown from './Countdown';
import styles from './index.module.css';
import text from './text';
import bg from '../../assets/images/backgrounds/hero-home-background-picture.jpg';
import logo from '../../assets/images/Logo.png'

export default () => {
    return (
        <div className={styles.cmp}>
            
            {/* Background */}
            <img src={bg} alt="background" className={styles.bg} />
            
            {/* Content */}
            <div className={styles.body}>
                
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <img src={logo} alt="logo"/>
                    </div>
                    {/* <div>Social Nets</div> */}
                </div>

                {/* Content */}
                <div className={styles.content}>

                    {/* Text */}
                    <div className={styles.subcontent1}>
                        <p>{text.main.about.en}</p>
                        <p>{text.main.joinUs.en}</p>
                    </div>

                    {/* Countdown & Form */}
                    <div className={styles.subcontent2}>
                        <Countdown />
                        <div className={styles.form}>
                            <h3>Newsletter</h3>
                            <input type="text" placeholder="first name"/>
                            <input type="mail" placeholder="Email"/>
                            <select>
                                <option value="offer">Offer</option>
                                <option value="request">Request</option>
                            </select>
                            <button>Subscribe</button>
                        </div>
                    </div>

                </div>


                {/* Footer */}
                <div className={styles.footer}>
                    Copyright 2021 | About Us | How It Works | Partnership
                </div>

            </div>

        </div>
    )
}