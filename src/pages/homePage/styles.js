import styled from "styled-components";

export const MainPageLayout = styled.div`
  box-sizing: border-box;
  min-height: 85vh;
  background-color: #1d3768;
  display: grid;
  grid-template-rows: 1fr auto;
  padding-bottom: 30px;

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
  @media only screen and (max-width: 375px) {
    footer {
      margin-top: 8px;
    }
  }
`;
