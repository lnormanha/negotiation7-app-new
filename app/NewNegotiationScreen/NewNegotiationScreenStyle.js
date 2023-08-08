import styled from "styled-components/native";
import { Colors, Metrics, Fonts, Icons } from "../../constants";

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${Colors.background};
`;

export const Title = styled.Text`
  color: #fff;
  font-size: ${Fonts.size.h4};
  font-family: ${Fonts.type.base};
  margin: 0px 20px 0px 20px;
  margin-top: 20px;
`;

export const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: Colors.cloud,
  underlineColorAndroid: "rgba(255,255,255,0)"
}))`
  width: ${Metrics.screenWidth - 40};
  height: 50px;
  margin-top: 20px;
  align-self: center;
  color: #fff;
  font-size: ${Fonts.size.h5};
  font-family: ${Fonts.type.base};
  border-bottom-width: 0.5px;
  border-bottom-color: #fff;
`;

export const Button = styled.TouchableOpacity`
  align-self: center;
  background-color: #fff;
  height: 50;
  width: 200;
  border-radius: 5;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.2);
  margin: 20px 0px 30px 0px;
`;

export const ButtonText = styled.Text`
  color: ${Colors.charcoal};
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.base};
`;
