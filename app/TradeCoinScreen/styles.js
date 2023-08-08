import styled from "styled-components/native";

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
  margin-left: 10px;
`;

export const Question = styled.Text`
  margin-left: 20px;
  margin-top: 150px;
  font-size: 18px;
  font-weight: 500;
  color: #ffff;
`;
export const QuestionTip = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #ffff;
  margin-left: 30px;
  margin-top: 10px;
`;
export const Button = styled.TouchableOpacity`
  align-self: center;
  background-color: #dddddd;
  height: 50;
  width: 100;
  border-radius: 5;
  align-items: center;
  justify-content: center;
`;
