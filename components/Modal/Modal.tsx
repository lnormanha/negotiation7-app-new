import React from "react";
import { ScrollView } from "react-native";
import ModalLib from "react-native-modal";

import { useLocalization } from "@/context/LocalizationProvider";

import {
  Container,
  Title,
  Message,
  ButtonsContainer,
  Button,
  ButtonLabel,
} from "./ModalStyles";

interface ModalProps {
  title: string;
  message: string;
  onCancel?(): void;
  onConfirm?(): void;
  isVisible?: boolean;
}

export default function Modal({
  title = "Alert",
  message = "Erro",
  onCancel,
  onConfirm,
  isVisible,
}: ModalProps) {
  const { getLocaleString, currentLocale } = useLocalization();

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
            <ButtonLabel>{getLocaleString("cancel")}</ButtonLabel>
          </Button>
          <Button onPress={onConfirm}>
            <ButtonLabel>{getLocaleString("confirm")}</ButtonLabel>
          </Button>
        </ButtonsContainer>
      </Container>
    </ModalLib>
  );
}
