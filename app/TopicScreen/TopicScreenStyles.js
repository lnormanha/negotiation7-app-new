import styled from "styled-components/native";
import { Colors, Metrics, Fonts, ApplicationStyles } from "../../constants";

import * as Animatable from "react-native-animatable";

export const Container = styled.View`
  ${ApplicationStyles.screen.container};
  background-color: ${Colors.background};
`;

export const QuestionsContainer = styled.View`
  background-color: ${Colors.background};
`;

export const AskCoinContainer = styled.View`
  flex: 1;
`;

export const TopMargin = styled.View`
  margin-bottom: 30px;
`;
export const Text = styled.Text`
  font-size: ${Fonts.size.h4};
  font-family: ${Fonts.type.medium};
  text-align: center;
`;

export const TopicSliderArea = styled.View`
  background-color: ${Colors.headerBg};
  height: 53px;
  width: ${Metrics.screenWidth};
  z-index: 9;
`;

export const TopicItem = styled.TouchableOpacity`
  height: 37px;
  width: ${Metrics.screenWidth / 3};
  justify-content: space-between;
`;

export const TopicText = styled.Text`
  font-size: 12px;
  font-family: ${(props) =>
    props.selected ? Fonts.type.medium : Fonts.type.base};
  text-align: center;
  color: #1f394e;
  align-self: center;
`;

export const TopicBottom = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Point = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${Colors.white};
  border-width: 1px;
  border-color: #1f394e;
  border-radius: ${10 / 2};
  background-color: ${(props) =>
    props.completed ? "#22BC28" : props.selected ? "#1f394e" : "#FFF"};
`;

export const TopicLine = styled.View`
  width: ${Metrics.screenWidth / 3 / 2 - 5};
  height: 2px;
  background-color: ${(props) => (props.show ? "#1f394e" : "#E0E3E5")};
`;

export const QuestionContainer = styled(Animatable.View)`
  width: ${Metrics.screenWidth - 40};
  align-self: center;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const QuestionLabel = styled.Text`
  font-family: ${Fonts.type.bold};
  font-size: ${Fonts.size.input};
  color: #1f394e;
  margin-left: ${(props) => (props.isCoin ? 20 : 0)};
`;

export const QuestionDesc = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: ${Fonts.size.regular};
  color: #1f394e;
  margin-top: 10px;
`;

export const QuestionInput = styled.TextInput`
  width: 100%;
  min-height: 46px;
  border-bottom-width: 2px;
  border-color: #1f394e;
  font-size: ${Fonts.size.regular};
  padding-top: 15;
`;

export const FlexAlign = styled.View`
  flex: 1;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  width: ${Metrics.screenWidth - 30};
  align-items: center;
  justify-content: space-between;
  align-self: center;
`;

export const BottomMargin = styled.View`
  margin-bottom: 30px;
`;

export const BottomContainer = styled.View`
  height: 120px;
  width: ${Metrics.screenWidth}px;
  background-color: ${Colors.background};
  ${(props) => props.showShadow && `box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2)`}
  align-items: center;
  justify-content: center;
`;

export const TutorialTitle = styled.Text`
  font-family: ${Fonts.type.bold};
  font-size: ${Fonts.size.h5};
  color: #1f394e;
  margin-left: 20px;
  margin-bottom: 35px;
`;

export const TutorialDescription = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: ${Fonts.size.input};
  color: #1f394e;
  margin-left: 20px;
  margin-right: 20px;

  text-align: justify;
`;
