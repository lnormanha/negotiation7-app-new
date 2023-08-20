import styled from "styled-components/native";
import { Colors, Metrics, Fonts, ApplicationStyles } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

// const withForgotPassContainer = isIphoneX() ? 200 : 170;
// const normalContainer = isIphoneX() ? 150 : 120;

export const Container = styled(SafeAreaView)`
  ${ApplicationStyles.screen.container};
`;
export const Content = styled.View`
  flex: 1;
`;
export const Title = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.base};
  margin-horizontal: 20px;
`;

export const Separator = styled.View`
  margin-top: 30px;
`;

export const BottomContainer = styled.View`
  height: 170px;
  padding-bottom: 10px;
  width: ${Metrics.screenWidth};
  align-items: center;
  justify-content: center;
`;
