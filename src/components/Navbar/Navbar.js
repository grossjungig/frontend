import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import navbarLocales from "../../locales/locales.navbar.json";
import homeLocales from "../../locales/locales.home.json";
import { HashLink, PageLink } from "../styled";
import { connect } from 'react-redux';
import { logout } from '../../store/auth/actions'
import { useHistory } from 'react-router-dom';
import CookieConsent from '../CookieConsent';
import "./Navbar.css";

import NavBanner from "./NavBanner";



const Navbar = (props) => {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [lang, setLanguage] = useState("de")

  const imageChange = (updatePage) => {
    const language = localStorage.getItem("lang");
    if (language === "en") {
      localStorage.setItem("lang", "de");
      setLanguage("de")
    } else if (language === "de") {
      localStorage.setItem("lang", "en");
      setLanguage("en")

    }
    updatePage();  
  };

  // cc = Cookie Consent
  const [ ccDisplayed, setCcDisplayed ] = useState(false) 
  useEffect(() => {
    const ccConfirmed = localStorage.getItem('ccConfirmed')
    if (!ccConfirmed) setCcDisplayed(true);
  }, [])
  const confirmCc = () => {
    setCcDisplayed(false)
    localStorage.setItem('ccConfirmed', 'true');
  };

  const logout = (event) => {
    event.preventDefault();
    props.logout();
    history.push('/');
  };

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -60;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  const toggleNavbar = () => {
    setChecked(!checked);
  };

  return (
    <header>
      {ccDisplayed ? <CookieConsent clicked={confirmCc} />: null}
      <nav >
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
            
            { props.isAuth ? (
              <>
                <li onClick={toggleNavbar}>
                  <Link onClick={logout} to="/">
                    {navbarLocales.logout[lang]}
                  </Link>
                </li>
                <li>
                  <Link onClick={toggleNavbar} to="/userportal">
                    <button className="round-button profile">
                      <img src="/image/profile.png" alt="User Portal" />
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link onClick={toggleNavbar} to="/login">
                    <button className="white-button">
                      {navbarLocales.login[lang]}
                    </button>
                  </Link>
                </li>
                <li>
                  <Link onClick={toggleNavbar} to="/signup">
                    <button className="blue-button">
                      {navbarLocales.signup[lang]}
                    </button>
                  </Link>
                </li>
              </>
            )}
            <li>
              
                <button
                  className="round-button language-switch"
                  onClick={(e) => imageChange(props.updatePage)}
                  alt="Language Switcher"
                >
                  {lang === "de" ? "EN" : "DE"}
                </button>
              
            </li>
          </ul>
        <NavBanner />
      </nav>
    </header>
  );
};


const mapStateToProps = (reduxState) => {
  return {
    isAuth: !!reduxState.token
  };
};

const mapDispatchToProps = {
  logout: () => logout()
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
