import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";
import SignUpActions from "../../state/redux/sign-up/SignUpRedux";

import { Header, Button } from "../../components";

import {
  Container,
  InputContainer,
  InputLabel,
  Input,
  Box,
} from "./SignUpScreenStyles";

function SignUpScreen({}) {
  const initialState = {
    email: "",
    name: "",
    password: "",
  };
  const [state, setState] = useState(initialState);
  const { getLocaleString } = useLocalization();
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
      <Header
        title={getLocaleString("signUpHeader")}
        onPressLeft={() => back()}
      />
      <Box />
      <InputContainer>
        <InputLabel>{getLocaleString("nameLabel")}</InputLabel>
        <Input
          placeholder={getLocaleString("namePlaceholder")}
          value={name}
          onChangeText={(text) => setState({ ...state, name: text })}
        ></Input>
      </InputContainer>
      <InputContainer>
        <InputLabel>{getLocaleString("emailLabel")}</InputLabel>
        <Input
          placeholder={getLocaleString("emailPlaceholder")}
          value={email}
          onChangeText={(email) => setState({ ...state, email })}
          autoCapitalize="none"
          keyboardType="email-address"
        ></Input>
      </InputContainer>
      <InputContainer>
        <InputLabel>{getLocaleString("passwordLabel")} </InputLabel>
        <Input
          placeholder={getLocaleString("passwordPlaceholder")}
          value={password}
          onChangeText={(password) => setState({ ...state, password })}
          secureTextEntry
        ></Input>
      </InputContainer>
      <Button
        onPress={() => submit()}
        title={getLocaleString("signUpButton")}
      ></Button>
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
