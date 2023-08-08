import styled from "styled-components/native";
import { Colors, Metrics, Fonts, Icons } from "../../constants";

export const Button = styled.TouchableOpacity`
  align-self: center;
  background-color: #dddddd;
  height: 50;
  width: 200;
  border-radius: 5;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #005992;
`;

export const Input = styled.TextInput`
  height: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 80%;
  border-bottom-width: 1px;
  border-bottom-color: #ffff;
  color: #ffff;
  margin-left: 30px;
`;
export const Question = styled.Text`
  color: #fff;
  font-size: ${Fonts.size.h4};
  font-family: ${Fonts.type.base};
  margin: 0px 20px 0px 20px;
  margin-top: 20px;
`;
export const QuestionTip = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.base};
  color: #ffff;
  margin-left: 30px;
  margin-top: 10px;
`;
