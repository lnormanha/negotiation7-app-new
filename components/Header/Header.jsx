import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "expo-router";

import {
  Container,
  Title,
  LeftIcons,
  LogoIcon,
  RightIconsArea,
  RightIconsContainer,
  RightIcons,
  LeftIconsContainer,
  LeftIconsArea,
  LogoContainer,
  PreviewButton,
  PreviewLabel,
} from "./HeaderStyle";
import { Icons, Images } from "../../constants";
// import { i18n.t, setI18nConfig } from "../Services/TranslationService";

export default class Header extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    showRightButton: PropTypes.bool,
    rightIcon: PropTypes.string,
    leftIcon: PropTypes.string,
    onPressLeft: PropTypes.func,
    onPressRight: PropTypes.func,
    onPressReport: PropTypes.func,
    onPressProfile: PropTypes.func,
    isHome: PropTypes.bool,
    isNegotiation: PropTypes.bool,
    iconUser: PropTypes.string,
    imageLogo: PropTypes.Strings,
    imageBack: PropTypes.Strings,
    imageClose: PropTypes.Strings,
    imageReport: PropTypes.string,
    language: PropTypes.string,
  };

  // Defaults for props
  static defaultProps = {
    title: "Screen",
    imageLogo: Images.logo,
    iconBell: Icons.bell,
    iconUser: Icons.user,
    rightIcon: Icons.close,
    imageLanding: Icons.landing,
    imageClose: Icons.close,
    imageBack: Icons.back,
    imageReport: Icons.report,
  };

  renderHome() {
    const { title, isHome, iconBell, iconUser, onPressProfile, language } =
      this.props;
    return (
      <Container isHome>
        <LeftIconsContainer>
          <LogoIcon
            image={language == "en" ? Images.logo_name_en : Images.logo_name}
          />
          {/* <Title isHome>{title}</Title> */}
        </LeftIconsContainer>
        {/* 28/10 Jr: Falta Funcionalidades */}
        <RightIconsContainer>
          {/*<RightIconsArea>
            <RightIcons image={iconBell} />
          </RightIconsArea> */}
          <RightIconsArea onPress={onPressProfile}>
            <RightIcons image={iconUser} />
          </RightIconsArea>
        </RightIconsContainer>
      </Container>
    );
  }

  renderNegotiation() {
    const {
      title,
      imageBack,
      onPressLeft,
      onPressReport,
      imageUser,
      imageReport,
    } = this.props;
    return (
      <Container isNegotiation>
        <LeftIconsContainer>
          <LeftIconsArea onPress={onPressLeft}>
            <LeftIcons image={imageBack} />
          </LeftIconsArea>
          <Title isNegotiation>{title}</Title>
        </LeftIconsContainer>
        <RightIconsContainer>
          <PreviewButton onPress={onPressReport}>
            <PreviewLabel>Report</PreviewLabel>
          </PreviewButton>
        </RightIconsContainer>
      </Container>
    );
  }

  defaultHeader() {
    const {
      title,
      imageBack,
      rightIcon,
      onPressLeft,
      onPressRight,
      showRightButton,
    } = this.props;
    return (
      <Container>
        <LeftIconsContainer>
          <LeftIconsArea onPress={onPressLeft}>
            <LeftIcons image={imageBack}></LeftIcons>
          </LeftIconsArea>
        </LeftIconsContainer>
        <Title>{title}</Title>
        <RightIconsContainer>
          <RightIconsArea onPress={onPressRight}>
            {showRightButton && <RightIcons image={rightIcon}></RightIcons>}
          </RightIconsArea>
        </RightIconsContainer>
      </Container>
    );
  }
  renderHeader() {
    const { isHome, isNegotiation } = this.props;

    if (isHome) {
      return this.renderHome();
    } else if (isNegotiation) {
      return this.renderNegotiation();
    } else {
      return this.defaultHeader();
    }
  }

  render() {
    return this.renderHeader();
  }
}
