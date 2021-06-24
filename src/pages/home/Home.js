import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

import homeLocales from "../../locales/locales.home.json";
import { H3 } from '../../components/typography';
import { Card3 } from "../../components/styled";
import Hero from "../home/components/Hero/Hero";
import Why from "./components/Why/Why.js";
import NewsLetter from "./components/NewsLetter/Newsletter.js";
import { SecPanel, Mission } from "./styled";
import { card3 } from "./cards";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: false,
        };
    }

    componentDidMount() {
        setTimeout(() => { this.setState({ time: !this.state.time }) }, 1000);
    }
    myCallback = (dataFromChild) => {
        this.setState({ time: dataFromChild })
    }
    render() {
        const lang = localStorage.getItem("lang");
        return ( <
            >

            {
                this.state.time === true ?


                <
                NewsLetter lang = { lang }
                callbackFromParent = { this.myCallback } > < /NewsLetter>



                :
                    null
            }

            <
            Hero / >
            <
            Mission id = "about" >
            <
            H3 className = "home-mission" > { homeLocales.mission_1[lang] } < br / > { homeLocales.mission_2[lang] } <
            /H3> <
            Link className = "mission-button"
            to = "/about" > Learn more < /Link> <
            /Mission> <
            Why / >
            <
            SecPanel >
            <
            Card3 text = { homeLocales.opinion[lang] }
            source = { card3[0].source }
            /> <
            /SecPanel> <
            />
        );
    }
}

export default Home;