import React from "react";
import styled from "styled-components";

export const MainPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    -4px -4px 8px rgba(255, 255, 255, 0.15);
  background-color: rgba(249, 248, 248, 0.8);
  margin: 3rem;
  padding: 0.2rem;

  /* Media Queries: Tablet */
  @media screen and (min-width: 768px) {
    padding: 1.5rem;
  }
  /* Media Queries: Desktop */
  @media screen and (min-width: 1060px) {
    margin: 8rem;
    padding: 3rem;
  }
`;

export const Paragraph = styled.p`
  max-width: 605px;
  font-size: 16px;
  line-height: 141.4%;
  text-align: center;
  padding: 30px 0;
`;

export const Icon = ({ image, alt }) => (
  <IconContainer>
    <img src={image} alt={alt} width="120px" height="auto" />
  </IconContainer>
);

const IconContainer = styled.div`
  padding: 30px 0;
`;

export const TeamItem = ({ image, name, role, height, color }) => (
  <ItemContainer>
    <img src={image} alt={`${name} - ${role}`} height={height} width="auto" />
    <p style={{ fontWeight: 600, color: color, margin: "24px 0 10px" }}>
      {name}
    </p>
    <p style={{ fontWeight: 400, color: "#E9615B", marginTop: 0 }}>{role}</p>
  </ItemContainer>
);

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 160px;
  /* max-width: 200px; */
`;
