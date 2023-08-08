import React, { Component, useState } from "react";
import { View } from "react-native";
import {
  Header,
  AuthInput,
  FullButton,
  Input,
  Modal,
  Button,
} from "../../components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  router,
  useGlobalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import VerifyEmailActions from "../../state/redux/verify-email/VerifyEmailRedux";
import LoginActions from "../../state/redux/login/LoginRedux";
import SignUpActions from "../../state/redux/sign-up/SignUpRedux";
import UserActions from "../../state/redux/user/UserRedux";

// Styles
import {
  Container,
  Content,
  Title,
  Separator,
  BottomContainer,
} from "./EmailAuthScreenStyles";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { ScrollView } from "react-native";
import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

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
  const [state, setState] = useState(initialState);
  const { login: loginProps, signup, verify_email, user } = props;
  const { push, back } = useRouter();
  const { forgotPassword, verify, password, account, resetPassword, login } =
    useGlobalSearchParams();

  function renderContent() {
    let { email, name, passwordConfirm, resetToken } = state;

    if (verify || forgotPassword) {
      return (
        <Content>
          <Separator />
          <Title>
            {verify ? i18n.t("loginEmailLabel") : i18n.t("forgotPasswordLabel")}
          </Title>
          <Separator />
          <AuthInput
            label="E-mail"
            placeholder={i18n.t("emailPlaceholder")}
            value={state.email}
            onChangeText={(email) => setState({ email })}
            autoCapitalize="none"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
          />
        </Content>
      );
    } else if (login) {
      return (
        <Content>
          <CustomScrollView>
            <Separator />
            <Title>
              {i18n.t("loginEmailWelcomeBack")},{" "}
              {verify_email.payload?.user.name}!
            </Title>
            <Separator />
            <AuthInput
              label="E-mail"
              placeholder={i18n.t("emailPlaceholder")}
              value={email}
              onChangeText={(email) => setState({ email })}
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
            />
            <Separator />
            <ScrollIntoView ref={(x) => (passwordInput = x)}>
              <AuthInput
                label={i18n.t("passwordLabel")}
                placeholder={i18n.t("passwordPlaceholder")}
                value={password}
                onChangeText={(password) => setState({ password })}
                secureTextEntry
                underlineColorAndroid="transparent"
                onFocus={() => passwordInput.scrollIntoView(options)}
              />
            </ScrollIntoView>
          </CustomScrollView>
        </Content>
      );
    } else if (password) {
      return (
        <Content>
          <Separator />
          <Title>{i18n.t("loginExistingEmail")}</Title>
          <Separator />
          <AuthInput
            label={i18n.t("passwordLabel")}
            placeholder={i18n.t("passwordPlaceholder")}
            value={state.password}
            onChangeText={(password) => setState({ password })}
            secureTextEntry
            underlineColorAndroid="transparent"
          />
        </Content>
      );
    } else {
      return (
        <Content>
          <CustomScrollView>
            <Separator />
            <Title>
              {resetPassword
                ? i18n.t("resetPasswordTitle")
                : i18n.t("loginSignup")}
            </Title>
            <Separator />
            {!resetPassword && (
              <View>
                <AuthInput
                  label="E-mail"
                  placeholder={i18n.t("emailPlaceholder")}
                  value={email}
                  onChangeText={(email) => setState({ email })}
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
                  label={i18n.t("nameLabel")}
                  placeholder={i18n.t("namePlaceholder")}
                  value={name}
                  onChangeText={(text) => setState({ name: text })}
                  underlineColorAndroid="transparent"
                />
                <Separator />
              </View>
            )}

            {resetPassword && (
              <View>
                <AuthInput
                  label={i18n.t("resetTokenLabel")}
                  value={resetToken}
                  onChangeText={(text) => setState({ resetToken: text })}
                  underlineColorAndroid="transparent"
                />
                <Separator />
              </View>
            )}
            <ScrollIntoView ref={(x) => (passwordInput = x)}>
              <AuthInput
                label={i18n.t("passwordLabel")}
                placeholder={i18n.t("passwordPlaceholder")}
                value={state.password}
                onChangeText={(password) => setState({ password })}
                secureTextEntry
                underlineColorAndroid="transparent"
                onFocus={() => passwordInput.scrollIntoView(options)}
              />
            </ScrollIntoView>
            {resetPassword && (
              <ScrollIntoView ref={(x) => (passwordConfirmInput = x)}>
                <Separator />

                <AuthInput
                  label={i18n.t("confirmPasswordLabel")}
                  placeholder={i18n.t("confirmPasswordLabel")}
                  value={passwordConfirm}
                  onChangeText={(text) => setState({ passwordConfirm: text })}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onFocus={() => passwordConfirmInput.scrollIntoView(options)}
                />
              </ScrollIntoView>
            )}
          </CustomScrollView>
        </Content>
      );
    }
  }

  function toggleModal() {
    setState({ isModalVisible: !state.isModalVisible });
  }

  function goToForgotPassword() {
    // const { navigation } = props;
    push("email-auth?forgotPassword=true");
  }

  function submit() {
    if (verify) {
      let payload = { email: state.email };
      props.verifyEmailRequest(payload);
    } else if (forgotPassword) {
      const payload = {
        body: {
          email: state.email,
        },
      };

      props.userForgotPasswordRequest(payload);
    } else if (resetPassword) {
      const payload = {
        body: {
          token: state.resetToken,
          password: state.password,
          passwordConfirmation: state.passwordConfirm,
        },
      };

      props.userResetPasswordRequest(payload);
    } else if (login) {
      let { email, password } = state;
      let body = {
        email,
        password,
      };
      let payload = {
        body,
      };
      props.loginRequest(payload);
    } else if (password) {
      const id = props.verify_email.payload.user.id;
      let { password } = state;
      let body = { password };
      let payload = { id, body };
      props.userEditRequest(payload);
    } else {
      let { email, name, password } = state;

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
      <Header title="" onPressLeft={() => back()} />
      {renderContent()}
      <BottomContainer forgotPassword={verify}>
        {verify && (
          <Button
            title={i18n.t("forgotPasswordButton")}
            onPress={() => goToForgotPassword()}
            outline
          />
        )}
        <Separator />
        <Button
          title={i18n.t("topicQuestionContinueButton")}
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
      {/* <KeyboardSpacer /> */}
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
