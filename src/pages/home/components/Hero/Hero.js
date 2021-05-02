import React, {Component} from "react";
import styles from "./hero.module.css"
import Button from "@material-ui/core/Button";
import homeLocales from "../../../../locales/locales.home.json";
import heroBanner from "../../../../assets/images/backgrounds/hero-home-background-picture.jpg";
import {Link} from "react-router-dom";

class Hero extends Component {
  state = {
    tab: 'rooms',
    filters: {
      district : 'Mitte'
    }
  }

  switchTab(tab) {
    this.setState({
      tab: tab,
    })
  }

  render() {
    const lang = localStorage.getItem("lang");
    const roomsLink = () => {
      return `/berlin?${new URLSearchParams(this.state.filters).toString()}`;
    }
    return (
      <div className={styles.main}>
        <div style={{backgroundImage: `url(${heroBanner})`}} className={styles.background}>
          <div className={styles.formContainer}>
            <div className={styles.header}>
              <h1>{homeLocales.find[lang]}</h1>
            </div>
            <div className={styles.form}>
              <div className={`${styles.tabs} ${styles.formGroup}`}>
                <Button onClick={() => this.switchTab('rooms')}
                        className={`${styles.btn} ${styles.tab}`}>
                  {homeLocales.offers[lang]}</Button>
                <Button onClick={() => this.switchTab('people')}
                        className={`${styles.btn} ${styles.btnDeselect} ${styles.tab}`}>
                  {homeLocales.requests[lang]}</Button>
              </div>
              <div className={`${styles.dropdowns}`}>
                <select className={`${styles.dropdown} ${styles.formGroup}`}>
                  {homeLocales.requests[lang]}</select>
                <select className={`${styles.dropdown} ${styles.formGroup}`}>
                  {homeLocales.requests[lang]}</select>
              </div>
              <Link to={this.state.tab === 'rooms' ? roomsLink : '/people'}>
                <Button className={`${styles.btn} ${styles.submit}`}>
                  {homeLocales.search[lang]}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero;