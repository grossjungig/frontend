import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import portalLocales from "../../locales/locales.portal.json";

class UserPortal extends Component {
  state = {
    user: [],
  };
  componentDidMount() {
    this._isMounted = true;

    console.log(this.props)

    if (this._isMounted) {
      this.setState({
        user: this.props.user,
      });
      
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const lang = localStorage.getItem("lang");
   

    return (
      <div className="portal-container" style={{ textAlign: "center" }}>
        <h1 style={{
          color: "#365FA7",
          fontFamily: "Montserrat", fontWeight: "600"
        }}>
          {portalLocales.greeting[lang]} {this.state.user.name}!
        </h1>
        
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

          {this.state.user.profile === undefined ? (
            <Link to="/addprofile">
              <div style={{
                alignItems: "center"
              }}>
                <button id="create-room-button" type="submit">
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

        </div>
      </div >
    );
  }
}

export default UserPortal;
