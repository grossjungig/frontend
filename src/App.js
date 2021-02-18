import React from "react";
import { Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/Navbar.js";
import Footer from "./components/footer/Footer.js";
import Signup from "./components/signup/Signup.js";
import Login from "./components/login/Login.js";
import UserPortal from "./components/UserPortal.js";
import Berlin from "./components/Berlin.js";
import AddRoom from "./components/AddRoom.js";
import UploadPhotos from "./components/UploadPhotos";
import Details from "./components/Details";
import MapView from "./components/MapView";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import Profile from "./components/Profile";
import AddProfile from "./components/AddProfile";
import People from "./components/People";
import ResetPassword from "./components/resetpassword/ResetPassword";
import EditProfile from "./components/EditProfile";
import HowItWorks from "./components/howitworks/HowItWorks";
import AboutUs from "./components/aboutus/AboutUs";
import Impressum from "./components/impressum/Impressum";

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
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                history={props.history}
                user={this.state.user}
                setUser={this.setUser}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup
                history={props.history}
                user={this.state.user}
                setUser={this.setUser}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login history={props.history} setUser={this.setUser} />
            )}
          />

          <Route
            exact
            path="/userportal"
            render={(props) => <UserPortal {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/berlin"
            render={(props) => <Berlin {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/people"
            render={(props) => <People {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/berlin/:id"
            render={(props) => <Details {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/addRoom"
            render={(props) => <AddRoom {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/aboutus"
            render={(props) => <AboutUs {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/how"
            render={(props) => <HowItWorks {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/impressum"
            render={(props) => <Impressum {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/edit/:id"
            render={(props) => (
              <EditProfile history={props.history} user={this.state.user} />
            )}
          />

          <Route exact path="/uploadphotos/:roomId" component={UploadPhotos} />
          <Route exact path="/maps" component={MapView} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route
            exact
            path="/addProfile"
            render={(props) => <AddProfile {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <Profile
                history={props.history}
                {...props}
                user={this.state.user}
              />
            )}
          />
          <Route exact path="/reset/:token" component={ResetPassword} />
        </ThemeProvider>
        <Footer className="footer-stick" />
      </div>
    );
  }
}

export default App;
