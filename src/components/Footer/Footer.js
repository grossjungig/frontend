import React from "react";
// import styled from "styled-components";
import { Link } from "react-router-dom";
import footerLocales from "../../locales/locales.footer.json";

const Footer = () => {
  const lang = localStorage.getItem("lang");
  return (
    <div>      
      <div>
        <Link>{footerLocales.company[lang]}</Link>
        <Link>{footerLocales.contact[lang]}</Link>
        <Link>FAQ</Link>
        <Link>{footerLocales.privacy[lang]}</Link>
        <Link to="/impressum" >
          {footerLocales.impressum[lang]}
        </Link>
      </div>
      <div>        
        <img
          style={{ height: "34px" }}
          src="/image/Frame.png"
          alt="logo_image"
        />
      </div>
      <div>
        <span>COPYRIGHT</span>
        <img src="../image/copyright.png" alt="copyright" />
        <span>{new Date().getFullYear()} Grossjungig AI</span>
      </div>
    </div>
  );
};

export default Footer;

// const Root = styled.div`
//   display: flex;
//   flex-basis: 100%;
//   flex-wrap: wrap;
//   flex-direction: column;
//   /* width: 375px;
//   height: 200px; */
//   padding-top: 2rem;
//   padding-bottom: 5rem;
//   background-color: #365da7;
//   color: white;
//   /*Media queries Desktop*/
//   @media (min-width: 1060px) {
//     display: flex;
//     flex-direction: row;
//     flex-wrap: nowrap;
//     padding: 2rem 0.5rem;
//     color: white;
//     margin-left: auto;
//     margin-right: auto;
//   }
// `;

// const MainPanel = styled.div`
//   display: flex;
//   flex-basis: 100%;
//   flex-direction: column;
//   justify-content: center;
//   align-content: center;
//   align-items: center;
//   /*Media quries Desktop*/
//   @media (min-width: 1060px) {
//     display: flex;
//     flex-direction: column;
//     place-content: center;
//     align-items: center;
//     margin-left: auto;
//     margin-right: auto;
//   }
// `;

// const Row = styled.div`
//   display: flex;
//   justify-content: center;
//   align-content: center;
//   align-items: center;
// `;

// // const SocialPanel = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   padding-right: 3rem;
// //   padding-left: 3rem;
// //   padding-top: 1rem;
// // `;

// // const FooterLink = styled.a`
// //   text-decoration: none;
// //   font-style: normal;
// //   font-weight: 500;
// //   font-size: 16px;
// //   color: #f9f8f8;
// //   padding: 0.25rem 0.25rem;
// // `;

// const FooterLinkSmall = styled.div`
//   display: flex;
//   justify-content: space-around;
//   font-family: "Montserrat";
//   text-decoration: none;
//   font-style: normal;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 23.7px;
//   color: #f9f8f8;
//   padding: 0.25rem 0.2rem;
//   margin-left: 0.5rem;
//   margin-right: 0.5rem;
// `;

// const FooterBig = styled.p`
//   text-decoration: none;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 18px;
//   color: #f9f8f8;
//   padding: 0.25rem 0.2rem;
// `;

// const FooterSmall = styled.div`
//   font-style: normal;
//   font-weight: 400;
//   font-size: 12px;
//   color: #f9f8f8;
//   padding: 0.25rem 0.2rem;
// `;
