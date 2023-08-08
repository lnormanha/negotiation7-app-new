import React, { Component } from "react";
import { View } from "react-native";
import { Header, Button, FacebookButton, GoogleButton } from "../../components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Add Actions - replace 'Your' with whatever your reducer is called :)
import SignUpActions from "../../state/redux/sign-up/SignUpRedux";

import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

// Styles
import {
  Container,
  Title,
  InputContainer,
  InputLabel,
  Input,
  Box,
  AlignCenter,
} from "./SignUpScreenStyles";
import { useRouter } from "expo-router";

function SignUpScreen({}) {
  const initialState = {
    email: "",
    name: "",
    password: "",
  };
  const [state, setState] = useState(initialState);
  const { back, push } = useRouter();
  const { email, name, password } = state;

  function submit() {
    const body = {
      name,
      email,
      password,
    };

    const payload = {
      body,
    };

    props.signUpRequest(payload);
  }

  return (
    <Container>
      <Header title={i18n.t("signUpHeader")} onPressLeft={() => back()} />
      <Box />
      <InputContainer>
        <InputLabel>{i18n.t("nameLabel")}</InputLabel>
        <Input
          placeholder={i18n.t("namePlaceholder")}
          value={name}
          onChangeText={(text) => setState({ name: text })}
        ></Input>
      </InputContainer>
      <InputContainer>
        <InputLabel>{i18n.t("emailLabel")}</InputLabel>
        <Input
          placeholder={i18n.t("emailPlaceholder")}
          value={email}
          onChangeText={(email) => setState({ email })}
          autoCapitalize="none"
          keyboardType="email-address"
        ></Input>
      </InputContainer>
      <InputContainer>
        <InputLabel>{i18n.t("passwordLabel")} </InputLabel>
        <Input
          placeholder={i18n.t("passwordPlaceholder")}
          value={password}
          onChangeText={(password) => setState({ password })}
          secureTextEntry
        ></Input>
      </InputContainer>
      <Button onPress={() => submit()} title={i18n.t("signUpButton")}></Button>
      <View style={{ marginBottom: 30 }} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { signup: state.signup, language: state.language };
};

const mapDispatchToProps = (dispatch) => {
  const { signUpRequest } = SignUpActions;
  return bindActionCreators({ signUpRequest }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
