import React, { Component, useState } from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { FadeInRight } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import {
  Container,
  Button,
  ButtonText,
  // OnboardSlider,
  SliderTopContainer,
  SliderBottomContainer,
  BottomSliderContent,
  SliderImage,
  // SliderPagination,
  Title,
  SubTitle,
} from "./LaunchScreenStyles";

import { Images, Colors, Metrics } from "../../constants";

import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

// Styles

function LaunchScreen(props) {
  const slideDataValues = [
    {
      url: Images.onboard1,
      color: "#0A10BA",
      title: i18n.t("titleSlider0"),
      text: i18n.t("textSlider0"),
    },
    {
      url: Images.onboard2,
      color: "#02023C",
      title: i18n.t("titleSlider1"),
      text: i18n.t("textSlider1"),
    },
    {
      url: Images.onboard3,
      color: "#308800",
      title: i18n.t("titleSlider2"),
      text: i18n.t("textSlider2"),
    },
  ];

  const [slideData, setSlideData] = useState(slideDataValues);
  const [activeSlider, setActiveSlider] = useState(0);

  const [mode, setMode] = React.useState("horizontal");
  const [snapDirection, setSnapDirection] = React.useState("left");
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const [loop, setLoop] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [autoPlayReverse, setAutoPlayReverse] = React.useState(false);
  const viewCount = 3;
  return (
    <Container color={slideData[activeSlider].color}>
      <Carousel
        style={{
          width: "100%",
          height: Metrics.screenHeight,
          alignItems: "center",
          justifyContent: "center",
        }}
        width={Metrics.screenWidth}
        height={Metrics.screenHeight}
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        mode={mode}
        loop={loop}
        autoPlay={autoPlay}
        autoPlayReverse={autoPlayReverse}
        data={slideData}
        modeConfig={{
          snapDirection,
          stackInterval: mode === "vertical-stack" ? 8 : 18,
        }}
        onSnapToItem={(index) => setActiveSlider(index)}
        customConfig={() => ({ type: "positive", viewCount })}
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: item.color,
              height: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                backgroundColor: item.color,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <SliderTopContainer>
                <SliderImage image={item.url}></SliderImage>
              </SliderTopContainer>
              <Title maxFontSizeMultiplier={1}>{item.title}</Title>
              <SubTitle maxFontSizeMultiplier={1.0}>{item.text}</SubTitle>
            </View>

            {index === 2 && (
              <Button onPress={() => router.push("tutorial")}>
                <ButtonText>{i18n.t("buttonSlider")}</ButtonText>
              </Button>
            )}
          </View>
        )}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
