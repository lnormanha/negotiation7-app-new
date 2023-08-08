import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Header,
  AuthInput,
  FullButton,
  Input,
  Modal,
  Button,
} from '../../components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import VerifyEmailActions from '../../state/redux/verify-email//VerifyEmailRedux';
import LoginActions from '../../state/redux/login/LoginRedux';
import SignUpActions from '../../state/redux/sign-up//SignUpRedux';
import UserActions from '../../state/redux/user/UserRedux';

// Styles
import {
  Container,
  Content,
  Title,
  Separator,
  BottomContainer,
} from './EmailAuthScreenStyles';
import {ScrollIntoView, wrapScrollView} from 'react-native-scroll-into-view';
import {ScrollView} from 'react-native';
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
  align: 'top',
  animated: true,
  immediate: false,
  insets: {
    top: 150,
    bottom: 0,
  },
};

class EmailAuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:
        props.verify_email.payload?.user.email ||
        props.navigation.getParam('email') ||
        '',
      name: '',
      password: '',
      passwordConfirm: '',
      resetToken: '',
      isModalVisible: false,
    };
  }

  renderContent() {
    const {navigation} = this.props;
    const {getParam} = navigation;
    let {email, name, passwordConfirm, resetToken} = this.state;
    let verify = getParam('verify');
    let password = getParam('password');
    let account = getParam('account');
    let login = getParam('login');
    let forgotPassword = getParam('forgotPassword');
    let resetPassword = getParam('resetPassword');

    if (verify || forgotPassword) {
      return (
        <Content>
          <Separator />
          <Title>
            {verify
              ? i18n.t('loginEmailLabel')
              : i18n.t('forgotPasswordLabel')}
          </Title>
          <Separator />
          <AuthInput
            label="E-mail"
            placeholder={i18n.t('emailPlaceholder')}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
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
              {i18n.t('loginEmailWelcomeBack')},{' '}
              {this.props.verify_email.payload?.user.name}!
            </Title>
            <Separator />
            <AuthInput
              label="E-mail"
              placeholder={i18n.t('emailPlaceholder')}
              value={email}
              onChangeText={email => this.setState({email})}
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
            />
            <Separator />
            <ScrollIntoView ref={x => (this.passwordInput = x)}>
              <AuthInput
                label={i18n.t('passwordLabel')}
                placeholder={i18n.t('passwordPlaceholder')}
                value={password}
                onChangeText={password => this.setState({password})}
                secureTextEntry
                underlineColorAndroid="transparent"
                onFocus={() => this.passwordInput.scrollIntoView(options)}
              />
            </ScrollIntoView>
          </CustomScrollView>
        </Content>
      );
    } else if (password) {
      return (
        <Content>
          <Separator />
          <Title>{i18n.t('loginExistingEmail')}</Title>
          <Separator />
          <AuthInput
            label={i18n.t('passwordLabel')}
            placeholder={i18n.t('passwordPlaceholder')}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
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
                ? i18n.t('resetPasswordTitle')
                : i18n.t('loginSignup')}
            </Title>
            <Separator />
            {!resetPassword && (
              <View>
                <AuthInput
                  label="E-mail"
                  placeholder={i18n.t('emailPlaceholder')}
                  value={email}
                  onChangeText={email => this.setState({email})}
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
                  label={i18n.t('nameLabel')}
                  placeholder={i18n.t('namePlaceholder')}
                  value={name}
                  onChangeText={text => this.setState({name: text})}
                  underlineColorAndroid="transparent"
                />
                <Separator />
              </View>
            )}

            {resetPassword && (
              <View>
                <AuthInput
                  label={i18n.t('resetTokenLabel')}
                  value={resetToken}
                  onChangeText={text => this.setState({resetToken: text})}
                  underlineColorAndroid="transparent"
                />
                <Separator />
              </View>
            )}
            <ScrollIntoView ref={x => (this.passwordInput = x)}>
              <AuthInput
                label={i18n.t('passwordLabel')}
                placeholder={i18n.t('passwordPlaceholder')}
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                secureTextEntry
                underlineColorAndroid="transparent"
                onFocus={() => this.passwordInput.scrollIntoView(options)}
              />
            </ScrollIntoView>
            {resetPassword && (
              <ScrollIntoView ref={x => (this.passwordConfirmInput = x)}>
                <Separator />

                <AuthInput
                  label={i18n.t('confirmPasswordLabel')}
                  placeholder={i18n.t('confirmPasswordLabel')}
                  value={passwordConfirm}
                  onChangeText={text => this.setState({passwordConfirm: text})}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onFocus={() =>
                    this.passwordConfirmInput.scrollIntoView(options)
                  }
                />
              </ScrollIntoView>
            )}
          </CustomScrollView>
        </Content>
      );
    }
  }

  toggleModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  goToForgotPassword() {
    const {navigation} = this.props;
    navigation.push('EmailAuthScreen', {forgotPassword: true});
  }

  submit() {
    const {navigation} = this.props;
    const {getParam} = navigation;
    let verify = getParam('verify');
    let password = getParam('password');
    let account = getParam('account');
    let login = getParam('login');
    let forgotPassword = getParam('forgotPassword');
    let resetPassword = getParam('resetPassword');

    if (verify) {
      let payload = {email: this.state.email};
      this.props.verifyEmailRequest(payload);
    } else if (forgotPassword) {
      const payload = {
        body: {
          email: this.state.email,
        },
      };

      this.props.userForgotPasswordRequest(payload);
    } else if (resetPassword) {
      const payload = {
        body: {
          token: this.state.resetToken,
          password: this.state.password,
          passwordConfirmation: this.state.passwordConfirm,
        },
      };

      this.props.userResetPasswordRequest(payload);
    } else if (login) {
      let {email, password} = this.state;
      let body = {
        email,
        password,
      };
      let payload = {
        body,
      };
      this.props.loginRequest(payload);
    } else if (password) {
      const id = this.props.verify_email.payload.user.id;
      let {password} = this.state;
      let body = {password};
      let payload = {id, body};
      this.props.userEditRequest(payload);
    } else {
      let {email, name, password} = this.state;

      let body = {
        name,
        email,
        password,
      };

      let payload = {
        body,
      };

      this.props.signUpRequest(payload);
    }
  }

  validateEmail() {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(this.state.email)) {
      return true;
    } else return false;
  }

  render() {
    const {login, signup, verify_email, user, navigation} = this.props;
    const {password, passwordConfirm, resetToken} = this.state;
    const {getParam} = navigation;

    let verify = getParam('verify');
    let forgotPassword = getParam('forgotPassword');
    let resetPassword = getParam('resetPassword');

    return (
      <Container>
        <Header title="" onPressLeft={() => this.props.navigation.goBack()} />
        {this.renderContent()}
        <BottomContainer forgotPassword={verify}>
          {verify && (
            <Button
              title={i18n.t('forgotPasswordButton')}
              onPress={() => this.goToForgotPassword()}
              outline
            />
          )}
          <Separator />
          <Button
            title={i18n.t('topicQuestionContinueButton')}
            onPress={() => this.submit()}
            loading={
              verify_email.fetching ||
              signup.fetching ||
              login.fetching ||
              user.fetching
            }
            disabled={
              !forgotPassword
                ? resetPassword
                  ? password.length < 6 &&
                    passwordConfirm !== password &&
                    !resetToken
                  : (!verify && password.length < 6) || !this.validateEmail()
                : false
            }
          />
        </BottomContainer>
        {/* <KeyboardSpacer /> */}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    verify_email: state.verify_email,
    signup: state.signup,
    login: state.login,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  const {verifyEmailRequest} = VerifyEmailActions;
  const {loginRequest} = LoginActions;
  const {signUpRequest} = SignUpActions;
  const {userEditRequest, userForgotPasswordRequest, userResetPasswordRequest} =
    UserActions;

  return bindActionCreators(
    {
      verifyEmailRequest,
      loginRequest,
      signUpRequest,
      userEditRequest,
      userResetPasswordRequest,
      userForgotPasswordRequest,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailAuthScreen);
