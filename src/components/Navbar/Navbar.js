import React, { useState } from "react";
import { Link } from "react-router-dom";
import navbarLocales from "../../locales/locales.navbar.json";
import homeLocales from "../../locales/locales.home.json";
import { HashLink, PageLink } from "../styled";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import { logout } from "../../store/auth/actions";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

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
  const history = useHistory();
  const [img, setImage] = useState("/image/german.png");
  const [checked, setChecked] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    props.logout();
    history.push("/");
  };

  const lang = localStorage.getItem("lang");

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -60;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  const toggleNavbar = () => {
    setChecked(!checked);
  };

  return (
    <nav>
      <header className="header">
        <HashLink smooth className="logo" to="/#">
          <img
            style={{ height: "34px" }}
            src="/image/Logo.png"
            alt="logo_image"
          />
        </HashLink>
        <input
          checked={checked}
          className="menu-btn"
          type="checkbox"
          id="menu-btn"
        />
        <label onClick={toggleNavbar} className="menu-icon" for="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li onClick={toggleNavbar}>
            <PageLink to="/aboutus">{homeLocales.about[lang]}</PageLink>
          </li>
          <li onClick={toggleNavbar}>
            <PageLink to="/how">{homeLocales.how[lang]}</PageLink>
          </li>
          <li onClick={toggleNavbar}>
            <HashLink scroll={scrollWithOffset} smooth to="/#community">
              {homeLocales.community[lang]}
            </HashLink>
          </li>
          <li onClick={toggleNavbar}>
            <HashLink scroll={scrollWithOffset} smooth to="/#contact">
              {homeLocales.contact[lang]}
            </HashLink>
          </li>
          {props.isAuth ? (
            <>
              <li onClick={toggleNavbar}>
                <Link onClick={logout} to="/">
                  {navbarLocales.logout[lang]}
                </Link>
              </li>
              <img onClick={imageChange} height="30px" src={img} alt="" />
              <li onClick={toggleNavbar}>
                <Link to="/userportal">
                  <img height="30px" src="/image/user.png" alt="User Portal" />
                </Link>
              </li>{" "}
            </>
          ) : (
            <>
              <li onClick={toggleNavbar}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100px",
                      backgroundColor: "#F9F8F8",
                      border: "1.5px solid #365FA7",
                      borderRadius: "16px",
                    }}
                    className="navbuttons"
                    variant="extended"
                  >
                    <p style={{ padding: "2,5px" }}>
                      {navbarLocales.login[lang]}
                    </p>
                  </button>
                </Link>
              </li>
              <li onClick={toggleNavbar}>
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
              </li>
              <li onClick={toggleNavbar}>
                <img
                  onClick={(e) => imageChange(props.updatePage, setImage)}
                  height="20px"
                  src={img}
                  alt="Language Switcher"
                />
              </li>
            </>
          )}
        </ul>
      </header>
    </nav>
    // </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    isAuth: !!reduxState.token,
  };
};

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
