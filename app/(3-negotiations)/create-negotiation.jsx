import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { useRouter } from "expo-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlatList } from "react-native-gesture-handler";

import { useLocalization } from "@/context/LocalizationProvider";
import NegotiationsActions from "../../state/redux/negotiations/NegotiationsRedux";

import { Header, Input, Button, KeyboardSpacer } from "../../components";

import {
  Container,
  FolderImage,
  InputMargin,
  ChooseTagLabel,
  TagContainer,
  Tag,
  TagLabel,
  AlignToBottom,
} from "./CreateNegotiationScreenStyles";

const CustomScrollView = wrapScrollView(ScrollView);
const options = {
  align: "top",
  animated: true,
  immediate: false,
  insets: {
    top: 150,
    bottom: 0,
  },
};

function CreateNegotiationScreen(props) {
  const { negotiations, user } = props;
  const { getLocaleString } = useLocalization();

  const initialState = {
    name: "",
    tag: "",
    selectedTag: null,
  };

  const [state, setState] = useState(initialState);

  const { push, back } = useRouter();

  const { tag, name, selectedTag } = state;

  function getTag() {
    if (selectedTag) {
      return selectedTag;
    } else {
      return { name: tag };
    }
  }

  function createNegotiation() {
    let payload;

    if (tag || selectedTag) {
      payload = {
        body: {
          id_user: user.payload.id,
          title: name,
          tags: [
            {
              ...getTag(),
            },
          ],
        },
      };
    } else {
      payload = {
        body: {
          id_user: user.payload.id,
          title: name,
        },
      };
    }

    props.negotiationCreateRequest(payload);
  }

  function renderTagOptions() {
    return (
      <TagContainer>
        {negotiations.tags.length > 0 && (
          <View>
            <ChooseTagLabel>{getLocaleString("chooseTag")}</ChooseTagLabel>
            <FlatList
              data={negotiations.tags}
              renderItem={({ item }) => {
                return (
                  <Tag
                    onPress={() =>
                      setState({
                        ...state,
                        selectedTag: selectedTag ? null : item,
                        tag: "",
                      })
                    }
                    selected={selectedTag?.id == item.id}
                  >
                    <TagLabel selected={selectedTag?.id == item.id}>
                      {item.name}
                    </TagLabel>
                  </Tag>
                );
              }}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 30 }}
              showsHorizontalScrollIndicator={false}
            />
            <ChooseTagLabel>{getLocaleString("orTag")}</ChooseTagLabel>
          </View>
        )}
        <ScrollIntoView ref={(x) => (tagInput = x)}>
          <Input
            placeholder={getLocaleString("foldersPlaceholder")}
            onChangeText={(tag) =>
              setState({ ...state, tag, selectedTag: null })
            }
            value={tag}
            name={getLocaleString("foldersLabel")}
            underlineColorAndroid="transparent"
            onFocus={() => tagInput.scrollIntoView(options)}
          />
        </ScrollIntoView>
      </TagContainer>
    );
  }

  function disableButton() {
    if (name != "") {
      return false;
    } else return true;
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior="position">
        <Header
          title={getLocaleString("createNegotiationHeader")}
          onPressLeft={() => back()}
        />
        <CustomScrollView>
          <FolderImage />
          <ScrollIntoView ref={(x) => (nameInput = x)}>
            <Input
              placeholder={getLocaleString("negotiationNamePlaceholder")}
              name={getLocaleString("negotiationNameLabel")}
              onChangeText={(name) => setState({ ...state, name })}
              value={name}
              onSubmitEditing={() => tagInput.scrollIntoView(options)}
              onFocus={() => nameInput.scrollIntoView(options)}
              underlineColorAndroid="transparent"
            />
          </ScrollIntoView>

          <InputMargin />
          {renderTagOptions()}
          <AlignToBottom />
          {/* <KeyboardSpacer /> */}
        </CustomScrollView>

        <Button
          title={getLocaleString("createNegotiationButton")}
          onPress={() => createNegotiation()}
          bottomMargin
          loading={negotiations.fetching}
          disabled={disableButton() || negotiations.fetching}
        />
      </KeyboardAvoidingView>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    language: state.language,
    negotiations: state.negotiations,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { negotiationCreateRequest } = NegotiationsActions;
  return bindActionCreators(
    {
      negotiationCreateRequest,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNegotiationScreen);
