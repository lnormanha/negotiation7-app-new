import styled from "styled-components/native";
import { Colors, Metrics, Fonts } from "../../constants";

export const Container = styled.View`
  width: ${Metrics.screenWidth / 1.2};
  height: ${Metrics.screenHeight / 3};
  background-color: ${Colors.white};
  border-radius: 10px;
  align-self: center;
  overflow: hidden;
`;

export const Title = styled.Text`
  font-size: ${Fonts.size.h5};
  font-family: ${Fonts.type.semi_bold};
  color: ${Colors.buttonBg};
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Message = styled.Text`
  font-size: ${Fonts.size.regular};
  font-family: ${Fonts.type.base};
  color: ${Colors.title};
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  width: ${Metrics.screenWidth / 1.2};
  height: 60px;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  width: ${Metrics.screenWidth / 1.2 / 2};
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.buttonBg};
`;

export const ButtonLabel = styled.Text`
  font-size: ${Fonts.size.regular};
  font-family: ${Fonts.type.medium};
  color: ${Colors.white};
  text-align: center;
`;
