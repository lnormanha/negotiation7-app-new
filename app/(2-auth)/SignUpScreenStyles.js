import styled from "styled-components/native";
import { Colors, Metrics, Fonts, ApplicationStyles } from "../../constants";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Button = styled.TouchableOpacity`
  align-self: center;
  background-color: #fff;
  height: 50;
  margin-top: 50px;
  width: 200;
  border-radius: 5;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-top: 30px;
  font-size: 20px;
  font-weight: 500;
  color: #000;
  text-align: center;
`;

export const InputContainer = styled.View`
  height: 90px;
  width: ${Metrics.screenWidth - 40};
  align-self: center;
  overflow: hidden;
`;

export const InputLabel = styled.Text`
  font-family: ${Fonts.type.bold};
  font-size: ${Fonts.size.medium};
  color: #1f394e;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 46px;
  border-bottom-width: 2px;
  border-color: #1f394e;
`;

export const Box = styled.View`
  flex: 0.4;
`;

export const AlignCenter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
