import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

// Pages
import Home from './pages/home/Home';
import HowItWorks from './pages/howItWorks/HowItWorks';
import AboutUs from './pages/aboutUs/AboutUs';
import Impressum from './pages/impressum/Impressum';
import Login from './pages/login/Login.js';
import Signup from './pages/signup/Signup.js';
import AddProfile from "./pages/profile/addProfile";
import Faq from "./pages/faq/Faq"
import Partners from "./pages/partners/Index";
import ErrorPage from './pages/errorPage/ErrorPage';
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import Contact from "./pages/Contact/Contact"
import UserPortal from "./components/UserPortal";
import Berlin from "./components/Berlin/Berlin.js";
import AddRoom from "./components/AddRoom/AddRoom.js";
import UploadPhotos from "./components/UploadPhotos";
import Details from "./components/Details/Details";
import MapView from "./components/MapView/MapView";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Profile from "./components/Profile";

import People from "./components/People/People";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import EditProfile from "./pages/profile/editProfile";

import { connect } from 'react-redux';
import { dispatchCheckAuth } from './store/auth/thunks';

class App extends React.Component {

  componentDidMount() {
    this.props.tryAutoLogin();
  }

  updatePage = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <div className="app">
        <div className="app__content">
          <Navbar updatePage={this.updatePage} />
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route exact path="/signup"><Signup/></Route>
            <Route exact path="/contact"><Contact/></Route>
            <Route exact path="/faq"><Faq/></Route>

            <Route exact path="/termsandconditions"><TermsAndConditions/></Route>
            <Route exact path="/login" render={(props) => (
              <Login {...props} />
            )}/>

            <Route exact path="/userportal" render={(props) => 
              <UserPortal {...props} />}
            />

            <Route exact path="/berlin" render={(props) => 
              <Berlin {...props} />
            }/>

            <Route exact path="/people" render={(props) => <People {...props} />} />
            <Route exact path="/berlin/:id" render={(props) => <Details {...props} />} />
            <Route exact path="/addRoom" render={(props) => <AddRoom {...props} />} />
            <Route exact path="/about" render={(props) => <AboutUs {...props} />} />
            <Route exact path="/partners" render={(props) => <Partners {...props} />} />
            <Route exact path="/how" render={(props) => <HowItWorks {...props} />} />
            <Route exact path="/impressum" render={(props) => <Impressum {...props} />} />
            <Route exact path="/edit/:id" render={(props) => <EditProfile {...props} />}/>
            <Route exact path="/uploadphotos/:roomId" component={UploadPhotos} />
            <Route exact path="/maps" component={MapView} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route
              exact
              path="/addprofile"
              render={(props) => <AddProfile {...props} />}
            />
            <Route exact path="/profile/:id" render={(props) => (
              <Profile
                history={props.history}
                {...props}
              
              />
            )}/>
            <Route exact path="/reset/:token" component={ResetPassword} />

            <Route>
              <ErrorPage/>
            </Route>
          </Switch>
        </div>
        <div className="app__footer">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    // x: reduxState.x
  };
};

const mapDispatchToProps = {
  tryAutoLogin: () => dispatchCheckAuth()
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
