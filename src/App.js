import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "./App.css";

// Pages
import Home from './pages/home/Home';
import HowItWorks from './pages/howItWorks/HowItWorks';
import AboutUs from './pages/aboutUs/AboutUs';
import Impressum from './pages/impressum/Impressum';
import Login from './pages/login/Login.js';
import Signup from './pages/signup/Signup.js';

import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";

import UserPortal from "./components/UserPortal/UserPortal.js";
import Berlin from "./components/Berlin/Berlin.js";
import AddRoom from "./components/AddRoom/AddRoom.js";
import UploadPhotos from "./components/UploadPhotos";
import Details from "./components/Details/Details";
import MapView from "./components/MapView/MapView";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Profile from "./components/Profile/Profile";
import AddProfile from "./components/AddProfile/AddProfile";
import People from "./components/People/People";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import EditProfile from "./components/EditProfile/EditProfile";

import { connect } from 'react-redux';
import { dispatchCheckAuth } from './store/auth/thunks';


const theme = {
  main: "#ed8707",
};

class App extends React.Component {
  state = {
    user: this.props.user,
  };

  setUser = (userObj) => {
    this.setState({
      user: userObj,
    });
  };

  componentDidMount() {
    this.props.tryAutoLogin();
  }

  updatePage = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Navbar
            setUser={this.setUser}
            user={this.state.user}
            history={this.props.history}
            updatePage={this.updatePage}
            //This means exporting "updatePage" to Navbar
          />
          <Switch>
            <Route exact path="/" render={(props) => (
              <Home
                history={props.history}
                user={this.state.user}
                setUser={this.setUser}
              />
            )}/>
            
            <Route exact path="/signup" render={(props) => (
              <Signup
                history={props.history}
                user={this.state.user}
                setUser={this.setUser}
              />
            )}/>

            <Route exact path="/login" render={(props) => (
              <Login history={props.history} setUser={this.setUser} />
            )}/>

            <Route exact path="/userportal" render={(props) => 
              <UserPortal {...props} user={this.state.user} />}
            />

            <Route exact path="/berlin" render={(props) => 
              <Berlin {...props} user={this.state.user} />
            }/>

            <Route exact path="/people" render={(props) => <People {...props} user={this.state.user} />} />
            <Route exact path="/berlin/:id" render={(props) => <Details {...props} user={this.state.user} />} />
            <Route exact path="/addRoom" render={(props) => <AddRoom {...props} user={this.state.user} />} />
            <Route exact path="/aboutus" render={(props) => <AboutUs {...props} user={this.state.user} />} />
            <Route exact path="/how" render={(props) => <HowItWorks {...props} user={this.state.user} />} />
            <Route exact path="/impressum" render={(props) => <Impressum {...props} user={this.state.user} />} />
            <Route exact path="/edit" render={(props) => (
              <EditProfile history={props.history} user={this.state.user} />
            )}/>

            <Route exact path="/uploadphotos/:roomId" component={UploadPhotos} />
            <Route exact path="/maps" component={MapView} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route
              exact
              path="/addProfile"
              render={(props) => <AddProfile {...props} user={this.state.user} />}
            />
            <Route exact path="/profile" render={(props) => (
              <Profile
                history={props.history}
                {...props}
                user={this.state.user}
              />
            )}/>

            <Route exact path="/reset/:token" component={ResetPassword} />
          </Switch>
        </ThemeProvider>
        <Footer className="footer-stick" />
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
