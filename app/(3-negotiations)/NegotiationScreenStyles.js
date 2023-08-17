import styled from "styled-components/native";
import {
  Colors,
  Metrics,
  Fonts,
  ApplicationStyles,
  Icons,
  Images,
} from "../../constants";

export const Container = styled.View`
  ${ApplicationStyles.screen.container};
  align-items: center;
  background-color: #fca542;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  background-color: #f6f6f6;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

export const ContainerList = styled.View`
  flex: 1;
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

export const Text = styled.Text`
  font-size: ${Fonts.size.h4};
  font-family: ${Fonts.type.medium};
  text-align: center;
`;

export const NegotiationProgressContainer = styled.View`
  width: ${Metrics.screenWidth - 50};
  background-color: #fff;
  border-radius: 10px;
  height: 10px;
  border-color: #000;
  border-width: 1px;
  overflow: hidden;
`;

export const NegotiationProgressBar = styled.View`
  width: ${(props) => `${props.progress}%` || "0%"};
  background-color: ${(props) =>
    props.progress == 100 ? "#22BC28" : "#0A10BA"};
  border-radius: 2px;
  height: 10px;
`;

export const TopicContainer = styled.TouchableOpacity`
  width: ${Metrics.screenWidth - 50};
  height: 100px;
  background-color: #ffffff;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1px 0px 1px 0px;
  align-self: center;
  border-bottom-width: ${(props) => (props.border ? 2 : 0)};
  border-color: #f6f6f6;
`;

export const TopicInfoContent = styled.View`
  height: 40px;
  width: 210px;
`;

export const TopicIcon = styled.Image.attrs((props) => ({
  source: props.icon,
}))`
  width: 40px;
  height: 40px;
  margin-left: 15px;
  resize-mode: contain;
`;

export const TopicTitle = styled.Text`
  font-size: 18px;
  color: #1f394e;
  font-family: ${Fonts.type.medium};
  margin-left: 10px;
`;

export const TopicQtyQuestion = styled.Text`
  font-size: 14px;
  font-family: ${Fonts.type.base};
  color: #1f394e99;
  margin-left: 10px;
`;

export const ArrowArea = styled.View`
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 35px;
  border-color: white;
  margin-right: 25px;
  align-items: center;
  align-self: center;
  justify-content: center;
  box-shadow: 0px 10px 20px rgba(31, 57, 78, 0.16);
`;

export const Arrow = styled.Image.attrs((props) => ({
  source: Icons.rightArrow,
  resizeMode: "contain",
}))`
  width: 20px;
  height: 18px;
  margin-right: 15px;
`;

export const InfoIconsArea = styled.View`
  flex-direction: row;
  width: ${Metrics.screenWidth};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const InfoIconsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export const InfoIconsText = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: 14px;
  color: #1f394e80;
`;

export const InfoIcon = styled.Image.attrs((props) => ({
  source: props.image,
  resizeMode: "contain",
}))`
  width: 15px;
  height: 20px;
  margin-right: 5px;
`;

export const InfoTitleArea = styled.View`
  flex-direction: row;
  width: ${Metrics.screenWidth};
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  margin-top: 20px;
`;

export const InfoTitle = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: 24px;
  color: #3367d6;
`;

export const DescriptionArea = styled.View`
  flex-direction: row;
  width: ${Metrics.screenWidth - 30};
`;
export const DescriptionText = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: 13px;
  color: #1f394e99;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const OptionArea = styled.View`
  height: 150px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
`;
export const OptionButton = styled.TouchableOpacity`
  background-color: ${(props) => (props.red ? Colors.fire : "#0A10BA")};
  width: 71px;
  height: 71px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
`;

export const Icon = styled.Image.attrs((props) => ({
  source: props.icon,
  resizeMode: "contain",
}))`
  width: 34px;
  height: 34px;
  tint-color: ${Colors.white};
`;

export const PremiumContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: 230px;
  width: ${Metrics.screenWidth};
  justify-content: space-between;
  align-items: center;
`;

export const PremiumImage = styled.Image.attrs((props) => ({
  source: Images.success,
  resizeMode: "contain",
}))`
  width: 92px;
  height: 92px;
`;

export const TitlePremiumContainer = styled.View`
  margin-left: 0px;
`;

export const PremiumTitle = styled.Text`
  justify-content: center;
  font-size: 22px;
  color: #1f394e;
  font-family: ${Fonts.type.bold};
  margin-bottom: 5px;
`;

export const PremiumText = styled.Text`
  font-size: 14px;
  font-family: ${Fonts.type.medium};
`;

export const IconContainer = styled.View`
  margin-left: 24px;
`;
export const PremiumArrowIcon = styled.Image.attrs((props) => ({
  source: Icons.rightArrow,
  resizeMode: "contain",
}))`
  width: 32px;
  height: 24px;
  tint-color: #1f394e;
  margin-right: 10px;
`;

export const TutorialButtonContainer = styled.View`
  top: 20px;
  right: 40px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;

export const TutorialButton = styled.TouchableOpacity`
  height: 30px;
  width: 100px;
  justify-content: center;
  background-color: #eaeef2;
  border-radius: 5px;
  margin-right: 10px;
`;

export const TutorialLabel = styled.Text`
  color: ${Colors.headerBgHome};
  font-size: 20px;
  align-self: center;
  font-family: ${Fonts.type.medium};
`;
