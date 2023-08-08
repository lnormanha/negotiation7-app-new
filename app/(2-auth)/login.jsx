import * as React from "react";
import {
  View,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";

import { GoogleButton } from "../../components";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  LoginTop,
  Welcome,
  ChooseLogin,
  ButtonContainer,
  ButtonEmailContainer,
  ButtonEmailLabel,
  LinkText,
  TextsContainer,
} from "./LoginScreenStyles";

import { useRouter } from "expo-router";
import { LanguageSelectors } from "../../state/redux/languages/LanguageRedux";

import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

export default function LoginScreen() {
  const dispatch = useDispatch();

  const selectedLanguage = useSelector(LanguageSelectors.getLanguage);
  // const isLoadingGoogleSignIn = useSelector(GoogleAuthSelectors.getIsLoading);
  const [credentialStateForUser, updateCredentialStateForUser] =
    React.useState(-1);

  let user = null;

  // React.useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "987104648795-gvk237mou6cctfi78b514cbejma4vscn.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access),
  //     iosClientId:
  //       "987104648795-vd7tkph2lu9mvqtasv1bkb307l53jj6r.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  //   });
  // }, []);

  // const googleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const body = userInfo.user;
  //     const payload = {
  //       body,
  //     };

  //     dispatch(GoogleAuthActions.googleAuthRequest(payload));
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log({ error, type: "SIGN_IN_CANCELLED" });

  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log({ error, type: "IN_PROGRESS" });

  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log({ error, type: "PLAY_SERVICES_NOT_AVAILABLE" });

  //       // play services not available or outdated
  //     } else {
  //       console.log({ error });
  //       // some other error happened
  //     }
  //   }
  // };

  const { push, back } = useRouter();

  return (
    <Container>
      <LoginTop language={selectedLanguage} />
      <Welcome>{i18n.t("loginWelcome")}</Welcome>
      <ChooseLogin>{i18n.t("loginContinue")}</ChooseLogin>

      <ScrollView />
      <ButtonEmailContainer onPress={() => push("email-auth?verify=true")}>
        <ButtonEmailLabel>E-mail</ButtonEmailLabel>
      </ButtonEmailContainer>

      <TextsContainer>
        <TouchableOpacity onPress={() => push("terms")}>
          <LinkText>{i18n.t("termsHeader")}</LinkText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => push("PrivacyPolicyScreen")}>
          <LinkText>{i18n.t("privacyHeader")}</LinkText>
        </TouchableOpacity>
      </TextsContainer>
    </Container>
  );
}
