import React, { Component } from "react";
import { Header } from "../../components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LanguageActions from "../../state/redux/languages/LanguageRedux";
import { useLocalization } from "@/context/LocalizationProvider";

import {
  Container,
  Text,
  LanguageItem,
  LanguageLabel,
  CheckIcon,
} from "./LanguageScreenStyles";
import { useRouter } from "expo-router";

function LanguageScreen(props) {
  // constructor(props) {
  //   super(props);
  //   // startLocalizeListener("change", this.handleLocalizationChange);
  // }

  // componentWillUnmount() {
  //   stopLocalizeListener("change", this.handleLocalizationChange);
  // }

  // handleLocalizationChange = language => {
  //   setI18nConfig(language, false);
  //   this.props.setLanguage(language);
  //   this.forceUpdate();
  // };

  const { getLocaleString, changeLocale, currentLocale } = useLocalization();

  const { back } = useRouter();

  return (
    <Container>
      <Header
        title={getLocaleString("languageHeader")}
        onPressLeft={() => back()}
      />
      <LanguageItem onPress={() => changeLocale("en")}>
        <LanguageLabel>{getLocaleString("english")}</LanguageLabel>
        {currentLocale == "en" && <CheckIcon />}
      </LanguageItem>
      <LanguageItem onPress={() => changeLocale("pt")}>
        <LanguageLabel>{getLocaleString("portuguese")}</LanguageLabel>
        {currentLocale == "pt" && <CheckIcon />}
      </LanguageItem>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch) => {
  const { setLanguage } = LanguageActions;

  return bindActionCreators({ setLanguage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);
