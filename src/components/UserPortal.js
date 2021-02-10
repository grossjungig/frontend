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
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const lang = localStorage.getItem("lang");

    return (
      <div className="portal-container">
        <h1>
          {portalLocales.greeting[lang]} {this.state.user.name}!
        </h1>
        <article>{portalLocales.article[lang]}</article>
        <p></p>
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
            <button id="create-room-button" type="submit">
              Add Profile
            </button>
          </Link>
        ) : (
          <Link to="/profile">
            <button id="create-room-button" type="submit">
              View/Edit Profile
            </button>
          </Link>
        )}
        <button>Check Requests</button>
      </div>
    );
  }
}

export default UserPortal;
