import * as React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";

import {
  Container,
  LoginTop,
  Welcome,
  ChooseLogin,
  ButtonEmailContainer,
  ButtonEmailLabel,
  LinkText,
  TextsContainer,
} from "./LoginScreenStyles";

export default function LoginScreen() {
  const { getLocaleString, currentLocale } = useLocalization();
  const { push, back } = useRouter();

  const [credentialStateForUser, updateCredentialStateForUser] =
    React.useState(-1);

  return (
    <Container>
      <LoginTop language={currentLocale} />
      <Welcome>{getLocaleString("loginWelcome")}</Welcome>
      <ChooseLogin>{getLocaleString("loginContinue")}</ChooseLogin>

      <ScrollView />
      <ButtonEmailContainer onPress={() => push("email-auth?verify=true")}>
        <ButtonEmailLabel>E-mail</ButtonEmailLabel>
      </ButtonEmailContainer>

      <TextsContainer>
        <TouchableOpacity onPress={() => push("terms")}>
          <LinkText>{getLocaleString("termsHeader")}</LinkText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => push("privacy-policy")}>
          <LinkText>{getLocaleString("privacyHeader")}</LinkText>
        </TouchableOpacity>
      </TextsContainer>
    </Container>
  );
}
