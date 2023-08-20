import styled from "styled-components/native";
import { Images, Fonts, Colors } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.background};
`;

export const ButtonOption = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.View`
  border-top-width: 1px;
  border-top-color: #ffff;
  background-color: #3367d6;
  width: 332px;
  height: 60px;
  border-radius: 8px;
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-top: 80px;
  box-shadow: 0px 6px 12px rgba(51, 103, 214, 0.32);
`;

export const TextButton = styled.Text`
  color: #1f394e;
  font-size: 14px;
  background-color: black;
  font-family: ${Fonts.type.bold};
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const TextButtonCreate = styled.Text`
  font-family: ${Fonts.type.bold};
  color: #ffffff;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const FolderImage = styled.Image.attrs((props) => ({
  source: Images.folder,
}))`
  margin-top: 20px;
  margin-bottom: 40px;
  height: 260px;
  width: 260px;
  align-items: center;
  align-self: center;
`;

export const InputMargin = styled.View`
  margin-bottom: 26px;
`;

export const AlignToBottom = styled.View`
  flex: 1;
`;

export const TagContainer = styled.View`
  height: 180px;
`;

export const Tag = styled.TouchableOpacity`
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.selected ? Colors.buttonBg : Colors.white};
  border-radius: 5px;
  border-width: 0.2px;
  border-color: ${(props) => (props.selected ? Colors.white : Colors.buttonBg)};
`;

export const TagLabel = styled.Text`
  font-family: ${Fonts.type.medium};
  color: ${(props) => (props.selected ? Colors.white : Colors.buttonBg)};
  font-size: ${Fonts.size.input};
`;

export const ChooseTagLabel = styled.Text`
  font-family: ${Fonts.type.medium};
  font-size: ${Fonts.size.input};
  color: #1f394e;
  margin-bottom: 10px;
  margin-left: 30px;
`;
