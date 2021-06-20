import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

import homeLocales from "../../locales/locales.home.json";
import { H3 } from '../../components/typography';
import { Card3 } from "../../components/styled";
import Hero from "../home/components/Hero/Hero";
import Why from "./components/Why/Why.js";
import NewsLetter from "./components/NewsLetter/Newsletter.js";
import {SecPanel, Mission} from "./styled";
import { card3 } from "./cards";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
    };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ test: !this.state.test }) }, 1000);
  }

  render() {
    console.log('testtt',this.state.test)
    const lang = localStorage.getItem("lang");
    return (
      <>

      {this.state.test===true ?
      
      
   <NewsLetter></NewsLetter>
      
      
      
      :null}

        <Hero/>
        <Mission id="about">
          <H3 className="home-mission">
            {homeLocales.mission_1[lang]} <br /> {homeLocales.mission_2[lang]}
          </H3>
          <Link className="mission-button" to="/about">Learn more</Link>
        </Mission>
        <Why />
        <SecPanel>
          <Card3 text={homeLocales.opinion[lang]} source={card3[0].source} />
        </SecPanel>
      </>
    );
  }
}

export default Home;
