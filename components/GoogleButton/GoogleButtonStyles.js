import styled from 'styled-components/native';
import {Colors, Metrics, Fonts, Icons} from '../../constants';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  height: 60px;

  background-color: ${Colors.white};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  border-color: #dbdcdd;
  margin: 10px 16px 0px 16px;
`;

export const Label = styled.Text`
  font-size: ${Fonts.size.input};
  color: #03053b;
  font-family: ${Fonts.type.medium};
  text-align: center;
  align-self: center;
  margin-left: 10px;
`;

export const Icon = styled.Image.attrs(props => ({
  source: Icons.google,
}))`
  height: 30px;
  width: 30px;
`;

export const LoadingContainer = styled.View`
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;
