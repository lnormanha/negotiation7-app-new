import React, { Component, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
  View,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { Header, Modal } from "../../components";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";

import NegotiationsActions from "../../state/redux/negotiations/NegotiationsRedux";
import { mapToHtml } from "../../services/CreatePDFReport";

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
  PremiumContainer,
  PremiumImage,
  PremiumTitle,
  PremiumText,
  PremiumArrowIcon,
  TitlePremiumContainer,
  ImagePremiumContainer,
  TopicIcon,
  TutorialButtonContainer,
  TutorialButton,
  TutorialLabel,
  NegotiationProgressContainer,
  NegotiationProgressBar,
} from "./NegotiationScreenStyles";
import { Icons, Colors } from "../../constants";

import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";
import { useRouter } from "expo-router";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

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

  const { negotiations, navigation, user, subscription, language } = props;

  const { payload } = user;
  const { subscription_data } = subscription;
  const { current, fetching, report } = negotiations;

  const { push, back } = useRouter();

  useEffect(() => {
    getNegotiationProgress();
  }, [negotiations]);

  const convertDate = (date) => {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    return ` ${day}/${month}/${year}`;
  };

  function goToQuestions(topic) {
    props.negotiationTopicQuestionsRequest({
      id: topic.id,
      language: props.language.selected,
    });
    props.setCurrentTopic(topic);
    push("/topic");
  }

  function goToReport() {
    props.negotiationReportRequest({
      id: current.id,
      language: language.selected,
    });
    push("/report");
  }

  async function createPDF() {
    let data = {
      report,
      name: user.payload.name,
      locale: language.selected,
    };

    const html = mapToHtml(data);

    console.log({ html });

    const { uri } = await Print.printToFileAsync({ html });

    setState({ ...state, filePath: uri });
    console.log("PDF Salvo com sucesso em: ", uri);
  }

  async function sharePDF() {
    await createPDF();

    let filePath = `file://${state.filePath}`;
    let type = "application/pdf";

    await Sharing.shareAsync(filePath, { UTI: ".pdf", mimeType: type });
  }

  async function sharePDFWithAndroid(pdfPath, type) {
    Sharing.shareAsync(pdfPath);
  }

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permissão para armazenamento externo",
          message:
            "Negociação 7.0 precisa acessar seu armazenameto " +
            "para salvar o relatório.",
          buttonNeutral: "Perguntar depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        sharePDF();
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
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
            {item.qtd_answer} {i18n.t("negotiationTopicQuestionsOf")}{" "}
            {item.qtd_questions} {i18n.t("negotiationTopicQuestionsText")}
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
    if (props.language.selected == "en") {
      return new Date(date).toLocaleTimeString("en-US");
    } else {
      return new Date(date).toLocaleTimeString("pt-BR");
    }
  }

  return (
    <Container>
      <Header
        title={i18n.t("negotiationHeader")}
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
                  {i18n.t("negotiationResponsesLabel")}
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
          {/* {!subscription_data ||
            (subscription_data?.type === "TRIAL" && (
              <PremiumContainer onPress={() => push("SubscriptionScreen")}>
                <PremiumImage />
                <TitlePremiumContainer>
                  <PremiumTitle>
                    {i18n.t("negotiationPremiumTitle")}
                  </PremiumTitle>
                  <PremiumText>{i18n.t("negotiationPremiumText")}</PremiumText>
                </TitlePremiumContainer>
                <PremiumArrowIcon />
              </PremiumContainer>
            ))} */}
        </ScrollView>
      )}
      <Modal
        title={i18n.t("deleteNegotiationTitle")}
        message={i18n.t("deleteNegotiationMessage")}
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
