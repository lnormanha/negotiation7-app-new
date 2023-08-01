import styled from "styled-components/native";
import { Colors, Metrics, Fonts, Icons } from "../../constants";

export const InputContainer = styled.View`
  height: 70px;
  width: ${Metrics.screenWidth - 60};
  align-self: center;
  overflow: hidden;
`;

export const InputLabel = styled.Text`
  font-family: ${Fonts.type.medium};
  font-size: ${Fonts.size.input};
  color: ${(props) => (props.focused ? "#1f394e" : "#5E717F")};
  margin-bottom: 6px;
`;

export const InputText = styled.TextInput`
  width: ${Metrics.screenWidth - 60};
  height: 40px;
  color: ${(props) => (props.focused ? "#1f394e" : "#5E717F")};
  border-bottom-width: 2px;
  border-color: #e0e3e5;
  font-size: ${Fonts.size.regular};
`;
