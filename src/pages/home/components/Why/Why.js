import React, {Component} from "react";
import styles from "./why.module.css";
import homeLocales from "../../../../locales/locales.home.json";
import community from '../../../../assets/images/community.png';
import savings from '../../../../assets/images/savings.png';
import clarity from '../../../../assets/images/clarity.png';

class Why extends Component {
  render() {
    const lang = localStorage.getItem("lang");
    return (
      <div className={styles.main}>
        <div className={styles.scrollContainer}>
          <div className={styles.cardsContainer}>
            <div className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>{homeLocales.card_1_titel[lang]}</div>
                <img className={styles.cardImage} src={community} alt="community-logo"/>
                <div className={styles.cardText}>{homeLocales.card_1[lang]}</div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>{homeLocales.card_2_titel[lang]}</div>
                <img className={styles.cardImage} src={savings} alt="savings-logo"/>
                <div className={styles.cardText}>{homeLocales.card_2[lang]}</div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>{homeLocales.card_3_titel[lang]}</div>
                <img className={styles.cardImage} src={clarity} alt="clarity-logo"/>
                <div className={styles.cardText}>{homeLocales.card_3[lang]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Why;