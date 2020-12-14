import styled from "styled-components";
import { Button } from "antd";

export const BodyDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

export const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;

export const NavigationDiv = styled.div`
  margin-bottom: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;
export const AppButton = styled(Button)`
  height: 50px;
  width: 50px;
`;

export const PageDiv = styled.div`
  color: whitesmoke;
  width: 50px;
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
`;
