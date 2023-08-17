import React from "react";
import { Header, TagCard } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NegotiationsActions, {
  NegotiationsSelectors,
} from "../../state/redux/negotiations/NegotiationsRedux";
import LanguageActions, {
  LanguageSelectors,
} from "../../state/redux/languages/LanguageRedux";

import {
  Container,
  NegotiationsContainer,
  ListTitle,
  Tags,
  Negotiations,
  Negotiation,
  NegotiationIcon,
  NegotiationName,
  NegotiationArea,
  NegotiationInfoRow,
  NegotiationInfo,
  InfoIcon,
  ImageContainer,
  ImageNegotiation,
  NegotiationTitleImage,
  DescriptionNegotiation,
  UnderLineText,
  AddButton,
  AddIcon,
  ViewButton,
  TextButton,
  SubText,
  SubNegotiationTitleImage,
  BottomMargin,
  BottomContainer,
  Bar,
  SubInfoArea,
  SubRemainingText,
  ProgressContainer,
  Progress,
  ProgressText,
} from "./HomeScreenStyle";

import negotiations_list from "../../mocks/negotiations.json";
import { Icons, Images, Colors } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Search from "../../components/SearchBar";
import { UserSelectors } from "../../state/redux/user/UserRedux";
import { differenceInDays, nextDay } from "date-fns";
import { SubscriptionSelectors } from "../../state/redux/subscription/SubscriptionRedux";
import SubscriptionActions from "../../state/redux/subscription/SubscriptionRedux";
import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";
import { useRouter } from "expo-router";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

function HomeScreen(props: any) {
  const [searchText, setSearchText] = React.useState("");
  const [searchedNegotiations, setSearchedNegotiations] = React.useState([]);
  const [tagNegotiations, setTagNegotiations] = React.useState([]);
  const [selectedTag, setSelectedTag] = React.useState();
  const [subProgress, setSubProgress] = React.useState<number>(1);
  const [differenceInDaysSub, setDifferenceInDaysSub] =
    React.useState<number>(0);

  const dispatch = useDispatch();

  const negotiations = useSelector(NegotiationsSelectors.getNegotiations);
  const user = useSelector(UserSelectors.getUser);
  const selectedLanguage = useSelector(LanguageSelectors.getLanguage);
  const subscription = useSelector(SubscriptionSelectors.getSubscription);

  const { push } = useRouter();

  let timer;

  React.useEffect(() => {
    AsyncStorage.getItem("language").then((res) => {
      if (res != null) {
        dispatch(LanguageActions.setLanguage(res));
      }
    });

    AsyncStorage.getItem("showTutorial").then((res) => {
      if (res != null) {
        dispatch(NegotiationsActions.setTutorial(JSON.parse(res)));
      }
    });
  }, []);

  React.useEffect(() => {
    if (user.payload) {
      dispatch(SubscriptionActions.subscriptionDataRequest(user.payload.id));
    }
  }, [user]);

  React.useEffect(() => {
    if (subscription) {
      const startDate = new Date();
      const expiryDate = new Date(subscription.expires_in);
      const duration = 30;

      const dif = differenceInDays(expiryDate, startDate);

      const progress = (dif / duration) * 100;

      setDifferenceInDaysSub(dif);
      setSubProgress(progress);
    }
  }, [subscription]);

  function goToNegotiation(negotiation) {
    dispatch(NegotiationsActions.setCurrent(negotiation));
    dispatch(
      NegotiationsActions.negotiationTopicsRequest({
        id: negotiation.id,
        language: selectedLanguage,
      })
    );
    dispatch(
      NegotiationsActions.negotiationReportRequest({
        id: negotiation.id,
        language: selectedLanguage,
      })
    );
    push("/negotiation");
  }

  function searchNegotiations(text) {
    timer != "undefined" && clearTimeout(timer);

    let searchedArray = [];

    setSearchText(text);

    if (tagNegotiations.length > 0) {
      searchedArray = tagNegotiations.filter((element) => {
        if (element.title.toLowerCase().includes(text.toLowerCase())) {
          return element;
        }
      });
    } else {
      searchedArray = negotiations.list.filter((element) => {
        if (element.title.toLowerCase().includes(text.toLowerCase())) {
          return element;
        }
      });
    }
    timer = setTimeout(() => {
      setSearchedNegotiations(searchedArray);
    }, 500);
  }

  function filterNegotiationsByTag(tag) {
    if (!selectedTag || selectedTag.id != tag.id) {
      let tag_negotiations = [];
      if (searchText) {
        searchedNegotiations.forEach((negotiation, index) => {
          negotiation.tags.forEach((tagNegotiation, index) => {
            if (tag.id == tagNegotiation.id) {
              console.log({ negotiation });
              tag_negotiations.push(negotiation);
            }
          });
        });
      } else {
        negotiations.list.forEach((negotiation, index) => {
          negotiation.tags.forEach((tagNegotiation, index) => {
            if (tag.id == tagNegotiation.id) {
              console.log({ negotiation });
              tag_negotiations.push(negotiation);
            }
          });
        });
      }

      console.log({ tag_negotiations });

      setTagNegotiations(tag_negotiations);
      setSelectedTag(tag);
    } else {
      setTagNegotiations([]);
      setSelectedTag(null);
    }
  }

  function verifyHasTags(negotiations) {
    let tagsCount = 0;

    negotiations.forEach((negotiation) => {
      if (negotiation.tags.length > 0) {
        tagsCount = +1;
      }
    });

    if (tagsCount > 0) {
      return true;
    } else return false;
  }

  function renderItemNegotiation(item) {
    return (
      <Negotiation onPress={() => goToNegotiation(item)}>
        <NegotiationIcon />
        <NegotiationArea>
          <NegotiationName>{item.title}</NegotiationName>
          <NegotiationInfo>
            {item.tags?.map((element, index) => {
              return `${element.name} ${
                index == item.tags.length - 1 ? "" : "-"
              }`;
            })}
          </NegotiationInfo>
        </NegotiationArea>
      </Negotiation>
    );
  }

  function renderItemTag(item) {
    if (item.negotiations_qty > 0)
      return (
        <TagCard
          name={item.name}
          quantity={item.negotiations_qty}
          onPress={() => filterNegotiationsByTag(item)}
          selected={selectedTag?.id == item.id}
        />
      );
  }

  function renderNegotiationList() {
    if (searchText) {
      if (searchedNegotiations.length > 0) {
        return (
          <Negotiations
            data={searchedNegotiations}
            renderItem={({ item }) => renderItemNegotiation(item)}
            keyExtractor={(item) => item.name}
            // ListFooterComponent={<BottomContainer />}
            showsVerticalScrollIndicator={false}
          />
        );
      } else {
        return <ListTitle>{i18n.t("noResults")}</ListTitle>;
      }
    } else if (tagNegotiations.length > 0) {
      return (
        <Negotiations
          data={tagNegotiations}
          renderItem={({ item }) => renderItemNegotiation(item)}
          keyExtractor={(item) => item.name}
          // ListFooterComponent={<BottomContainer />}
          showsVerticalScrollIndicator={false}
        />
      );
    } else {
      return (
        <Negotiations
          data={negotiations.list}
          renderItem={({ item }) => renderItemNegotiation(item)}
          keyExtractor={(item) => item.name}
          // ListFooterComponent={<BottomContainer />}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  }

  function renderNegotiations() {
    return (
      <NegotiationsContainer showsVerticalScrollIndicator={false}>
        {verifyHasTags(negotiations.list) && (
          <ListTitle>{i18n.t("foldersTitle")}</ListTitle>
        )}
        <Tags
          data={negotiations.tags}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => renderItemTag(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <ListTitle>
          {i18n.t("planningsTitle")} - {selectedTag?.name || i18n.t("all")}
        </ListTitle>
        {renderNegotiationList()}
        <BottomMargin />
      </NegotiationsContainer>
    );
  }

  function renderDefault() {
    return (
      <ImageContainer>
        <ImageNegotiation image={Images.negotiation} />
        <NegotiationTitleImage>
          <SubNegotiationTitleImage>
            {i18n.t("homeWelcome")}{" "}
          </SubNegotiationTitleImage>
          {i18n.t("appName")}
        </NegotiationTitleImage>
      </ImageContainer>
    );
  }
  function renderContentHome() {
    if (negotiations.list.length > 0) {
      return renderNegotiations();
    } else {
      return renderDefault();
    }
  }

  return (
    <Container>
      <Header
        title={i18n.t("appName")}
        isHome
        onPressProfile={() => push("/profile")}
        language={selectedLanguage}
      />
      {/* <SubInfoArea hasSubscription={user?.payload?.has_subscription}>
        <SubRemainingText>
          {i18n.t("welcomeMessage")} {user.payload?.name.split(" ")[0]}{" "}
          {user.payload?.name.split(" ")[1]}
        </SubRemainingText>

        {user?.payload?.has_subscription && (
          <SubRemainingText>
            {subscription?.type === "TRIAL"
              ? i18n.t("trialSubscriptionExpires")
              : i18n.t("subscriptionExpires")}
          </SubRemainingText>
        )}
        {user?.payload?.has_subscription && (
          <ProgressContainer>
            <Progress width={subProgress} />
            <ProgressText>
              {subscription?.hasExpired
                ? i18n.t("expired")
                : `${differenceInDaysSub} ${i18n.t("days")}`}
            </ProgressText>
          </ProgressContainer>
        )}
      </SubInfoArea> */}
      <Search
        onSearch={(text) => searchNegotiations(text)}
        value={searchText}
        placeholder={i18n.t("searchPlaceholder")}
      />

      {negotiations.fetching ? (
        <View
          style={{
            flex: 0.9,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        renderContentHome()
      )}

      <BottomContainer>
        <ViewButton
          onPress={() => push("/create-negotiation")}
          disabled={!user.payload?.has_subscription}
        >
          <TextButton>{i18n.t("createNewNegotiation")}</TextButton>
          <AddButton>
            <AddIcon />
          </AddButton>
        </ViewButton>
      </BottomContainer>
    </Container>
  );
}

export default HomeScreen;
