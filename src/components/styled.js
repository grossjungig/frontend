import styled, { css } from "styled-components";
import React from "react";
import { NavHashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";

export const basicButtonCSS = css`
  padding: 0.6rem 2rem;
  margin: 0.25rem;
  border-radius: 0.85rem;
`;
export const basicButtonLongCSS = css`
  padding: 0.65rem 6rem;
  margin: 0.25rem;
  border-radius: 0.85rem;
`;

export const basicButtonSearchCSS = css`
  padding: 0.6rem 2.5rem;
  margin: 0.25rem;
  border-radius: 0.85rem;
`;

export const submitButtons = css`
  margin-top: 3vh;
  border: none;
  padding: 10px;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 19px;
  background: #baafa1;
  border-radius: 1rem;
  color: #ffffff;
`;

export const SimpleButton = styled.button`
  ${basicButtonCSS};
  border: 1px solid grey;
  background-color: white;
`;

export const Button = ({ onClick, label }) => (
  <SimpleButton onClick={onClick}>{label}</SimpleButton>
);

export const PrimaryButton = styled.button`
  ${basicButtonCSS};
  background-color: #365da7;
  border-style: none;
`;

export const PrimaryButtonLong = styled.button`
  ${basicButtonLongCSS};
  background-color: #365da7;
  border-style: none;
`;

export const SecButton = styled.button`
  ${basicButtonCSS};
  border: 1px solid grey;
  background-color: black;
  color: white;
`;

export const SecButtonLong = styled.button`
  ${basicButtonLongCSS};
  border: 1px solid grey;
  background-color: black;
  color: white;
`;

// export const SearchField = styled.input`
//   ${basicButtonCSS};
//   border: 1px solid grey;
//   background-color: #f2f0f0;
// `;

// export const SearchFieldLong = styled.input`
//   ${basicButtonSearchCSS};
//   border: 1px solid grey;
//   background-color: white;
// `;

export const Card2 = ({ title, image, text, alt }) => (
  <Card2Root>
    <Card2Title>{title}</Card2Title>
    <img src={image} alt={alt} width="150px" />
    <Card2Text>{text}</Card2Text>
  </Card2Root>
);

export const Card3 = ({ text, source }) => (
  <Card3Root>
    <Card3Text>{text}</Card3Text>
    <Card3Source>{source}</Card3Source>
  </Card3Root>
);

export const HashLink = styled(NavHashLink)`
  text-decoration: none;
  font-size: 15px;
  color: black;
  margin: auto;
  padding: 0rem 1rem;
`;
export const PageLink = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  color: black;
  margin: auto;
  padding: 0rem 1rem;
`;

const Card2Root = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 0.5px solid #baafa1;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 0.15rem;
  margin: 1rem; 
  align-items: center;
  box-sizing: border-box;
  height: 20rem;
  width: 18rem;
  min-height: 20rem;
  min-width: 18rem;


  /*For tablet*/
  @media (min-width: 768px) {
    max-width: 250px;
  }

  /*For desktop*/
  @media (min-width: 1060px) {
    flex-direction: column;
    background: #ffffff;
    border: 0.5px solid #baafa1;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 0.5rem;
    max-width: 300px;
    min-width: 250px;
  }
`;

const Card2Title = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 2.7425rem;
  display: flex;
  align-items: center;
  text-align: center;
  border: 2px solid;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #365da7;
  /* white */
  color: #f9f8f8;
  /* neun */
  margin-left: auto;
  margin-right: auto;
`;

const Card2Text = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  margin: 0.5rem;

  /* #202020 */

  color: #202020;
`;

const Card3Root = styled.div`
  position: relative;
  background: #ffffff;
  border: 0.2px solid #baafa1;
  box-sizing: border-box;
  border-radius: 24px;
  height: 240px;
  width: 560px;
  padding: 1rem 1.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15),
    -2px -2px 8px rgba(255, 255, 255, 0.15);
  padding: 0.5rem;
  top: 87%;
  left: -9%;
  padding: 2rem;
  margin-top: 4rem;

  @media (max-width: 834px) {
    top: 87%;
    left: 0%;
    width: 100%;
    height: 150px;
  }
`;

const Card3Text = styled.div`
  font-style: normal;
  text-align: justify;
  color: #202020;
  font-weight: 600;
  @media (max-width: 834px) {
    font-size: 18px;
  }
  @media (min-width: 834px) {
    font-style: normal;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    color: rgb(32, 32, 32);
    margin-top: 1.5rem;
  }
`;

const Card3Source = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  /* identical to box height */
  text-align: center;
  /* #202020 */
  color: #202020;
  position: absolute;
  right: 1rem;

  /*for  tablet*/
  @media (min-width: 768px) {
    font-size: 16px;
    right: 2rem;
  }

  /* for desktop*/
  @media (min-width: 1060px) {
    font-size: 18px;
    position: static;
    text-align: right;
    padding-top: 1.5rem;
  }
`;
