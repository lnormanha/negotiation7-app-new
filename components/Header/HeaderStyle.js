import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {Colors, Metrics, Fonts, Icons} from '../../constants';
// import {
//   isIphoneX,
//   getBottomSpace,
//   getStatusBarHeight,
// } from 'react-native-iphone-x-helper';

// const height = isIphoneX() ? 100 : 80;
// const paddingTop = Platform.OS == 'ios' ? getStatusBarHeight() + 20 : 0;
export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  width: ${Metrics.screenWidth};
  background-color: ${props =>
    props.isHome ? Colors.headerBgHome : Colors.headerBg};
  padding-top: 0px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${props => (props.isHome ? Colors.white : Colors.title)};
  margin-left: 25px;
  margin-right: 10px;
  font-size: 20px;
  align-items: center;
  align-self: center;
  justify-content: center;
  font-family: ${Fonts.type.medium};
`;

export const LogoIcon = styled.Image.attrs(prop => ({
  source: prop.image,
  resizeMode: 'contain',
}))`
  width: 230px;
  height: 50px;
`;
export const LeftIcons = styled.Image.attrs(prop => ({
  source: prop.image,
}))`
  width: ${props => (props.isHome ? 60 : 32)};
  height: ${props => (props.isHome ? 60 : 32)};
`;
export const LeftIconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${props => (props.isHome ? 40 : 30)};
  justify-content: center;
`;

export const LeftIconsArea = styled.TouchableOpacity`
  height: 35px;
  width: 35px;
  align-items: center;
  justify-content: center;
`;

export const RightIconsContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-right: 40px;
`;

export const RightIcons = styled.Image.attrs(prop => ({
  source: prop.image,
  resizeMode: 'contain',
}))`
  height: 30px;
  width: 30px;
`;

export const RightIconsArea = styled.TouchableOpacity`
  height: 35px;
  width: 35px;
  align-items: center;
  justify-content: center;
`;

export const PreviewButton = styled.TouchableOpacity`
  height: 30px;
  width: 100px;
  align-items: flex-end;
  justify-content: center;
  background-color: #eaeef2;
  border-radius: 5px;
`;

export const PreviewLabel = styled.Text`
  color: ${Colors.headerBgHome};
  font-size: 20px;
  align-self: center;
  font-family: ${Fonts.type.medium};
`;
