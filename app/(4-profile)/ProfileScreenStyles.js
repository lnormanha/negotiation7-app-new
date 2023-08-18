import styled from "styled-components/native";
import {
  Colors,
  Metrics,
  Fonts,
  ApplicationStyles,
  Icons,
} from "../../constants";

export const Container = styled.View`
  ${ApplicationStyles.screen.container};
`;

export const TopContainer = styled.View`
  flex-direction: row;
  height: 80px;
  width: ${Metrics.screenWidth};
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${Colors.headerBg};
`;

export const AvatarContainer = styled.View`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.title};
`;

export const InfoContent = styled.View`
  margin-left: 30px;
`;

export const Name = styled.Text`
  font-size: ${Fonts.size.h5};
  font-family: ${Fonts.type.semi_bold};
  color: ${Colors.title};
`;
export const Email = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.base};
  color: ${Colors.title};
`;

export const SectionTitle = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.bold};
  color: ${Colors.title};
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SubInfoContent = styled.View`
  flex-direction: row;
  margin: 0px 16px;
`;

export const TripsCopyright = styled.Text`
  font-size: ${Fonts.size.medium};
  font-family: ${Fonts.type.base};
  color: ${Colors.white};
`;

export const SubType = styled.Text`
  font-size: ${Fonts.size.input};
  font-family: ${Fonts.type.base};
  color: ${Colors.title};
  margin-left: 30px;
  margin-bottom: 10px;
`;

export const ManageSubLabel = styled.Text`
  font-size: ${Fonts.size.input};
  font-family: ${Fonts.type.medium};
  color: #3366bb;
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const OptionItem = styled.TouchableOpacity`
  width: ${Metrics.screenWidth};
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: ${Colors.headerBg};
`;

export const OptionLabel = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.medium};
  color: ${Colors.title};
  margin-left: 30px;
`;

export const OptionIcon = styled.Image.attrs((props) => ({
  source: Icons.chevron_right,
}))`
  height: 20px;
  width: 20px;
  tint-color: ${Colors.title};
  margin-right: 30px;
`;

export const ProgressContainer = styled.View`
  height: 20px;
  background-color: ${Colors.white};
  border-radius: 10px;
  border-width: 1.5px;
  border-color: ${Colors.buttonBg};
  overflow: hidden;
  margin: 0 30px;
  align-items: flex-start;
`;

export const Progress = styled.View`
  height: 20px;
  background-color: deepskyblue;
  width: ${(props) => props.width}%;
  border-radius: 10px;
`;

export const ProgressText = styled.Text`
  font-size: ${Fonts.size.medium};
  font-family: ${Fonts.type.bold};
  color: ${Colors.buttonBg};
  position: absolute;
  align-self: center;
`;
