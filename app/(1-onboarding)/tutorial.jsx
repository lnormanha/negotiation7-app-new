import React, { Component } from "react";
import { Header, Button } from "../../components";
import WebView from "react-native-webview";
import { connect } from "react-redux";
import { router } from "expo-router";

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
  Description,
  TopMargin,
  BottomContainer,
} from "./TutorialScreenStyles";
import { ScrollView } from "react-native-gesture-handler";
import { Metrics } from "../../constants";
import { View } from "react-native";

class TutorialScreen extends Component {
  goNext() {
    router.replace("login");
    //   this.props.navigation.navigate("LoginScreen");
  }
  render() {
    // const { navigation, language } = this.props;
    return (
      <Container>
        <Header title="Tutorial" onPressLeft={() => router.back()} />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            height: 900,
          }}
        >
          <Title>{i18n.t("tutorialTitle")}</Title>
          <WebView
            style={{ flex: 1, width: Metrics.screenWidth, height: 900 }}
            source={{
              uri: "https://www.youtube.com/embed/yPQiwGF8G0w",
            }}
            // videoId={language.selected == 'en' ? 'yPQiwGF8G0w' : 'wsFF4gqd9fA'}
          />
          <Description>{i18n.t("tutorialText")}</Description>
          <TopMargin />
        </ScrollView>

        <BottomContainer>
          <Button
            title={i18n.t("topicQuestionContinueButton")}
            showIcon
            spaced_icons
            onPress={() => this.goNext()}
            bottomMargin
          />
        </BottomContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialScreen);
