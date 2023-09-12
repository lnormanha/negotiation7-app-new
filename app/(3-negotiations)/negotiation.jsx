import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, ActivityIndicator, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";

import { useLocalization } from "@/context/LocalizationProvider";
import NegotiationsActions from "../../state/redux/negotiations/NegotiationsRedux";

import { Header, Modal } from "../../components";

import {
  Container,
  Content,
  ContainerList,
  TopMargin,
  TopicContainer,
  TopicInfoContent,
  TopicTitle,
  TopicQtyQuestion,
  InfoIconsArea,
  InfoIconsRow,
  InfoIcon,
  InfoIconsText,
  InfoTitleArea,
  InfoTitle,
  Arrow,
  OptionArea,
  OptionButton,
  Icon,
  TopicIcon,
  TutorialButton,
  TutorialLabel,
  NegotiationProgressContainer,
  NegotiationProgressBar,
} from "./NegotiationScreenStyles";
import { Icons, Colors } from "../../constants";
import { useCreatePDF } from "../../hooks/useCreatePDF";

function NegotiationScreen(props) {
  const initialState = {
    icons: [
      Icons.header_neg,
      Icons.object,
      Icons.objective,
      Icons.interests,
      Icons.macna,
      Icons.trade_coin,
      Icons.neg_field,
      Icons.questions,
    ],
    filePath: null,
    isModalVisible: false,
  };

  const [state, setState] = useState(initialState);
  const { getLocaleString, currentLocale } = useLocalization();
  const { mapToHtml } = useCreatePDF();

  const { negotiations, user, subscription, language } = props;

  const { payload } = user;
  const { subscription_data } = subscription;
  const { current, fetching, report } = negotiations;

  const { push, back } = useRouter();

  useEffect(() => {
    getNegotiationProgress();
  }, [negotiations]);

  console.log({ currentLocale });

  const convertDate = (date) => {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    return ` ${day}/${month}/${year}`;
  };

  function goToQuestions(topic) {
    props.negotiationTopicQuestionsRequest({
      id: topic.id,
      language: currentLocale,
    });
    props.setCurrentTopic(topic);
    push("/topic");
  }

  function goToReport() {
    props.negotiationReportRequest({
      id: current.id,
      language: currentLocale,
    });
    push("/report");
  }

  async function sharePDF() {
    let data = {
      report,
      name: user.payload.name,
    };

    const html = mapToHtml(data);

    const { uri } = await Print.printToFileAsync({ html });

    const pdfName = `${uri.slice(0, uri.lastIndexOf("/") + 1)}${getLocaleString(
      "reportPdfName"
    )}-${current.title}-${current.created_at}.pdf`;

    await FileSystem.moveAsync({
      from: uri,
      to: pdfName,
    });

    let type = "application/pdf";

    await Sharing.shareAsync(pdfName, { UTI: ".pdf", mimeType: type });
  }

  function getNegotiationProgress() {
    const totalSum = negotiations.topics?.reduce((accum, current) => {
      return accum + current.qtd_questions;
    }, 0);

    const sum = negotiations.topics?.reduce((accum, current) => {
      return accum + current.qtd_answer;
    }, 0);

    const percentage = (sum / totalSum) * 100;

    return percentage;
  }
  function renderItem(item, index) {
    return (
      <TopicContainer onPress={() => goToQuestions(item)} border={index != 7}>
        <TopicIcon icon={state.icons[index]} />
        <TopicInfoContent>
          <TopicTitle maxFontSizeMultiplier={1}>
            {item.name}
            {""}{" "}
            {index == 5 && report[index]?.coins
              ? `(${report[index].coins.length})`
              : ""}
          </TopicTitle>
          <TopicQtyQuestion>
            {item.qtd_answer} {getLocaleString("negotiationTopicQuestionsOf")}{" "}
            {item.qtd_questions}{" "}
            {getLocaleString("negotiationTopicQuestionsText")}
          </TopicQtyQuestion>
        </TopicInfoContent>
        <Arrow />
      </TopicContainer>
    );
  }

  function openModal() {
    setState({ ...state, isModalVisible: !state.isModalVisible });
  }

  function removeNegotiation() {
    const api_payload = {
      id: current.id,
      user_id: payload.id,
    };

    props.negotiationRemoveRequest(api_payload);
    setState({ ...state, isModalVisible: !state.isModalVisible });
  }

  function getTime(date) {
    if (currentLocale == "en") {
      return new Date(date).toLocaleTimeString("en-US");
    } else {
      return new Date(date).toLocaleTimeString("pt-BR");
    }
  }

  return (
    <Container>
      <Header
        title={getLocaleString("negotiationHeader")}
        isNegotiation
        onPressLeft={() => back()}
        onPressReport={() => goToReport()}
      />
      {fetching ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.white,
            width: "100%",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <Content>
            <InfoTitleArea>
              <View style={{ width: 100 }} />
              <InfoTitle>{current?.title}</InfoTitle>
              <TutorialButton
                onPress={() => push("/tutorial?isNegotiation=true")}
              >
                <TutorialLabel>Tutorial</TutorialLabel>
              </TutorialButton>
            </InfoTitleArea>
            <InfoIconsArea>
              <InfoIconsRow>
                <InfoIcon image={Icons.response} />
                <InfoIconsText>
                  {current?.qtd_answers || "0"}{" "}
                  {getLocaleString("negotiationResponsesLabel")}
                </InfoIconsText>
              </InfoIconsRow>
              <InfoIconsRow>
                <InfoIcon image={Icons.calendar} />
                <InfoIconsText>
                  {current &&
                    convertDate(current?.created_at || current?.createdAt)}{" "}
                  {current &&
                    getTime(current?.created_at || current?.createdAt)}
                </InfoIconsText>
              </InfoIconsRow>
            </InfoIconsArea>
            <NegotiationProgressContainer>
              <NegotiationProgressBar
                progress={getNegotiationProgress() || 0}
              />
            </NegotiationProgressContainer>

            <TopMargin />
            <ContainerList>
              <FlatList
                data={negotiations.topics}
                renderItem={({ item, index }) => renderItem(item, index)}
                showsVerticalScrollIndicator={false}
                extraData={negotiations.report}
              />
            </ContainerList>
            <TopMargin />
            <OptionArea>
              <OptionButton onPress={() => goToReport()}>
                <Icon icon={Icons.preview} />
              </OptionButton>
              <OptionButton onPress={() => sharePDF()}>
                <Icon icon={Icons.share} />
              </OptionButton>

              <OptionButton
                red
                onPress={() => setState({ ...state, isModalVisible: true })}
              >
                <Icon icon={Icons.remove} />
              </OptionButton>
            </OptionArea>
          </Content>
        </ScrollView>
      )}
      <Modal
        title={getLocaleString("deleteNegotiationTitle")}
        message={getLocaleString("deleteNegotiationMessage")}
        onCancel={() => openModal()}
        onConfirm={() => removeNegotiation()}
        isVisible={state.isModalVisible}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    negotiations: state.negotiations,
    user: state.user,
    language: state.language,
    subscription: state.subscription,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {
    negotiationTopicsRequest,
    negotiationTopicQuestionsRequest,
    setCurrentTopic,
    negotiationReportRequest,
    negotiationRemoveRequest,
  } = NegotiationsActions;

  return bindActionCreators(
    {
      negotiationTopicsRequest,
      negotiationTopicQuestionsRequest,
      setCurrentTopic,
      negotiationReportRequest,
      negotiationRemoveRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NegotiationScreen);
