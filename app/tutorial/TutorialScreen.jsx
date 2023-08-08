import React, { Component } from "react";
import { Header, Button } from "../../components";
import WebView from "react-native-webview";
import { connect } from "react-redux";

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

class TutorialScreen extends Component {
  goNext() {
    this.props.navigation.pop();
    this.props.navigation.navigate("LoginScreen");
  }
  render() {
    const { navigation, language } = this.props;
    return (
      <Container>
        <Header
          title="Tutorial"
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: "https://www.youtube.com/embed/yPQiwGF8G0w" }}
            // videoId={language.selected == 'en' ? 'yPQiwGF8G0w' : 'wsFF4gqd9fA'}
          />
          <Title>{i18n.t("tutorialTitle")}</Title>
          <Description>{i18n.t("tutorialText")}</Description>
          <TopMargin />
        </ScrollView>
        {/* {!navigation.getParam("isNegotiation") && (
          <BottomContainer>
            <Button
              title={i18n.t("topicQuestionContinueButton")}
              showIcon
              spaced_icons
              onPress={() => this.goNext()}
              bottomMargin
            />
          </BottomContainer>
        )} */}
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
