import styled from "styled-components";

export const MainPageLayout = styled.div`
  min-height: 100vh;
  /* height: 100%; */
  background-color: #1d3768;
  display: grid;
  grid-template-rows: 1fr auto;

  div {
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6%;
    h1 {
      color: whitesmoke;
      font-size: 3.5rem;
    }
    div {
      width: 400px;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  footer {
    max-width: 100vw;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: nowrap;
    bottom: 8px;
    margin: 8px 0;
    @media only screen and (max-width: 375px) {
      .ant-btn {
        width: 120px;
        font-size: 12px;
      }
    }
  }
`;
