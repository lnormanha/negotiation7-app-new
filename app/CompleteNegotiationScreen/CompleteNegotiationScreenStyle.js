import styled from "styled-components/native";
import { Colors, Metrics, Fonts, Icons } from "../../constants";

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${Colors.background};
`;

export const Render = styled.Image.attrs(props => ({
  source: props.image
}))`
  width: 280px;
  height: 220px;
  margin-top: 20px;
  align-self: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: ${Fonts.size.h4};
  font-family: ${Fonts.type.base};
  margin: 0px 15px 0px 15px;
  margin-top: 20px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #fff;
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.base};
  margin: 0px 15px 0px 15px;
  margin-top: 20px;
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  align-self: center;
  background-color: rgba(0, 0, 0, 0);
  height: 50;
  width: 200;
  border-radius: 5px;
  border-width: 2px;
  border-color: #fff;
  align-items: center;
  justify-content: center;
  margin: 30px 0px 10px 0px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.base};
`;
