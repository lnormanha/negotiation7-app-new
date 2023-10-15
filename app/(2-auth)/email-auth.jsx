import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";

import { useLocalization } from "@/context/LocalizationProvider";
import VerifyEmailActions from "../../state/redux/verify-email/VerifyEmailRedux";
import LoginActions from "../../state/redux/login/LoginRedux";
import SignUpActions from "../../state/redux/sign-up/SignUpRedux";
import UserActions from "../../state/redux/user/UserRedux";

import { Header, AuthInput, Button, KeyboardSpacer } from "../../components";

import {
  Container,
  Content,
  Title,
  Separator,
  BottomContainer,
} from "./EmailAuthScreenStyles";

const CustomScrollView = wrapScrollView(ScrollView);

const options = {
  align: "top",
  animated: true,
  immediate: false,
  insets: {
    top: 150,
    bottom: 0,
  },
};

function EmailAuthScreen(props) {
  const initialState = {
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    resetToken: "",
    isModalVisible: false,
  };
  const { getLocaleString, currentLocale } = useLocalization();

  const [state, setState] = useState(initialState);
  const { login: loginProps, signup, verify_email, user } = props;
  const { push, back } = useRouter();
  const {
    forgotPassword,
    verify,
    password: passwordParam,
    account,
    resetPassword,
    login,
  } = useGlobalSearchParams();

  const { email, name, passwordConfirm, resetToken, password } = state;

  function renderContent() {
    if (verify || forgotPassword) {
      return (
        <Content>
          <Separator />
          <Title>
            {verify
              ? getLocaleString("loginEmailLabel")
              : getLocaleString("forgotPasswordLabel")}
          </Title>
          <Separator />
          <AuthInput
            label="E-mail"
            placeholder={getLocaleString("emailPlaceholder")}
            value={state.email}
            onChangeText={(email) => setState({ ...state, email })}
            autoCapitalize="none"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
          />
          <Separator />
        </Content>
      );
    } else if (login) {
      return (
        <Content>
          <CustomScrollView>
            <Separator />
            <Title>
              {getLocaleString("loginEmailWelcomeBack")},{" "}
              {verify_email.payload?.user.name}!
            </Title>
            <Separator />
            <AuthInput
              label="E-mail"
              placeholder={getLocaleString("emailPlaceholder")}
              value={email}
              onChangeText={(email) => setState({ ...state, email })}
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
            />
            <Separator />
            <ScrollIntoView ref={(x) => (passwordInput = x)}>
              <AuthInput
                label={getLocaleString("passwordLabel")}
                placeholder={getLocaleString("passwordPlaceholder")}
                value={password}
                onChangeText={(password) => setState({ ...state, password })}
                secureTextEntry
                underlineColorAndroid="transparent"
                onFocus={() => passwordInput.scrollIntoView(options)}
              />
            </ScrollIntoView>
            <Separator />
          </CustomScrollView>
        </Content>
      );
    } else if (passwordParam) {
      return (
        <Content>
          <Separator />
          <Title>{getLocaleString("loginExistingEmail")}</Title>
          <Separator />
          <AuthInput
            label={getLocaleString("passwordLabel")}
            placeholder={getLocaleString("passwordPlaceholder")}
            value={state.password}
            onChangeText={(password) => setState({ ...state, password })}
            secureTextEntry
            underlineColorAndroid="transparent"
          />
          <Separator />
        </Content>
      );
    } else {
      return (
        <Content>
          <CustomScrollView>
            <Separator />
            <Title>
              {resetPassword
                ? getLocaleString("resetPasswordTitle")
                : getLocaleString("loginSignup")}
            </Title>
            <Separator />
            {!resetPassword && (
              <View>
                <AuthInput
                  label="E-mail"
                  placeholder={getLocaleString("emailPlaceholder")}
                  value={email}
                  onChangeText={(email) => setState({ ...state, email })}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                />
                <Separator />
              </View>
            )}
            {!resetPassword && (
              <View>
                <AuthInput
                  label={getLocaleString("nameLabel")}
                  placeholder={getLocaleString("namePlaceholder")}
                  value={name}
                  onChangeText={(text) => setState({ ...state, name: text })}
                  underlineColorAndroid="transparent"
                />
                <Separator />
              </View>
            )}

            {resetPassword && (
              <View>
                <AuthInput
                  label={getLocaleString("resetTokenLabel")}
                  value={resetToken}
                  onChangeText={(text) =>
                    setState({ ...state, resetToken: text })
                  }
                  underlineColorAndroid="transparent"
                />
                <Separator />
              </View>
            )}
            <ScrollIntoView ref={(x) => (passwordInput = x)}>
              <AuthInput
                label={getLocaleString("passwordLabel")}
                placeholder={getLocaleString("passwordPlaceholder")}
                value={state.password}
                onChangeText={(password) => setState({ ...state, password })}
                secureTextEntry
                underlineColorAndroid="transparent"
                onFocus={() => passwordInput.scrollIntoView(options)}
              />
            </ScrollIntoView>
            {resetPassword && (
              <ScrollIntoView ref={(x) => (passwordConfirmInput = x)}>
                <Separator />

                <AuthInput
                  label={getLocaleString("confirmPasswordLabel")}
                  placeholder={getLocaleString("confirmPasswordLabel")}
                  value={passwordConfirm}
                  onChangeText={(text) =>
                    setState({ ...state, passwordConfirm: text })
                  }
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onFocus={() => passwordConfirmInput.scrollIntoView(options)}
                />
              </ScrollIntoView>
            )}
            <Separator />
          </CustomScrollView>
        </Content>
      );
    }
  }

  function toggleModal() {
    setState({ ...state, isModalVisible: !state.isModalVisible });
  }

  function goToForgotPassword() {
    // const { navigation } = props;
    push("email-auth?forgotPassword=true");
  }

  function submit() {
    if (verify) {
      let payload = { email };
      props.verifyEmailRequest(payload);
    } else if (forgotPassword) {
      const payload = {
        body: {
          email,
        },
      };

      props.userForgotPasswordRequest(payload);
    } else if (resetPassword) {
      const payload = {
        body: {
          token: resetToken,
          password,
          passwordConfirmation: passwordConfirm,
        },
      };

      props.userResetPasswordRequest(payload);
    } else if (login) {
      let body = {
        email,
        password,
      };
      let payload = {
        body,
      };
      props.loginRequest(payload);
    } else if (passwordParam) {
      const id = props.verify_email.payload.user.id;
      let body = { password };
      let payload = { id, body };
      props.userEditRequest(payload);
    } else {
      let body = {
        name,
        email,
        password,
      };

      let payload = {
        body,
      };

      props.signUpRequest(payload);
    }
  }

  function validateEmail() {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(state.email)) {
      return true;
    } else return false;
  }

  return (
    <Container>
      <KeyboardAvoidingView>
        <Header title="" onPressLeft={() => back()} />
        {renderContent()}
        <BottomContainer forgotPassword={verify}>
          {verify && (
            <Button
              title={getLocaleString("forgotPasswordButton")}
              onPress={() => goToForgotPassword()}
              outline
            />
          )}
          <Separator />
          <Button
            title={getLocaleString("topicQuestionContinueButton")}
            onPress={() => submit()}
            loading={
              verify_email.fetching ||
              signup.fetching ||
              loginProps.fetching ||
              user.fetching
            }
            disabled={
              !forgotPassword
                ? resetPassword
                  ? password.length < 6 &&
                    passwordConfirm !== password &&
                    !resetToken
                  : (!verify && password.length < 6) || !validateEmail()
                : false
            }
          />
        </BottomContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    verify_email: state.verify_email,
    signup: state.signup,
    login: state.login,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { verifyEmailRequest } = VerifyEmailActions;
  const { loginRequest } = LoginActions;
  const { signUpRequest } = SignUpActions;
  const {
    userEditRequest,
    userForgotPasswordRequest,
    userResetPasswordRequest,
  } = UserActions;

  return bindActionCreators(
    {
      verifyEmailRequest,
      loginRequest,
      signUpRequest,
      userEditRequest,
      userResetPasswordRequest,
      userForgotPasswordRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailAuthScreen);
