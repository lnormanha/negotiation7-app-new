import React from "react";
import { Linking, ScrollView } from "react-native";
import { Header } from "../../components";
import { connect } from "react-redux";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";

import {
  Container,
  Title,
  About,
  LearnMore,
  LearnMoreLink,
} from "./AboutScreenStyles";

function AboutScreen(props) {
  const { back } = useRouter();
  const { getLocaleString } = useLocalization();

  return (
    <Container>
      <Header
        title={getLocaleString("aboutHeader")}
        onPressLeft={() => back()}
      />
      <ScrollView>
        <Title>{getLocaleString("aboutHeader")}</Title>
        <About>{getLocaleString("aboutText")}</About>
        <LearnMore>
          {getLocaleString("aboutLearn")}{" "}
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen);
