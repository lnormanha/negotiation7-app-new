import styled from "styled-components/native";
import { Fonts, Colors, Metrics } from "../../constants";

// import {
//   isIphoneX,
//   getBottomSpace,
//   getStatusBarHeight
// } from "react-native-iphone-x-helper";

// const height = isIphoneX() ? 70 : 50;

export const Container = styled.TouchableOpacity`
  width: ${Metrics.screenWidth};
  height: 50px;
  background-color: ${Colors.buttonBg};
  align-items: center;
  justify-content: center;
  padding-bottom: 0;
`;
// padding-bottom: ${isIphoneX() ? 20 : 0};

export const Label = styled.Text`
  font-family: ${Fonts.type.semi_bold}
  font-size: ${Fonts.size.input};
  color: ${Colors.white};
  text-align: center;
`;
