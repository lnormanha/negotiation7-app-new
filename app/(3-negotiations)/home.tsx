import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";
import { UserSelectors } from "../../state/redux/user/UserRedux";
import NegotiationsActions, {
  NegotiationsSelectors,
} from "../../state/redux/negotiations/NegotiationsRedux";

import { Images } from "../../constants";

import { Header, TagCard } from "../../components";
import Search from "../../components/SearchBar";
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
  NegotiationInfo,
  ImageContainer,
  ImageNegotiation,
  NegotiationTitleImage,
  AddButton,
  AddIcon,
  ViewButton,
  TextButton,
  SubNegotiationTitleImage,
  BottomMargin,
  BottomContainer,
} from "./HomeScreenStyle";

function HomeScreen(props: any) {
  const { getLocaleString, currentLocale, changeLocale } = useLocalization();

  const [searchText, setSearchText] = React.useState("");
  const [searchedNegotiations, setSearchedNegotiations] = React.useState([]);
  const [tagNegotiations, setTagNegotiations] = React.useState([]);
  const [selectedTag, setSelectedTag] = React.useState();

  React.useState<number>(0);

  const dispatch = useDispatch();

  const negotiations = useSelector(NegotiationsSelectors.getNegotiations);
  const user = useSelector(UserSelectors.getUser);

  const { push } = useRouter();

  let timer;

  React.useEffect(() => {
    AsyncStorage.getItem("showTutorial").then((res) => {
      if (res != null) {
        dispatch(NegotiationsActions.setTutorial(JSON.parse(res)));
      }
    });
  }, []);

  function goToNegotiation(negotiation) {
    dispatch(NegotiationsActions.setCurrent(negotiation));
    dispatch(
      NegotiationsActions.negotiationTopicsRequest({
        id: negotiation.id,
        language: currentLocale,
      })
    );
    dispatch(
      NegotiationsActions.negotiationReportRequest({
        id: negotiation.id,
        language: currentLocale,
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
        return <ListTitle>{getLocaleString("noResults")}</ListTitle>;
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
          <ListTitle>{getLocaleString("foldersTitle")}</ListTitle>
        )}
        <Tags
          data={negotiations.tags}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => renderItemTag(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <ListTitle>
          {getLocaleString("planningsTitle")} -{" "}
          {selectedTag?.name || getLocaleString("all")}
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
            {getLocaleString("homeWelcome")}{" "}
          </SubNegotiationTitleImage>
          {getLocaleString("appName")}
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
        title={getLocaleString("appName")}
        isHome
        onPressProfile={() => push("/profile")}
        language={currentLocale}
      />

      <Search
        onSearch={(text) => searchNegotiations(text)}
        value={searchText}
        placeholder={getLocaleString("searchPlaceholder")}
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
          style={{ gap: 16 }}
          onPress={() => push("/create-negotiation")}
        >
          <TextButton>{getLocaleString("createNewNegotiation")}</TextButton>
          <AddButton>
            <AddIcon />
          </AddButton>
        </ViewButton>
      </BottomContainer>
    </Container>
  );
}

export default HomeScreen;
