import styled from 'styled-components/native';
import {Colors, Metrics, Fonts, Icons} from '../../constants';


export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
`;

export const SubInfoArea = styled.View`
  height: ${props => (props.hasSubscription ? 130 : 80)}px;
  width: ${Metrics.screenWidth};
  background-color: ${Colors.headerBgHome};
  padding: 10px 25px 40px 25px;
  justify-content: space-between;
`;

export const SubRemainingText = styled.Text`
  font-size: ${Fonts.size.medium};
  font-family: ${Fonts.type.bold};
  color: ${Colors.white};
`;
export const NegotiationsContainer = styled.ScrollView``;

export const ListTitle = styled.Text`
  font-size: ${Fonts.size.h5};
  font-family: ${Fonts.type.semi_bold};
  color: ${Colors.title};
  margin-left: 25px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Tags = styled.FlatList.attrs(props => ({
  contentContainerStyle: {paddingVertical: 10, paddingHorizontal: 15},
}))``;

export const Negotiations = styled.FlatList.attrs(props => ({
  contentContainerStyle: {paddingVertical: 10},
}))``;

export const Negotiation = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #eaeef2;
  height: 80px;
  width: ${Metrics.screenWidth - 50};
  align-self: center;
  border-radius: 05;
  align-items: center;
  margin-bottom: 10px;
`;

export const NegotiationIcon = styled.Image.attrs(props => ({
  source: Icons.report,
}))`
  width: 28px;
  height: 32px;
  margin-left: 25px;
`;

export const NegotiationName = styled.Text`
  color: #1f394e;
  font-family: ${Fonts.type.medium};
  font-size: 18px;
  align-items: center;
`;

export const NegotiationArea = styled.View`
  margin-left: 20px;
`;

export const NegotiationInfo = styled.Text`
  color: #1f394e80;
  font-family: ${Fonts.type.base};
  font-size: 16px;
  align-items: center;
`;

export const BottomMargin = styled.View`
  margin-bottom: 150px;
`;

export const BottomContainer = styled.View`
  height: 120px;
  padding-bottom: 10px;
  width: ${Metrics.screenWidth};
  background-color: ${Colors.background};
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
`;

export const ViewButton = styled.TouchableOpacity`
  flex-direction: row;
  width: ${Metrics.screenWidth - 60};
  height: 70px;
  margin-top: 10px;
  align-items: center;
  align-self: center;
  justify-content: space-evenly;
  border-radius: 5px;
  background-color: ${props =>
    props.disabled ? Colors.charcoal : Colors.headerBgHome};
`;

export const TextButton = styled.Text`
  flex-direction: row;
  margin-left: 5px;
  font-weight: bold;
  color: ${Colors.white};
  font-size: ${Fonts.size.h6};
`;

export const SubText = styled.Text`
  font-size: 16px;
  color: #8b98a2;
`;

export const AddButton = styled.View`
  height: 45px;
  width: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  border: 2px;
  border-color: ${Colors.white};
`;

export const AddIcon = styled.Image.attrs(props => ({
  source: Icons.add,
}))`
  height: 35px;
  width: 35px;
  tint-color: ${Colors.white};
`;

export const Languages = styled.View`
  width: ${Metrics.screenWidth};
  height: 80px;
  flex-direction: row;
  align-items: center;
`;

export const FlagButton = styled.TouchableOpacity`
  height: 64px;
  width: 64px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const FlagIcon = styled.Image.attrs(props => ({
  source: props.image,
}))`
  height: 48px;
  width: 48px;
`;

export const Bar = styled.Image.attrs(props => ({
  source: props.image,
}))`
  height: 20px;
  width: 20px;
  margin-left: 35px;
  margin-top: 150px;
  position: absolute;
`;
export const ImageContainer = styled.View`
  flex: 0.7;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

export const ImageNegotiation = styled.Image.attrs(props => ({
  source: props.image,
}))`
  height: ${Metrics.screenHeight / 3.3}px;
  align-items: center;
  align-self: center;
  resize-mode: contain;
`;

export const NegotiationTitleImage = styled.Text`
  font-size: 22px;
  color: #1f394e;
  font-family: ${Fonts.type.base};
  align-self: center;
  align-items: center;
`;

export const SubNegotiationTitleImage = styled.Text`
  font-weight: 100;
`;

export const DescriptionNegotiation = styled.Text`
  font-size: 16px;
  font-family: ${Fonts.type.light};
  color: #1f394eb3;
  align-self: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;

export const UnderLineText = styled.Text`
  text-decoration: underline;
  text-decoration-color: #3367d6;
  font-size: 16px;
  font-family: ${Fonts.type.semi_bold};
  color: #3367d6;
  align-self: center;
  align-items: center;
  text-align: center;
  margin-top: -15px;
`;

export const UnderLineTextArea = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  justify-content: center;
`;
export const InfoContainer = styled.TouchableOpacity`
  background-color: #dbe1e6;
  width: ${Metrics.screenWidth - 50};
  height: 53px;
  border-radius: 05px;
  margin-top: 0;
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-bottom: 30px;
`;

export const TextInfo = styled.Text`
  color: #768694;
  font-size: 12px;
  text-align: center;
  margin-left: 50px;
  margin-right: 50px;
`;

export const FocusText = styled.Text`
  color: #768694;
  font-size: 12px;
  text-decoration: underline;
  text-decoration-color: #768694;
`;

export const ProgressContainer = styled.View`
  height: 20px;
  background-color: ${Colors.white};
  border-radius: 10px;
  border-width: 0.5px;
  border-color: ${Colors.black};
  overflow: hidden;
  align-items: flex-start;
`;

export const Progress = styled.View`
  height: 20px;
  background-color: deepskyblue;
  width: ${props => props.width}%;
  border-radius: 10px;
`;

export const ProgressText = styled.Text`
  font-size: ${Fonts.size.medium};
  font-family: ${Fonts.type.bold};
  color: ${Colors.buttonBg};
  position: absolute;
  align-self: center;
`;
