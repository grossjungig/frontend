import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import portalLocales from "../locales/locales.portal.json";

class UserPortal extends Component {
  state = {
    user: [],
  };
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({
        user: this.props.user,
      });
      console.log("user in portal", this.state.user);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const lang = localStorage.getItem("lang");
    console.log("USER profile", this.state.user.profile);
    console.log("name", this.state.user.name);

    return (
      <div className="portal-container" style={{textAlign:"center"}}>
        <h1 style={{
          color: "#365FA7",
          fontFamily: "Montserrat", fontWeight: "600"
        }}>
          {portalLocales.greeting[lang]} {this.state.user.name}!
        </h1>
        {/* <article>{portalLocales.article[lang]}</article> */}
        <div className="portal-container">
          <Link to="/berlin">
            <button>{portalLocales.rooms[lang]}</button>
          </Link>
          <Link to="/maps">
            <button>{portalLocales.map[lang]}</button>
          </Link>
          <Link to="/addroom">
            {this.state.user.role === "senior" ? (
              <button id="create-room-button" type="submit">
                {portalLocales.add[lang]}
              </button>
            ) : null}
          </Link>
          {/* <Link to="/berlin" style={{
                alignItems: "center"}}>
          <button>{portalLocales.info[lang]}</button>
        </Link> */}

          {this.state.user.profile === undefined ? (
            <Link to="/addprofile">
              <div style={{
                alignItems: "center"
              }}>
                <button id="create-room-button" type="submit"
                // style={{
                //   background: "#CFE7F0",
                //   /* Shadow under buttons */

                //   boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.15)",
                //   borderRadius: "16px",
                //   color: "#365FA7",
                //   fontFamily: "Montserrat",
                //   fontStyle: "normal",
                //   fontWeight: "600",
                //   fontSize: "16px",
                //   lineHeight: "20px",
                // }}
                >
                  {portalLocales.profile[lang]}
                </button>

              </div>
            </Link>

          ) : (
              <Link to="/profile">
                <button id="create-room-button" type="submit">
                  {portalLocales.profile2[lang]}  </button>
              </Link>
            )
          }
          {/* <Link to="/berlin" style={{
                alignItems: "center"}}>
          <button>{portalLocales.settings[lang]}</button>
        </Link> */}
        </div > </div >
    );
  }
}

export default UserPortal;
