import React, {Component} from "react";
import styles from "./hero.module.css"
import Button from "@material-ui/core/Button";
import homeLocales from "../../../../locales/locales.home.json";
import heroBanner from "../../../../assets/images/backgrounds/hero-home-background-picture.jpg";
import {Link} from "react-router-dom";
import signupLocales from "../../../../locales/locales.signup.json";

class Hero extends Component {
  render() {
    const lang = localStorage.getItem("lang");
    return (
      <div className={styles.main}>
        <div style={{backgroundImage: `url(${heroBanner})`}} className={styles.background}>
          <div className={styles.formContainer}>
            <div className={styles.header}>
              {/*<h2>{homeLocales.find[lang]}</h2>*/}
              <h1>{homeLocales.find[lang]}</h1>
            </div>
            <div className={styles.form}>
              <div className={`${styles.tabs} ${styles.formGroup}`}>
                <Button className={`${styles.btn} ${styles.tab}`}>
                  {homeLocales.offers[lang]}</Button>
                <Button className={`${styles.btn} ${styles.btnDeselect} ${styles.tab}`}>
                  {homeLocales.requests[lang]}</Button>
              </div>
              <div className={`${styles.dropdowns}`}>
                <select className={`${styles.dropdown} ${styles.formGroup}`}>
                  {homeLocales.requests[lang]}</select>
                <select className={`${styles.dropdown} ${styles.formGroup}`}>
                  {homeLocales.requests[lang]}</select>
              </div>
              <Button className={`${styles.btn} ${styles.submit}`}
              >{homeLocales.search[lang]}</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero;

{/*<Button
                style={{
                  backgroundColor: "#365da7",
                  color: "white",
                }}
                variant="contained"
                onClick={this.handleSubmit}
                type="submit"
              >
                {signupLocales.submit[lang]}
              </Button>*/
}

/*<MainRow>
              <RowChoose>
                <Link to="/berlin">
                  <Button label={homeLocales.offers[lang]}></Button>
                </Link>
                <Link to="/people">
                  <SecButton>{homeLocales.requests[lang]}</SecButton>
                </Link>
              </RowChoose>

              <RowSearch>
                <PrimaryButtonLong>
                  {homeLocales.search[lang]}
                </PrimaryButtonLong>
              </RowSearch>
            </MainRow>*/