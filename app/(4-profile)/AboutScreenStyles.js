import styled from "styled-components/native";
import { Colors, Metrics, Fonts, ApplicationStyles } from "../../constants";

export const Container = styled.View`
  ${ApplicationStyles.screen.container};
`;
export const Title = styled.Text`
  font-size: ${Fonts.size.h4};
  font-family: ${Fonts.type.medium};
  margin-left: 20px;
  margin-top: 20px;
`;

export const About = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: ${Fonts.size.input};
  color: #1f394e;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;

export const LearnMore = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.medium};
  margin-left: 20px;
  margin-top: 20px;
`;

export const LearnMoreLink = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.medium};
  color: #3366bb;
`;
