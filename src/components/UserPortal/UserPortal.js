import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import portalLocales from "../../locales/locales.portal.json";
import { connect } from 'react-redux'

const UserPortal = (props) => {
  const lang = localStorage.getItem("lang");
  const [user, setUser] = useState({ name: '' })

  useEffect(() => {
    setUser(prev => {
      if (props.user) return props.user;
      return prev;
    });
  }, [props.user]);

  return (
    <div className="portal-container" style={{ textAlign: "center" }}>
      <h1 style={{
        color: "#365FA7",
        fontFamily: "Montserrat", fontWeight: "600"
      }}>
        {portalLocales.greeting[lang]} {user.name}!
      </h1>
      
      <div className="portal-container">
        <Link to="/berlin">
          <button>{portalLocales.rooms[lang]}</button>
        </Link>
        <Link to="/maps">
          <button>{portalLocales.map[lang]}</button>
        </Link>
        <Link to="/addroom">
          {user.role === "senior" ? (
            <button id="create-room-button" type="submit">
              {portalLocales.add[lang]}
            </button>
          ) : null}
        </Link>

        {user.profile === undefined ? (
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

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user
  };
};

export default connect(mapStateToProps)(UserPortal);
