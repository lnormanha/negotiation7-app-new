import styled from 'styled-components/native';
import {Colors, Metrics, Fonts, Icons} from '../../constants';
// import {
//   isIphoneX,
//   getBottomSpace,
//   getStatusBarHeight,
// } from 'react-native-iphone-x-helper';

export const Container = styled.TouchableOpacity`
  height: 70px;
  width: ${props =>
    props.small ? Metrics.screenWidth / 2 - 30 : Metrics.screenWidth - 40};
  background-color: ${props =>
    props.disabled
      ? '#1F394E1A'
      : props.outline
      ? Colors.white
      : Colors.buttonBg};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  align-self: center;
  box-shadow: 0px 6px 12px #3367d652;
  margin-bottom: ${props => (props.bottomMargin ? 20 : 0)};
  border-width: ${props => (props.outline ? 2 : 0)}px;
  border-color: ${Colors.buttonBg};
`;
// margin-bottom: ${props => (props.bottomMargin ? 20 + getBottomSpace() : 0)};


export const ContentArea = styled.View`
  width: ${props =>
    props.small ? Metrics.screenWidth / 2 - 30 : Metrics.screenWidth - 40};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const TextArea = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Text = styled.Text`
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.bold};
  color: ${props =>
    props.disabled ? '#1F394E1A' : props.outline ? Colors.buttonBg : '#fff'};
`;

export const IconContainer = styled.View`
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  position: ${props => (props.spaced_icons ? 'absolute' : 'relative')};
  right: 0;
`;

export const Icon = styled.Image.attrs(props => ({
  source: Icons.arrow_right,
}))`
  width: 24px;
  height: 24px;
  tint-color: #fff;
`;
