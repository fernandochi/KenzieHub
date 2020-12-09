import styled from "styled-components";

export const MainPageLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #1e3a63;

  header {
      width: 100%;
      min-height: 10vh;
      height: 10%;
      display: flex;
      position: absolute;
      top: 0;
      background-color: #b4d2ba;       
  }

  footer {
    width: 100%;
    justify-content: space-around;
    flex-direction: row;
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    bottom: 0;
    margin: 8px;
  }
`;
