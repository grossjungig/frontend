import React, { Component } from "react";
import Navbar from '../../components/Navbar/Navbar'
import Body from './Body/Body'
import AboutUs from '../aboutUs/AboutUs'
import HowItWorks from '../howItWorks/HowItWorks'
import Footer from '../../components/Footer/Footer'
import Impressum from '../impressum/Impressum'
import Contact from '../../pages/home/components/Contact/Contact' 

import { Route, Switch } from "react-router-dom";

class UnderConstruction extends Component {

    updatePage = () => {
        this.forceUpdate();
      };

    render(){
        return (
            <div>
            <Navbar updatePage={this.updatePage}/>
            <div>
            <Switch>
                <Route exact path='/' render={(props)=> <Body {...props}/>}/>
                <Route exact path="/aboutus" render={(props) => <AboutUs {...props} />} />
                <Route exact path="/how" render={(props) => <HowItWorks {...props} />} />
                <Route exact path="/impressum" render={(props) => <Impressum {...props} />} />
                <Route exact path="/contact" render={(props) => <Contact {...props} />} />
            </Switch>
            </div>
            <div>
                <Footer/>
            </div>
            </div>
        )
    }
    
}

export default UnderConstruction;
