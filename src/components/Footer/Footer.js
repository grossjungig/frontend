import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import footerLocales from "../../locales/locales.footer.json";

const Footer = () => {
  const lang = localStorage.getItem("lang");
  return (
    <Root>
      {/* <ContactPanel>
        <p>Großjungig AI</p>
        <p>Bruchwitzstraße 13</p>
        <p>12247 Berlin</p>
      </ContactPanel> */}
      <MainPanel>
        {/* <Row>
          <FooterLink> About </FooterLink>
          <FooterLink>How does it work </FooterLink>
          <FooterLink>Newsletter </FooterLink>
          <FooterLink>Community</FooterLink>
        </Row> */}
        <Row>
          <FooterLinkSmall>{footerLocales.company[lang]}</FooterLinkSmall>
          <FooterLinkSmall>{footerLocales.contact[lang]}</FooterLinkSmall>
          <FooterLinkSmall>FAQ</FooterLinkSmall>
          <FooterLinkSmall>{footerLocales.privacy[lang]}</FooterLinkSmall>
          <Link to="/impressum" >
            <FooterLinkSmall>{footerLocales.impressum[lang]}</FooterLinkSmall>
          </Link>
        </Row>
        {/* <Row>
          <SocialPanel>
            <img src="../image/facebook.png" alt="facebook" />
            <img src="../image/instagram.png" alt="instagram" />
            <img src="../image/Twitter.png" alt="twitter" />
          </SocialPanel>
        </Row> */}
        <Row>
          <FooterBig>
            <img
              style={{ height: "34px" }}
              src="/image/Frame.png"
              alt="logo_image"
            />
          </FooterBig>
        </Row>
        <Row>
          <FooterSmall>COPYRIGHT</FooterSmall>
          <img src="../image/copyright.png" alt="copyright" />
          <FooterSmall>{new Date().getFullYear()} Grossjungig AI</FooterSmall>
        </Row>
      </MainPanel>
    </Root>
  );
};

export default Footer;

const Root = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  /* width: 375px;
  height: 200px; */
  padding-top: 2rem;
  padding-bottom: 5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: #365da7;
  color: white;
  /*Media queries Desktop*/
  @media (min-width: 1060px) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 2rem 0.5rem;
    color: white;
    margin-left: auto;
    margin-right: auto;
  }
`;

const MainPanel = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  /*Media quries Desktop*/
  @media (min-width: 1060px) {
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

// const SocialPanel = styled.div`
//   display: flex;
//   justify-content: center;
//   padding-right: 3rem;
//   padding-left: 3rem;
//   padding-top: 1rem;
// `;

// const FooterLink = styled.a`
//   text-decoration: none;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 16px;
//   color: #f9f8f8;
//   padding: 0.25rem 0.25rem;
// `;

const FooterLinkSmall = styled.a`
  display: flex;
  justify-content: space-around;
  font-family: "Montserrat";
  text-decoration: none;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23.7px;
  color: #f9f8f8;
  padding: 0.25rem 0.2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const FooterBig = styled.p`
  text-decoration: none;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #f9f8f8;
  padding: 0.25rem 0.2rem;
`;

const FooterSmall = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #f9f8f8;
  padding: 0.25rem 0.2rem;
`;
