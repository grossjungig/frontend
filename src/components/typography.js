import styled, { css } from "styled-components";

export const h1CSS = css`
  font-family: "MuseoModerno";
  font-style: light;
  font-size: 1.5rem;
  /* height: 4.5rem; */
  color: #202020;
  @media screen and (min-width: 1060px) {
    font-size: 2.25rem;
  }
`;

export const H1 = styled.h1`
  ${h1CSS}
`;

export const h2CSS = css`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 2rem;
  color: ${props => props.titleColor || "#202020"};
  @media screen and (min-width: 1060px) {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2.04125rem;
  }
`;

export const H2 = styled.h2`
  ${h2CSS}
`;

export const h4CSS = css`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 250;
  font-size: 1rem;
  line-height: 2rem;
  color: #202020;
  @media screen and (min-width: 1060px) {
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.37125rem;
  }
`;

export const H4 = styled.h4`
  ${h4CSS}
`;

export const h3CSS = css`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 200;
  font-size: 1.5rem;
  line-height: 1.75rem;
  color: #202020;
  @media screen and (min-width: 1060px) {
    font-weight: 300;
    font-size: 2.25rem;
    line-height: 2.7425rem;
  }
`;

export const H3 = styled.h3`
  ${h3CSS}
`;
