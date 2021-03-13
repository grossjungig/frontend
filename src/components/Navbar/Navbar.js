import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import navbarLocales from "../../locales/locales.navbar.json";
import homeLocales from "../../locales/locales.home.json";
import { HashLink, PageLink } from "../styled";

import Fab from "@material-ui/core/Fab";

const imageChange = (updatePage, setImage) => {
  const lang = localStorage.getItem("lang");
  if (lang === "en") {
    setImage("/image/english.png");
    localStorage.setItem("lang", "de");
  } else if (lang === "de") {
    setImage("/image/german.png");
    localStorage.setItem("lang", "en");
  }
  updatePage();
};

const Navbar = (props) => {
  const [img, setImage] = useState("/image/german.png");

  const logout = (e) => {
    console.log(e);
    axios
      .delete(`${process.env.REACT_APP_BACKENDURL}api/auth/logout`)
      .then(() => {
        props.setUser(null);
      });
  };

  const lang = localStorage.getItem("lang");

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -60;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <div
      style={{
        width: "100%",
        position: "sticky",
        top: "0px",
        background: "white",
        zIndex: 2,
      }}
    >
      <nav>
        <HashLink smooth className="logo-box" to="/#">
          <img
            style={{ height: "34px" }}
            src="/image/Logo.png"
            alt="logo_image"
          />
        </HashLink>
        <div className="main-nav">
          <div className="navbarlink">
            <PageLink to="/aboutus">{homeLocales.about[lang]}</PageLink>
            <PageLink to="/how">{homeLocales.how[lang]}</PageLink>
            <HashLink scroll={scrollWithOffset} smooth to="/#community">
              {homeLocales.community[lang]}
            </HashLink>
            <HashLink scroll={scrollWithOffset} smooth to="/#contact">
              {homeLocales.contact[lang]}
            </HashLink>
          </div>
        </div>
        {props.user ? (
          <div className="login-nav">
            <Link onClick={logout} to="/">
              {navbarLocales.logout[lang]}
            </Link>
            <img onClick={imageChange} height="30px" src={img} alt="" />
            <Link to="/userportal">
              <img height="30px" src="/image/user.png" alt="User Portal" />
            </Link>
          </div>
        ) : (
          <div className="login-nav">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Fab
                style={{ backgroundColor: "white", color: "#365da7" }}
                className="navbuttons"
                variant="extended"
              >
                {navbarLocales.login[lang]}
              </Fab>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Fab
                style={{
                  margin: "5px",
                  color: "white",
                  backgroundColor: "#365da7",
                }}
                variant="extended"
              >
                {navbarLocales.signup[lang]}
              </Fab>
            </Link>
            <img
              onClick={(e) => imageChange(props.updatePage, setImage)}
              height="20px"
              src={img}
              alt="Language Switcher"
            />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
