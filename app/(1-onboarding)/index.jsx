import React, { Component } from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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

import { Images, Colors } from "../../constants";

import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

// Styles

class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
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
      ],
      activeSlider: 0,
      showScreen: false,
    };

    this.sliderRefTop = React.createRef();
    this.sliderRefBottom = React.createRef();
  }

  renderItemSlider(item, index) {
    const { data, activeSlider } = this.state;

    return (
      <View>
        <SliderTopContainer>
          <SliderImage image={item.url}></SliderImage>
        </SliderTopContainer>
        <Title maxFontSizeMultiplier={1}>{item.title}</Title>
        <SubTitle maxFontSizeMultiplier={1.0}>{item.text}</SubTitle>
      </View>
    );
  }

  snapToNext(index) {
    this.setState({ activeSlider: index });
    // this.refs.topSlider.snapToItem(index);
  }
  render() {
    const { data, activeSlider, showScreen } = this.state;
    return (
      <Container color={data[activeSlider].color}>
        {/* <OnboardSlider
          ref={"topSlider"}
          images={data}
          loop
          firstItem={this.state.activeSlider}
          renderItem={({ item, index }) => this.renderItemSlider(item, index)}
          snapAction={index => this.snapToNext(index)}
        />
        <SliderPagination
          sliderRef={this.refs.topSlider}
          length={data.length}
          activeSlider={activeSlider}
        /> */}
        <Button onPress={() => router.push("tutorial")}>
          <ButtonText>{i18n.t("buttonSlider")}</ButtonText>
        </Button>
      </Container>
    );
  }
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
