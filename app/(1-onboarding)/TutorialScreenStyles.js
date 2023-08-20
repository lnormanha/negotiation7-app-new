import styled from "styled-components/native";
import { Colors, Metrics, Fonts, ApplicationStyles } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  ${ApplicationStyles.screen.container};
`;
export const Text = styled.Text`
  font-size: ${Fonts.size.h4};
  font-family: ${Fonts.type.medium};
  text-align: center;
`;

export const Title = styled.Text`
  font-family: ${Fonts.type.bold};
  font-size: ${Fonts.size.h5};
  color: #1f394e;
  margin-left: 20px;
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  font-family: ${Fonts.type.base};
  font-size: ${Fonts.size.input};
  color: #1f394e;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 12px;
`;

export const TopMargin = styled.View`
  margin-bottom: 30px;
`;

export const BottomContainer = styled.View`
  height: 80px;
  width: ${Metrics.screenWidth}px;
  background-color: ${Colors.background};
  ${(props) => props.showShadow && `box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2)`}
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
