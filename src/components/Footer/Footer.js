import React from "react";
import { Link } from "react-router-dom";
import footerLocales from "../../locales/locales.footer.json";
import "./footer.css"
import logo from "../../assets/logos/logo_white.svg"

const Footer = () => {
  const lang = localStorage.getItem("lang");
  return (
   <div className="footer-container">
     <div className="logo-and-links-container">
     <div className="footer-links">

{/* IMPORTANT!!!! Once the links in the footer are linked with existing pages delete the lines with " eslint-disable-next-line jsx-a11y/anchor-is-valid
" */}

{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
     <a>{footerLocales.company[lang]}</a>
     {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>{footerLocales.contact[lang]}</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>FAQ</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>{footerLocales.privacy[lang]}</a>
          <Link to="/impressum" >
           {footerLocales.impressum[lang]}
         </Link>
     </div>
     <div className="footer-logo">
     <img
              style={{ height: "34px" }}
              src={logo}
              alt="logo_image"
            />
     </div>
     </div>
     <div className="footer-copyright">
     <p>COPYRIGHT © {new Date().getFullYear()} Grossjungig AI</p>
     </div>

   </div>
  );
};


export default Footer;

