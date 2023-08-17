import styled from "styled-components/native";
import {
  Colors,
  Metrics,
  Fonts,
  ApplicationStyles,
  Icons
} from "../../constants";

export const Container = styled.View`
  ${ApplicationStyles.screen.container};
`;
export const Text = styled.Text`
  font-size: ${Fonts.size.h4};
  font-family: ${Fonts.type.medium};
  text-align: center;
`;

export const LanguageItem = styled.TouchableOpacity`
  width: ${Metrics.screenWidth};
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: ${Colors.headerBg};
`;

export const LanguageLabel = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.medium};
  color: ${Colors.title};
  margin-left: 30px;
`;

export const CheckIcon = styled.Image.attrs(props => ({
  source: Icons.check,
  resizeMode: "contain"
}))`
  height: 30px;
  width: 30px;
  margin-right: 30px;
`;
