import styled from "styled-components/native";
import { Colors, Metrics, Fonts } from "../../constants";

export const Container = styled.View`
  height: 50px;
  width: ${Metrics.screenWidth - 40};
  align-self: center;
  margin-top: 10px;
`;

export const InputContainer = styled.View`
  height: 55px;
  width: ${Metrics.screenWidth - 40};
  align-self: center;
  border-radius: 4px;
  border-color: #0a10ba;
  border-width: 1px;
`;

export const LabelArea = styled.View`
  background-color: ${Colors.white};
  position: absolute;
  top: -20px;
  z-index: 99;
  left: 8px;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 4px;
  padding-bottom: 4px;

  border-radius: 4px;
  border-color: #0a10ba;
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  font-family: ${Fonts.type.medium};
  font-size: 16px;
  color: ${(props) => (props.focused ? "#0A10BA" : "#0A10BA")};
`;

export const InputText = styled.TextInput`
  width: ${Metrics.screenWidth - 40};
  height: 55px;
  color: ${(props) => (props.focused ? "#0A10BA" : "#5E717F")};
  border-bottom-width: 2px;
  border-color: transparent;
  padding-left: 10px;
  padding-right: 10px;
  font-family: ${Fonts.type.medium};
`;
