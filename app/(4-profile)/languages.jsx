import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";

import { Header } from "../../components";
import {
  Container,
  LanguageItem,
  LanguageLabel,
  CheckIcon,
} from "./LanguageScreenStyles";

function LanguageScreen() {
  const { getLocaleString, changeLocale, currentLocale } = useLocalization();

  const { back } = useRouter();

  return (
    <Container>
      <Header
        title={getLocaleString("languageHeader")}
        onPressLeft={() => back()}
      />
      <LanguageItem onPress={() => changeLocale("en-US")}>
        <LanguageLabel>{getLocaleString("english")}</LanguageLabel>
        {currentLocale == "en" && <CheckIcon />}
      </LanguageItem>
      <LanguageItem onPress={() => changeLocale("pt-BR")}>
        <LanguageLabel>{getLocaleString("portuguese")}</LanguageLabel>
        {currentLocale == "pt" && <CheckIcon />}
      </LanguageItem>
    </Container>
  );
}

export default LanguageScreen;
