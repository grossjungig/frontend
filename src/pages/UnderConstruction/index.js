import React from 'react';
import Countdown from './Countdown';
import styles from './index.module.css';
import bg from '../../assets/images/backgrounds/hero-home-background-picture.jpg';

export default () => {
    return (
        <div className={styles.cmp}>
            
            {/* Background */}
            <img src={bg} alt="background" className={styles.bg} />
            
            {/* Content */}
            <div className={styles.body}>
                
                {/* Header */}
                <div className={styles.header}>
                    <div>LOGO</div>
                    <div>Social Nets</div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <div className={styles.contentL}>
                        <Countdown />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, iure.</p>
                    </div>
                    <div className={styles.contentR}>
                        <p>Newsletter</p>
                        <p>Subscribe (Email, Name)</p>
                        <button>subscribe</button>
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