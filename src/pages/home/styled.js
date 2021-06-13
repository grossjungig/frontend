import styled from "styled-components";
import youngOldPlaying from "../../assets/images/youngOldPlaying.jpg"

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

export const SecPanel = styled.div`
  background-image: url(${youngOldPlaying});
  height: 720px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 7rem 8rem;

  @media (max-width: 834px) {
    margin: 1rem;
    margin-bottom: 200px;
    height: 300px;
    background-size: cover;
  }

  @media (min-width: 1024px) {
    margin: 2rem 4rem 10rem;
    background-position: top;
    
  }
  @media (min-width: 768px) {
    height: 500px;
    
  }

  @media (min-width: 1060px) {
    padding: 10rem;
    height: 400px;
  }
`;

export const RowSelect = styled.div`
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