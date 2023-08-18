import React from "react";
import { ActivityIndicator, ScrollView, Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { differenceInDays } from "date-fns";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";
import UserActions from "../../state/redux/user/UserRedux";
import NegotiationsActions from "../../state/redux/negotiations/NegotiationsRedux";

import { Header } from "../../components";
import {
  Container,
  TopContainer,
  InfoContent,
  Name,
  Email,
  OptionItem,
  OptionLabel,
  OptionIcon,
  SectionTitle,
  TripsCopyright,
} from "./ProfileScreenStyles";
import Images from "../../constants/Images";

function ProfileScreen(props) {
  const { user, subscription } = props;
  const { payload, fetching } = user;

  const { back, push, replace } = useRouter();
  const { getLocaleString } = useLocalization();

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
      <Header
        title={getLocaleString("profileHeader")}
        onPressLeft={() => back()}
      />
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

        <SectionTitle>{getLocaleString("settings")}</SectionTitle>

        <OptionItem onPress={() => push("languages")}>
          <OptionLabel>{getLocaleString("languageLabel")}</OptionLabel>
          <OptionIcon />
        </OptionItem>

        <OptionItem onPress={() => push("about")}>
          <OptionLabel>{getLocaleString("aboutHeader")}</OptionLabel>
          <OptionIcon />
        </OptionItem>
        <OptionItem onPress={() => push("terms")}>
          <OptionLabel>{getLocaleString("termsHeader")}</OptionLabel>
          <OptionIcon />
        </OptionItem>
        <OptionItem onPress={() => push("privacy-policy")}>
          <OptionLabel>{getLocaleString("privacyHeader")}</OptionLabel>
          <OptionIcon />
        </OptionItem>
        <OptionItem onPress={() => logout()}>
          <OptionLabel>{getLocaleString("logoutLabel")}</OptionLabel>
          <OptionIcon />
        </OptionItem>
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 8,
          marginTop: 30,
          backgroundColor: "#141925",
        }}
      >
        <TripsCopyright>{getLocaleString("devByNetFly")}</TripsCopyright>
        <Image
          source={require("../../assets/images/ln-dev-logo-transparent.png")}
          style={{ width: 80, height: 40 }}
          resizeMode="contain"
        />
        <TripsCopyright>luiznormanha.dev</TripsCopyright>
        <TripsCopyright>v2.0.0 - 2023 ©</TripsCopyright>
      </View>
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
