import styled from "styled-components";

export const MainPageLayout = styled.div`
  min-height: 100vh;
  height: 100%;
  background-color: #1d3768;
  display: grid;
  grid-template-rows: 1fr auto;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6%;
    h1 {
      color: whitesmoke;
      font-size: 5rem;
    }
    div {
      width: 400px;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  footer {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: nowrap;
    bottom: 8px;
    margin: 8px;
  }
`;
