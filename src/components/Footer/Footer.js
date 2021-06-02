import React from "react";
import { Link } from "react-router-dom";
import footerLocales from "../../locales/locales.footer.json";
import styles from "./footer.module.css"
import logo from "../../assets/logos/logo_white.svg"

const Footer = () => {
  const lang = localStorage.getItem("lang");
  return (
   <div className={styles["footer-container"]}>
     <div className={styles["logo-and-links-container"]}>
     <div className={styles["footer-links"]}>

{/* IMPORTANT!!!! Once the links in the footer are linked with existing pages, delete the lines with " eslint-disable-next-line jsx-a11y/anchor-is-valid
" */}
      <Link to='/aboutus'>{footerLocales.company[lang]}</Link>
      <Link to="/faq">FAQ</Link>
      <Link to='/contact'>{footerLocales.contact[lang]}</Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>{footerLocales.privacy[lang]}</a>
      <Link to="/impressum" > {footerLocales.impressum[lang]} </Link>
     </div>
     <div className={styles["footer-logo"]}>
     <img
              style={{ height: "34px" }}
              src={logo}
              alt="logo_image"
            />
     </div>
     </div>
     <div className={styles["footer-copyright"]}>
     <p>COPYRIGHT © {new Date().getFullYear()} Grossjungig AI</p>
     </div>

   </div>
  );
};


export default Footer;
