import React, { Component, useEffect, useState } from "react";
import { View } from "react-native";
import { Link, router, useRouter } from "expo-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Carousel from "react-native-reanimated-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useLocalization } from "@/context/LocalizationProvider";
import NegotiationsActions, {
  NegotiationsSelectors,
} from "../../state/redux/negotiations/NegotiationsRedux";
import UserActions, { UserSelectors } from "../../state/redux/user/UserRedux";

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

function LaunchScreen(props) {
  const { getLocaleString } = useLocalization();

  const slideDataValues = [
    {
      url: Images.onboard1,
      color: "#0A10BA",
      title: getLocaleString("titleSlider0"),
      text: getLocaleString("textSlider0"),
    },
    {
      url: Images.onboard2,
      color: "#02023C",
      title: getLocaleString("titleSlider1"),
      text: getLocaleString("textSlider1"),
    },
    {
      url: Images.onboard3,
      color: "#308800",
      title: getLocaleString("titleSlider2"),
      text: getLocaleString("textSlider2"),
    },
  ];

  const { replace } = useRouter();

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

  function verifySession() {
    AsyncStorage.getItem("user_id").then((res) => {
      if (res) {
        props.negotiationsListRequest(res);
        props.userRequest(res);
        setTimeout(() => {
          replace("home");
        }, 1000);
      }
    });
  }

  useEffect(() => {
    verifySession();
  }, []);

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
                <ButtonText>{getLocaleString("buttonSlider")}</ButtonText>
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
  const { negotiationsListRequest } = NegotiationsActions;
  const { userRequest } = UserActions;
  return bindActionCreators({ userRequest, negotiationsListRequest }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
