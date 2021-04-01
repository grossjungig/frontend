import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import portalLocales from "../../locales/locales.portal.json";
import { connect } from "react-redux";

const UserPortal = (props) => {
  const lang = localStorage.getItem("lang");
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    setUser((prev) => {
      if (props.fetchedUser) return props.fetchedUser;
      return prev;
    });
  }, [props.fetchedUser]);

  let renderedLinks;
  if (user.role === "senior") {
    renderedLinks = <Link to="/addroom">
      <button id="create-room-button" type="submit">
        {portalLocales.add[lang]}
      </button>
    </Link>;
  } else {
    // role = junior
    if (!user.profile) {
      renderedLinks = <Link to="/addprofile">
        <div style={{alignItems: "center"}}>
          <button id="create-room-button" type="submit">
            {portalLocales.profile[lang]}
          </button>
        </div>
      </Link>;
    } else {
      renderedLinks = <Link to={`profile/${user.profile}`}>
        <button id="create-room-button" type="submit">
          {portalLocales.profile2[lang]}{" "}
        </button>
      </Link>;
    }
  }

  return (
    <div className="portal-container" style={{ textAlign: "center" }}>
      <h1
        style={{
          color: "#365FA7",
          fontFamily: "Montserrat",
          fontWeight: "600",
        }}
      >
        {portalLocales.greeting[lang]} {user.name}!
      </h1>

      <div className="portal-container">
        <Link to="/berlin">
          <button>{portalLocales.rooms[lang]}</button>
        </Link>
        <Link to="/maps">
          <button>{portalLocales.map[lang]}</button>
        </Link>
        {renderedLinks}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    fetchedUser: reduxState.user,
  };
};

export default connect(mapStateToProps)(UserPortal);
