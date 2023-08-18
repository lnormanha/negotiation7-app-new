import React, { Component, useEffect, useState } from "react";
import { Image, View } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";

function LaunchScreen(props) {
  const { getLocaleString, currentLocale } = useLocalization();

  let slideDataValues = [
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

  const [hasVerifiedUser, setHasVerifiedUser] = useState(false);
  const [slideData, setSlideData] = useState(slideDataValues);
  const [activeSlider, setActiveSlider] = useState(0);

  const [mode, setMode] = React.useState("horizontal");
  const [snapDirection, setSnapDirection] = React.useState("left");
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const [loop, setLoop] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [autoPlayReverse, setAutoPlayReverse] = React.useState(false);
  const viewCount = 3;

  function verifySession() {
    AsyncStorage.getItem("user_id").then((res) => {
      if (res) {
        props.negotiationsListRequest(res);
        props.userRequest(res);
        setTimeout(() => {
          setHasVerifiedUser(true);
          replace("home");
        }, 1000);
      } else {
        setHasVerifiedUser(true);
      }
    });
  }

  useEffect(() => {
    verifySession();
  }, []);

  if (!hasVerifiedUser)
    return (
      <Container color="#0A10BA">
        <Image
          source={
            currentLocale === "en"
              ? require("../../assets/images/launch_screen_en.png")
              : require("../../assets/images/launch_screen.png")
          }
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </Container>
    );

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
        autoPlayInterval={4000}
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
                <SliderImage
                  image={`${Images[`onboard${index + 1}`]}`}
                ></SliderImage>
              </SliderTopContainer>
              <Title maxFontSizeMultiplier={1}>
                {getLocaleString(`titleSlider${index}`)}
              </Title>
              <SubTitle maxFontSizeMultiplier={1.0}>
                {getLocaleString(`textSlider${index}`)}
              </SubTitle>
            </View>

            {index === 2 && (
              <Button onPress={() => router.push("tutorial")}>
                <ButtonText>{getLocaleString("buttonSlider")}</ButtonText>
              </Button>
            )}
          </View>
        )}
      />
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          bottom: 16,
          width: "50%",
          justifyContent: "space-around",
          alignSelf: "center",
        }}
      >
        {slideData.map((pagination, index) => (
          <View
            style={{
              height: 16,
              width: 16,
              borderRadius: 16,
              backgroundColor: index === activeSlider ? "#3366bb" : "#fff",
            }}
          />
        ))}
      </View>
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
