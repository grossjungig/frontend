import styled from "styled-components";

export const MainPanel = styled.div`
  display: flex;

  align-content: center;
  align-items: center;
  border-radius: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    -4px -4px 8px rgba(255, 255, 255, 0.15);
  background-color: white;
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
export const MainRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SecPanel = styled.div`
  background-image: url("./image/playstation.jpg");
  height: 720px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 7rem 8rem;

  @media (max-width: 834px) {
    margin: 1rem 1rem;
  }

  @media (min-width: 834px) {
    /* height: 400px; */
    padding: 6rem;

  }

  @media (min-width: 1060px) {
    padding: 10rem;
  }
`;

export const RowChoose = styled.div`
  display: flex;
  padding: 0.15rem 0.5rem;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const RowSelect = styled.div`
  display: flex;
  padding: 0.15rem;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const RowSearch = styled.div`
  display: flex;
  padding: 0.15rem;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const Mission = styled.div`
  text-align: center;
  padding: 1rem;
  font-style: normal;
  font-size: 1rem;
`;

export const How = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.backgroundColor || "#365FA7"};
  padding: 2rem 0;
  /* Media Queries: Tablet Portrait */
  @media screen and (min-width: 768px) {
  }
  /* Media Queries: Desktop */
  @media screen and (min-width: 1060px) {
    justify-content: space-between;
  }
`;


export const HowFlex = styled.div`
  display: flex;
  justify-content: space-evenly;
  overflow-x: scroll;
  -ms-overflow-style: none;  /* remove scrollbar in IE and Edge */
  scrollbar-width: none;  /* remove scrollbar in Firefox */
  /* margin-top: 1.5rem; */
  margin: 0 8rem;
  /* Media Queries: Tablet Portrait */

  @media screen and (max-width: 1300px) {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    justify-content: flex-start;
  }
`;

