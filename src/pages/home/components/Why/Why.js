import React, {Component} from "react";
import "./why.css";
import homeLocales from "../../../../locales/locales.home.json";
import community from '../../../../assets/images/community.png';
import savings from '../../../../assets/images/savings.png';
import clarity from '../../../../assets/images/clarity.png';

class Why extends Component {
  render() {
    const lang = localStorage.getItem("lang");
    return (
      <div id="home-page-why">
        <h2>{homeLocales.why[lang]}</h2>
        <div className={"why-cards-scroll-container"}>
          <div className={"why-cards-container"}>
            <div className={"why-cards"}>
              <div className={'card'}>
                <div className={'card-title'}>{homeLocales.card_1_titel[lang]}</div>
                <img className={'card-image'} src={community} alt="community-logo"/>
                <div className={'card-text'}>{homeLocales.card_1[lang]}</div>
              </div>
              <div className={'card'}>
                <div className={'card-title'}>{homeLocales.card_2_titel[lang]}</div>
                <img className={'card-image'} src={savings} alt="savings-logo"/>
                <div className={'card-text'}>{homeLocales.card_2[lang]}</div>
              </div>
              <div className={'card'}>
                <div className={'card-title'}>{homeLocales.card_3_titel[lang]}</div>
                <img className={'card-image'} src={clarity} alt="clarity-logo"/>
                <div className={'card-text'}>{homeLocales.card_3[lang]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Why;