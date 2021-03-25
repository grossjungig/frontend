import React, { useState } from "react";
import { Link } from "react-router-dom";
import navbarLocales from "../../locales/locales.navbar.json";
import homeLocales from "../../locales/locales.home.json";
import { HashLink, PageLink } from "../styled";
import { connect } from "react-redux";
import { logout } from "../../store/auth/actions";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

const imageChange = (updatePage) => {
  const lang = localStorage.getItem("lang");
  if (lang === "en") {
    localStorage.setItem("lang", "de");
  } else if (lang === "de") {
    localStorage.setItem("lang", "en");
  }
  updatePage();
};

const Navbar = (props) => {
  const history = useHistory();
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
          readOnly
          checked={checked}
          className="menu-btn"
          type="checkbox"
          id="menu-btn"
        />
        <label onClick={toggleNavbar} className="menu-icon" htmlFor="menu-btn">
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
              <li onClick={toggleNavbar}>
                <Link to="/userportal">
                  <button className="round-button profile">
                    <img src="/image/profile.png" alt="User Portal" />
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li onClick={toggleNavbar}>
                <Link to="/login">
                  <button className="white-button">
                    {navbarLocales.login[lang]}
                  </button>
                </Link>
              </li>
              <li onClick={toggleNavbar}>
                <Link to="/signup">
                  <button className="blue-button">
                    {navbarLocales.signup[lang]}
                  </button>
                </Link>
              </li>
            </>
          )}
          <li onClick={toggleNavbar}>
            <a>
              <button
                className="round-button language-switch"
                onClick={(e) => imageChange(props.updatePage)}
                alt="Language Switcher"
              >
                {lang == "de" ? "EN" : "DE"}
              </button>
            </a>
          </li>
        </ul>
      </header>
    </nav>
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
