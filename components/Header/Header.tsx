import React from "react";
import { useLocalization } from "@/context/LocalizationProvider";

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
  PreviewButton,
  PreviewLabel,
} from "./HeaderStyle";
import { Icons, Images } from "../../constants";

interface HeaderProps {
  title: string;
  showRightButton?: boolean;
  rightIcon?: string;
  leftIcon?: string;
  onPressLeft?(): void;
  onPressRight?(): void;
  onPressReport?(): void;
  onPressProfile?(): void;
  isHome?: boolean;
  isNegotiation?: boolean;
  iconUser?: string;
  imageLogo?: string;
  imageBack?: string;
  imageClose?: string;
  imageReport?: string;
  language?: string;
}

export default function Header({
  title = "Screen",
  showRightButton,
  rightIcon,
  leftIcon,
  onPressLeft,
  onPressRight,
  onPressReport,
  onPressProfile,
  isHome,
  isNegotiation,
  iconUser = Icons.user,
  imageLogo = Images.logo,
  imageBack = Icons.back,
  imageClose = Icons.close,
  imageReport = Icons.report,
  language,
}: HeaderProps) {
  // Prop type warnings
  const { getLocaleString } = useLocalization();

  function renderHome() {
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

  function renderNegotiation() {
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
            <PreviewLabel>{getLocaleString("preview")}</PreviewLabel>
          </PreviewButton>
        </RightIconsContainer>
      </Container>
    );
  }

  function defaultHeader() {
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
            {showRightButton && (
              <RightIcons
                image={rightIcon}
                tintiColor={isHome ? Colors.white : Colors.black}
              ></RightIcons>
            )}
          </RightIconsArea>
        </RightIconsContainer>
      </Container>
    );
  }
  function renderHeader() {
    if (isHome) {
      return renderHome();
    } else if (isNegotiation) {
      return renderNegotiation();
    } else {
      return defaultHeader();
    }
  }

  return renderHeader();
}
