import styled from "styled-components/native";
import { Colors, Metrics, Fonts, ApplicationStyles } from "../../constants";

export const Container = styled.View`
  ${ApplicationStyles.screen.container};
`;
export const SectionTitle = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.bold};
  color: ${Colors.black};
  margin-left: 20px;
  margin-right: 20px;
`;

export const Separator = styled.View`
  margin: 10px 0px 10px 0px;
`;

export const SectionText = styled.Text`
  font-size: ${Fonts.size.regular};
  font-family: ${Fonts.type.medium};
  color: ${Colors.black};
  margin-left: 20px;
  margin-right: 20px;
`;
