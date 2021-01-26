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
