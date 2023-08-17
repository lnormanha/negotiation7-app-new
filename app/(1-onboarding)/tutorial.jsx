import React, { Component } from "react";
import { Header, Button } from "../../components";
import WebView from "react-native-webview";
import { connect } from "react-redux";
import { router } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";

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

function TutorialScreen(props) {
  const { getLocaleString, currentLocale } = useLocalization();

  function goNext() {
    router.replace("login");
  }

  return (
    <Container>
      <Header title="Tutorial" onPressLeft={() => router.back()} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          height: 900,
        }}
      >
        <Title>{getLocaleString("tutorialTitle")}</Title>
        <WebView
          style={{ flex: 1, width: Metrics.screenWidth, height: 900 }}
          source={{
            uri:
              currentLocale === "en"
                ? "https://www.youtube.com/embed/yPQiwGF8G0w"
                : "https://www.youtube.com/embed/wsFF4gqd9fA",
          }}
        />
        <Description>{getLocaleString("tutorialText")}</Description>
        <TopMargin />
      </ScrollView>

      <BottomContainer>
        <Button
          title={getLocaleString("topicQuestionContinueButton")}
          showIcon
          spaced_icons
          onPress={() => goNext()}
          bottomMargin
        />
      </BottomContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialScreen);
