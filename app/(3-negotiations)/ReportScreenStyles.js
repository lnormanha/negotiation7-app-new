import styled from "styled-components/native";
import { Colors, Metrics, Fonts, ApplicationStyles } from "../../constants";

export const Container = styled.View`
  ${ApplicationStyles.screen.container};
`;

export const ContainerList = styled.View`
  flex: 1;
  width: ${Metrics.screenWidth - 40};
  align-self: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const TopMargin = styled.View`
  margin-bottom: 30px;
`;

export const InfoLabel = styled.Text`
  font-family: ${Fonts.type.bold};
  font-size: ${Fonts.size.medium};
  color: #1f394e;
  margin-left: 30px;
  margin-bottom: 6px;
`;

export const InfoAnswer = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: ${Fonts.size.regular};
  color: #1f394e;
  margin-left: 30px;
  margin-bottom: 6px;
`;

export const InfoMargin = styled.View`
  margin-bottom: 20px;
`;

export const TopicAnswersContainer = styled.View`
  height: auto;
  width: ${Metrics.screenWidth - 40};
  align-self: center;
  border-bottom-width: 0.5px;
  border-color: #03053b1a;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 20px;
`;

export const TopicHeader = styled.TouchableOpacity`
  width: ${Metrics.screenWidth - 40};
  height: 100px;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

export const TopicHeaderIcon = styled.Image.attrs(props => ({
  source: props.icon
}))`
  margin-right: 10px;
`;

export const TopicHeaderInfo = styled.View`
  justify-content: space-between;
  height: 40px;
  width: ${Metrics.screenWidth - 40};
`;

export const TopicHeaderTitle = styled.Text`
  font-family: ${Fonts.type.medium};
  font-size: ${Fonts.size.input};
  color: #1f394e;
`;

export const TopicHeaderQtyQuestion = styled.Text`
  font-size: 14px;
  font-family: ${Fonts.type.base};
  color: #1f394e99;
`;

export const TopicAnswersHeaders = styled.View`
  height: 38px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TopicAnswerHeader = styled.View`
  width: 49.8%;
  height: 38px;
  justify-content: center;
  background-color: ${props =>
    props.leftPos ? "#03053b1a" : "rgba(3, 5, 59, 0.2)"};
`;

export const TopicAnswerTitle = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: ${Fonts.size.input};
  color: #1f394e;
  margin-left: 20px;
`;

export const TopicAnswerContainer = styled.View`
  width: 50%;
  margin-top: 5px;
`;

export const TopicAnswerText = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: ${Fonts.size.input};
  color: #1f394eb3;
  margin-left: 20px;
`;

export const TradeCoinTitleContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #03053b1a;
  flex-direction: row;
  padding: 10px 0px 10px 0px;
`;

export const TradeCoinTitle = styled.Text`
  font-family: ${Fonts.type.medium};
  font-size: ${Fonts.size.input};
  color: #1f394e;
  width: 220px;
  margin-right: 10px;
`;

export const TradeCoinQuestionContainer = styled.View`
  width: 100%;
  justify-content: center;
  background-color: ${Colors.white};
  border-bottom-width: ${props => (!props.lastIndex ? 0.5 : 0)}px;
  border-color: #03053b1a;
  padding: 20px 20px 20px 20px;
  justify-content: center;
`;

export const TradeCoinQuestionLabel = styled.Text`
  font-family: ${Fonts.type.medium};
  font-size: ${Fonts.size.input};
  color: #03053b;
`;

export const TradeCoinQuestionAnswer = styled.Text`
  font-family: ${Fonts.type.medium};
  font-size: ${Fonts.size.input};
  color: #03053bb3;
`;

export const RemoveCoinButton = styled.TouchableOpacity`
  height: 30px;
  width: 80px;
  align-items: center;
  justify-content: center;
  background-color: #eaeef2;
  border-radius: 5px;
`;

export const RemoveCoinLabel = styled.Text`
  font-family: ${Fonts.type.bold};
  font-size: ${Fonts.size.input};
  color: ${Colors.fire};
`;
