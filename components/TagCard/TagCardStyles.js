import styled from "styled-components/native";
import { Colors, Metrics, Fonts, Icons } from "../../constants";

export const Container = styled.TouchableOpacity`
  width: 190px;
  height: 55px;
  border-radius: 10px;
  background-color: ${props => (props.selected ? "#bdd6ff" : Colors.white)};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

export const Folder = styled.Image.attrs(props => ({
  source: Icons.folder,
  resizeMode: "contain"
}))`
  width: 50px;
  height: 50px;
  tint-color: #f9ad5a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
`;

export const Name = styled.Text`
  font-size: ${Fonts.size.input};
  font-family: ${Fonts.type.medium};
  color: ${Colors.title};
  width: 140px;
`;
