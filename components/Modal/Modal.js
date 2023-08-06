import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import {
  Container,
  Title,
  Message,
  ButtonsContainer,
  Button,
  ButtonLabel
} from "./ModalStyles";
import ModalLib from "react-native-modal";

// import { translate, setI18nConfig } from "../../Services/TranslationService";

export default class Modal extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    isVisible: PropTypes.bool
  };

  // Defaults for props
  static defaultProps = {
    title: "Alert",
    message: "Erro!"
  };

  render() {
    const { isVisible, title, message, onCancel, onConfirm } = this.props;
    return (
      <ModalLib
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor={"#000"}
        backdropOpacity={0.5}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        hasBackdrop
      >
        <Container>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <ScrollView />
          <ButtonsContainer>
            <Button onPress={onCancel}>
              <ButtonLabel>Cancel</ButtonLabel>
            </Button>
            <Button onPress={onConfirm}>
              <ButtonLabel>Confirm</ButtonLabel>
            </Button>
          </ButtonsContainer>
        </Container>
      </ModalLib>
    );
  }
}
