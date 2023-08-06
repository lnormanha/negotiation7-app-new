import styled from "styled-components/native";
import { Colors, Metrics, Fonts, Icons } from "../../constants";

export const Container = styled.TouchableOpacity`
  flex-direction: row;

  height: 60px;
  width: ${Metrics.screenWidth - 40}px;
  background-color: ${Colors.facebook};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const Label = styled.Text`
  font-size: ${Fonts.size.input};
  color: ${Colors.white};
  font-family: ${Fonts.type.medium};
  text-align: center;
  align-self: center;
`;

export const Icon = styled.Image.attrs(props => ({
  source: Icons.fb
}))`
  height: 50px;
  width: 50px;
  tint-color: ${Colors.white};
  position: absolute;
  left: 10px;
`;
