import styled from "styled-components/native";
import {
  Colors,
  Metrics,
  Fonts,
  ApplicationStyles,
  Images,
} from "../../constants";

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

export const LoginTop = styled.Image.attrs((props) => ({
  source: props.language == "en" ? Images.logo_login_en : Images.logo_login,
  resizeMode: "contain",
}))`
  width: ${Metrics.screenWidth};
  height: ${Metrics.screenHeight / 2.6};
  align-self: center;
`;

export const Welcome = styled.Text`
  font-size: ${Fonts.size.h6};
  color: #03053b;
  font-family: ${Fonts.type.bold};
  text-align: center;
  align-self: center;
  margin-bottom: 10px;
  width: ${Metrics.screenWidth - 50};
`;

export const ChooseLogin = styled.Text`
  font-size: ${Fonts.size.input};
  color: #03053b;
  font-family: ${Fonts.type.base};
  text-align: center;
  align-self: center;
  margin-bottom: 10px;

  width: ${Metrics.screenWidth - 50};
`;

export const ButtonContainer = styled.View`
  width: ${Metrics.screenWidth - 40}px;
  justify-content: space-between;
  align-self: center;
`;

export const ButtonEmailContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: 60px;
  background-color: ${Colors.buttonBg};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  border-color: #dbdcdd;
  margin: 0 16px 0 16px;
`;

export const ButtonEmailLabel = styled.Text`
  font-size: ${Fonts.size.h5};
  color: ${Colors.white};
  font-family: ${Fonts.type.medium};
  text-align: center;
  align-self: center;
`;

export const TextsContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const LinkText = styled.Text`
  text-align: center;
  font-size: ${Fonts.size.input};
  color: #03053b;
  font-family: ${Fonts.type.light};
  text-decoration: underline;
  text-decoration-color: #03053b;
  margin-top: 10px;
`;
