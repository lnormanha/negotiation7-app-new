import React, { Component } from "react";
import { Linking, TouchableOpacity, ScrollView } from "react-native";
import { Header } from "../../components";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
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
  About,
  LearnMore,
  LearnMoreLink
} from "./AboutScreenStyles";

class AboutScreen extends Component {
  render() {
    return (
      <Container>
        <Header
          title={i18n.t("aboutHeader")}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <Title>{i18n.t("aboutHeader")}</Title>
          <About>{i18n.t("aboutText")}</About>
          <LearnMore>
            {i18n.t("aboutLearn")}{" "}
            <LearnMoreLink
              onPress={() => Linking.openURL("https://www.negotiation7.com")}
            >
              www.negotiation7.com
            </LearnMoreLink>
          </LearnMore>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen);
