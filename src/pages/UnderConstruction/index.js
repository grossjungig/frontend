import React from 'react';
import Countdown from './Countdown';
import styles from './index.module.css';
import bg from '../../assets/images/backgrounds/hero-home-background-picture.jpg';

export default () => {
    return (
        <div className={styles.main}>
            
            {/* Background */}
            <img src={bg} alt="background" className={styles.bg} />
            
            {/* Content */}
            <div className={styles.content}>
                
                {/* Header */}
                <div className={styles.header}>
                    <div>LOGO</div>
                    <div>Social Nets</div>
                </div>

                <Countdown />


                {/* Footer */}
                <div className={styles.footer}>
                    Copyright 2021 | About Us | Partnership
                </div>
            </div>

        </div>
    )
}