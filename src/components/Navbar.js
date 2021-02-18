import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import navbarLocales from "../locales/locales.navbar.json";
import homeLocales from "../locales/locales.home.json";
//import Logo from "./Logo";
import { NavbarLink } from "./styled";

import Fab from "@material-ui/core/Fab";
//styles for new navbar-don'te delete
//import "./Navbar.css";

const imageChange = (updatePage, setImage) => {
  //console.log("imagechange", localStorage.getItem("lang"));
  const lang = localStorage.getItem("lang");
  //console.log("LANG", lang);
  if (lang === "en") {
    setImage("/image/english.png");
    localStorage.setItem("lang", "de");
  } else if (lang === "de") {
    setImage("/image/german.png");
    localStorage.setItem("lang", "en");
  }
  updatePage();
  //This is coming from App.js
};

const Navbar = (props) => {
  const [img, setImage] = useState("/image/german.png");

  // TODO:refactor this and get rid of update page (we will refactor to global state)
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
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}

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
        <Link class="logo-box" to="/">
          <img
            style={{ height: "34px" }}
            src="/image/Logo.png"
            alt="logo_image"
          />
        </Link>
        <div className="main-nav">
          <div className="navbarlink">
            <NavbarLink scroll={scrollWithOffset} smooth to="/#about">
              {homeLocales.about[lang]}
            </NavbarLink>
            <NavbarLink scroll={scrollWithOffset} smooth to="/#how-it-works">
              {homeLocales.how[lang]}
            </NavbarLink>
            <NavbarLink scroll={scrollWithOffset} smooth to="/#community">
              {homeLocales.community[lang]}
            </NavbarLink>
            <NavbarLink scroll={scrollWithOffset} smooth to="/#contact">
              {homeLocales.contact[lang]}
            </NavbarLink>
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

//new navbar
/* <nav>
<header className="header">
  <Link to="/">
    <img
      style={{ height: "34px", margin: "5px" }}
      src="/image/Logo.png"
      alt="logo_image"
    />
  </Link>

  <input className="menu-btn" type="checkbox" id="menu-btn" />
  <label className="menu-icon" for="menu-btn">
    <span className="navicon"></span>
  </label>
  <ul className="menu">
    <li>
      <Link href="/#about">{homeLocales.about[lang]}</Link>
    </li>
    <li>
      <Link href="/#how-it-works">{homeLocales.how[lang]}</Link>
    </li>
    <li>
      <Link href="/#community">{homeLocales.community[lang]}</Link>
    </li>
    <li>
      <Link href="/#contact">{homeLocales.contact[lang]}</Link>
    </li>
  </ul>
</header>
</nav> */
