import React, { Component } from "react";
import {
  ActivityIndicator,
  Platform,
  Linking,
  ScrollView,
  Image,
  View,
} from "react-native";
import { Header } from "../../components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { differenceInDays } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Images from "../../constants/Images";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import UserActions from "../../state/redux/user/UserRedux";
import NegotiationsActions from "../../state/redux/negotiations/NegotiationsRedux";

// Styles
import {
  Container,
  TopContainer,
  AvatarContainer,
  InfoContent,
  Name,
  Email,
  OptionItem,
  OptionLabel,
  OptionIcon,
  SectionTitle,
  SubType,
  SubInfoContent,
  ManageSubLabel,
  ProgressContainer,
  Progress,
  ProgressText,
  TripsCopyright,
} from "./ProfileScreenStyles";

import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";
import { useRouter } from "expo-router";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

function ProfileScreen(props) {
  const { user, subscription } = props;
  const { payload, fetching } = user;

  const { back, push, replace } = useRouter();

  const expiryDate = subscription
    ? new Date(subscription?.subscription_data?.expires_in)
    : new Date();
  const startDate = new Date();
  const duration = 30;
  const dif = differenceInDays(expiryDate, startDate);
  const subProgress = (dif / duration) * 100;

  function logout() {
    props.userLogout();
    props.setTutorial(true);
    AsyncStorage.removeItem("user_id");
    // props.navigation.popToTop();
    replace("login");
    props.negotiationsReset();
  }

  return (
    <Container>
      <Header title={i18n.t("profileHeader")} onPressLeft={() => back()} />
      <ScrollView>
        <TopContainer>
          {fetching ? (
            <InfoContent>
              <ActivityIndicator size="large" color="black" />
            </InfoContent>
          ) : (
            <InfoContent>
              <Name>{payload?.name}</Name>
              <Email>{payload?.email}</Email>
            </InfoContent>
          )}
        </TopContainer>
        {/* 
        <SectionTitle>{i18n.t("subscriptionHeader")}</SectionTitle>
        {subscription?.subscription_data && (
          <SubType>
            {i18n.t("subType")}{" "}
            {subscription?.subscription_data?.type !== "TRIAL" &&
              subscription?.subscription_data?.subscription_plan ===
                "ANNUALLY" &&
              i18n.t("annual")}
            {subscription?.subscription_data?.type !== "TRIAL" &&
              subscription?.subscription_data?.subscription_plan ===
                "MONTHLY" &&
              i18n.t("monthly")}
            {subscription?.subscription_data?.type === "TRIAL" &&
              `${i18n.t("trial")}`}
          </SubType>
        )} */}

        {payload?.has_subscription && (
          <ProgressContainer>
            <Progress width={subProgress} />
            <ProgressText>
              {subscription?.subscription_data?.hasExpired
                ? i18n.t("expired")
                : `${differenceInDays(expiryDate, startDate)} ${i18n.t(
                    "days"
                  )} ${i18n.t("remaining")}`}
            </ProgressText>
          </ProgressContainer>
        )}

        {/* <OptionItem
          onPress={() => props.navigation.navigate("SubscriptionScreen")}
        >
          <OptionLabel>
            {payload?.has_subscription &&
            subscription?.subscription_data?.type !== "TRIAL"
              ? i18n.t("changePlan")
              : i18n.t("subscribe")}
          </OptionLabel>
          <OptionIcon />
        </OptionItem>
        {payload?.has_subscription &&
          subscription?.subscription_data?.type !== "TRIAL" && (
            <OptionItem>
              <OptionLabel>{i18n.t("subManage")}</OptionLabel>
              <OptionIcon />
            </OptionItem>
          )} */}

        <SectionTitle>{i18n.t("settings")}</SectionTitle>

        <OptionItem onPress={() => push("languages")}>
          <OptionLabel>{i18n.t("languageLabel")}</OptionLabel>
          <OptionIcon />
        </OptionItem>

        <OptionItem onPress={() => push("about")}>
          <OptionLabel>{i18n.t("aboutHeader")}</OptionLabel>
          <OptionIcon />
        </OptionItem>
        <OptionItem onPress={() => push("terms")}>
          <OptionLabel>{i18n.t("termsHeader")}</OptionLabel>
          <OptionIcon />
        </OptionItem>
        <OptionItem onPress={() => push("privacy-policy")}>
          <OptionLabel>{i18n.t("privacyHeader")}</OptionLabel>
          <OptionIcon />
        </OptionItem>
        <OptionItem onPress={() => logout()}>
          <OptionLabel>{i18n.t("logoutLabel")}</OptionLabel>
          <OptionIcon />
        </OptionItem>

        <View
          style={{
            alignItems: "center",
            paddingVertical: 24,
            marginVertical: 30,
            backgroundColor: "#017cba",
          }}
        >
          <TripsCopyright>{i18n.t("devByNetFly")}</TripsCopyright>
          <Image
            source={Images.logo_netfly}
            style={{ width: 256, height: 256 }}
            resizeMode="contain"
          />
          <TripsCopyright>v1.3.6 - 2022 ©</TripsCopyright>
        </View>
      </ScrollView>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    language: state.language,
    subscription: state.subscription,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { userRequest, userLogout } = UserActions;
  const { negotiationsReset, setTutorial } = NegotiationsActions;

  return bindActionCreators(
    { userRequest, userLogout, negotiationsReset, setTutorial },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
