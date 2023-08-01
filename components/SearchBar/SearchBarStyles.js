import styled from "styled-components/native";
import { Colors, Metrics, Fonts, Icons } from "../../constants";

export const Container = styled.View`
  display: flex;
  width: 330px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -25px;
  align-self: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 2px gray;
`;

export const Icon = styled.Image.attrs(props => ({
  source: Icons.search
}))`
  width: 20px;
  height: 20px;
  margin-left: 20px;
`;

export const SearchBar = styled.TextInput`
  width: 300px;
  height: 50px;
  font-size: 16px;
  padding-left: 10px;
`;
