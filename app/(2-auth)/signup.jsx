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
  AlignCenter
} from "./SignUpScreenStyles";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: ""
    };
  }

  submit() {
    const { email, name, password } = this.state;
    const body = {
      name,
      email,
      password
    };

    const payload = {
      body
    };

    this.props.signUpRequest(payload);
  }


  render() {
    const { navigation } = this.props;
    const { navigate, goBack } = navigation;
    const { email, name, password } = this.state;
    return (
      <Container>
        <Header
          title={i18n.t("signUpHeader")}
          onPressLeft={() => goBack()}
        />
        <Box />
        <InputContainer>
          <InputLabel>{i18n.t("nameLabel")}</InputLabel>
          <Input
            placeholder={i18n.t("namePlaceholder")}
            value={name}
            onChangeText={text => this.setState({ name: text })}
          ></Input>
        </InputContainer>
        <InputContainer>
          <InputLabel>{i18n.t("emailLabel")}</InputLabel>
          <Input
            placeholder={i18n.t("emailPlaceholder")}
            value={email}
            onChangeText={email => this.setState({ email })}
            autoCapitalize="none"
            keyboardType="email-address"
          ></Input>
        </InputContainer>
        <InputContainer>
          <InputLabel>{i18n.t("passwordLabel")} </InputLabel>
          <Input
            placeholder={i18n.t("passwordPlaceholder")}
            value={password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          ></Input>
        </InputContainer>
        <Button
          onPress={() => this.submit()}
          title={i18n.t("signUpButton")}
        ></Button>
        <View style={{ marginBottom: 30 }} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { signup: state.signup, language: state.language };
};

const mapDispatchToProps = dispatch => {
  const { signUpRequest } = SignUpActions;
  return bindActionCreators(
    { signUpRequest },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
