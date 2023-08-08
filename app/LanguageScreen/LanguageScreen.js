import React, { Component } from "react";
import { Header } from "../../components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LanguageActions from "../../state/redux/languages/LanguageRedux";
import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {
  Container,
  Text,
  LanguageItem,
  LanguageLabel,
  CheckIcon
} from "./LanguageScreenStyles";

class LanguageScreen extends Component {
  constructor(props) {
    super(props);
    // startLocalizeListener("change", this.handleLocalizationChange);
  }

  // componentWillUnmount() {
  //   stopLocalizeListener("change", this.handleLocalizationChange);
  // }

  // handleLocalizationChange = language => {
  //   setI18nConfig(language, false);
  //   this.props.setLanguage(language);
  //   this.forceUpdate();
  // };

  render() {
    const { language } = this.props;
    return (
      <Container>
        <Header
          title={i18n.t("languageHeader")}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        {/* <LanguageItem onPress={() => this.handleLocalizationChange("en")}>
          <LanguageLabel>{i18n.t("english")}</LanguageLabel>
          {language.selected == "en" && <CheckIcon />}
        </LanguageItem>
        <LanguageItem onPress={() => this.handleLocalizationChange("pt")}>
          <LanguageLabel>{i18n.t("portuguese")}</LanguageLabel>
          {language.selected == "pt" && <CheckIcon />}
        </LanguageItem> */}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language };
};

const mapDispatchToProps = dispatch => {
  const { setLanguage } = LanguageActions;

  return bindActionCreators({ setLanguage }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageScreen);
