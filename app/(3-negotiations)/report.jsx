import React, { Component, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import { Header } from "../../components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NegotiationsActions from "../../state/redux/negotiations/NegotiationsRedux";
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from "expo-sharing";

import { mapToHtml } from "../../services/CreatePDFReport";

import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

import {
  Container,
  ContainerList,
  TopMargin,
  InfoLabel,
  InfoAnswer,
  InfoMargin,
  TopicAnswersContainer,
  TopicHeader,
  TopicHeaderIcon,
  TopicHeaderInfo,
  TopicHeaderTitle,
  TopicHeaderQtyQuestion,
  TopicAnswersHeaders,
  TopicAnswerHeader,
  TopicAnswerTitle,
  TopicAnswerContainer,
  TopicAnswerText,
  TradeCoinTitleContainer,
  TradeCoinTitle,
  TradeCoinQuestionContainer,
  TradeCoinQuestionLabel,
  TradeCoinQuestionAnswer,
  RemoveCoinLabel,
  RemoveCoinButton,
} from "./ReportScreenStyles";
import { Icons } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

function ReportScreen(props) {
  const { negotiations, user, language } = props;
  const { fetching, current, report } = negotiations;
  const { payload } = user;

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
    filePath: "",
  };

  const [state, setState] = useState(initialState);
  const { push, back, replace } = useRouter();

  async function createPDF(showAlert) {
    let data = {
      report,
      name: user.payload.name,
      locale: language.selected,
    };
    let options = {
      height: 842,
      width: 595,
      html: mapToHtml(data),
      fileName: `NEGOTIATION7-Report-${current.title}`,
      directory: "Documents",
    };
    // let file = await RNHTMLtoPDF.convert(options);
    setState({ ...state, filePath: file.filePath });
    if (showAlert) {
      Alert.alert(`PDF Salvo com sucesso em: ${file.filePath}`);
    }
  }

  async function sharePDF() {
    await createPDF();

    let filePath = `file://${state.filePath}`;
    let type = "application/pdf";

    if (Platform.OS == "ios") {
      await Sharing.shareAsync(filePath);
      Share.open({
        url: filePath,
        mimeType: type,
      })
        .then((resShare) => {
          console.log({ resShare });
        })
        .catch((err) => {
          err && console.log({ err });
        });
    } else {
      sharePDFWithAndroid(filePath, type);
    }
  }

  async function sharePDFWithAndroid(pdfPath, type) {
    Sharing.shareAsync(pdfPath);
  }

  async function requestStoragePermissionCreate() {
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
        createPDF(true);
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async function requestStoragePermissionShare() {
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

  function goToQuestions(topic) {
    props.negotiationTopicQuestionsRequest({
      id: topic.id,
      language: props.language.selected,
    });
    props.setCurrentTopic(topic);
    replace("/topic");
  }

  function removeCoin(coin) {
    const payload = {
      id: current.id,
      coin_id: coin.id,
    };

    props.negotiationCoinRemoveRequest(payload);
  }

  function renderItem(item, index) {
    if (index < 7) {
      if (index != 5) {
        if (index != 0 && index != 1) {
          return renderReportTopic(item, index);
        }
      } else {
        return renderReportCoin(item, index);
      }
    } else {
      return renderReportBottom(item, index);
    }
  }

  function renderReportHeader() {
    return (
      <FlatList
        data={report}
        renderItem={({ item, index }) => renderReportHeaderItem(item, index)}
      />
    );
  }

  function renderReportHeaderItem(item, index) {
    if (index < 2) {
      if (index == 0) {
        return (
          <View>
            <TopMargin />
            <InfoLabel>{i18n.t("clientLabel")}</InfoLabel>
            <InfoAnswer>
              {item.questions[0].answer?.answer || i18n.t("noResponse")}
            </InfoAnswer>
            <TopMargin />
            <InfoLabel>{i18n.t("negotiationPlace")}</InfoLabel>
            <InfoAnswer>
              {item.questions[1].answer?.answer || i18n.t("noResponse")}
            </InfoAnswer>
            <TopMargin />
            <InfoLabel>{i18n.t("negotiationDate")}</InfoLabel>
            <InfoAnswer>
              {item.questions[2].answer?.answer || i18n.t("noResponse")}
            </InfoAnswer>
            <TopMargin />
            <InfoLabel>{i18n.t("negotiationTime")}</InfoLabel>
            <InfoAnswer>
              {item.questions[3].answer?.answer || i18n.t("noResponse")}
            </InfoAnswer>
            <TopMargin />
          </View>
        );
      } else {
        return (
          <View>
            <InfoLabel>{i18n.t("objectNegotiationLabel")}</InfoLabel>
            <InfoAnswer>
              {item.questions[0].answer?.answer || i18n.t("noResponse")}
            </InfoAnswer>
            <TopMargin />
          </View>
        );
      }
    }
  }

  function renderReportTopic(item, index) {
    return (
      <View>
        <TopicAnswersContainer>
          <TopicHeader onPress={() => goToQuestions(item)}>
            <TopicHeaderIcon icon={state.icons[index]} />
            <TopicHeaderInfo>
              <TopicHeaderTitle>{item.name}</TopicHeaderTitle>
              <TopicHeaderQtyQuestion>
                {negotiations.topics[index].qtd_answer}{" "}
                {i18n.t("negotiationTopicQuestionsOf")}{" "}
                {negotiations.topics[index].qtd_questions}{" "}
                {i18n.t("negotiationTopicQuestionsText")}
              </TopicHeaderQtyQuestion>
            </TopicHeaderInfo>
          </TopicHeader>
          <TopicAnswersHeaders>
            <TopicAnswerHeader leftPos>
              <TopicAnswerTitle>{i18n.t("oursLabel")}</TopicAnswerTitle>
            </TopicAnswerHeader>
            <TopicAnswerHeader rightPos>
              <TopicAnswerTitle>{i18n.t("theirsLabel")}</TopicAnswerTitle>
            </TopicAnswerHeader>
          </TopicAnswersHeaders>
          {item.questions.map((question, qindex) => {
            return (
              <TopicAnswerContainer
                leftPos={qindex == 0}
                rightPos={qindex == 1}
              >
                <TopicAnswerText>
                  {question?.answer?.answer || i18n.t("noResponse")}
                </TopicAnswerText>
              </TopicAnswerContainer>
            );
          })}
        </TopicAnswersContainer>
      </View>
    );
  }

  function renderReportCoin(item, index) {
    return (
      <View>
        <TopicAnswersContainer>
          <TopicHeader onPress={() => goToQuestions(item)}>
            <TopicHeaderIcon icon={state.icons[index]} />
            <TopicHeaderInfo>
              <TopicHeaderTitle>{item.name}</TopicHeaderTitle>
              <TopicHeaderQtyQuestion>
                {negotiations.topics[index].qtd_answer}{" "}
                {i18n.t("negotiationTopicQuestionsOf")}{" "}
                {negotiations.topics[index].qtd_questions}{" "}
                {i18n.t("negotiationTopicQuestionsText")}
              </TopicHeaderQtyQuestion>
            </TopicHeaderInfo>
          </TopicHeader>
          {item.coins ? (
            item.coins.map((coin, qindex) => {
              return (
                <View style={{ width: "100%" }}>
                  <TradeCoinTitleContainer>
                    <TradeCoinTitle>{coin.name}</TradeCoinTitle>

                    <RemoveCoinButton onPress={() => removeCoin(coin)}>
                      <RemoveCoinLabel>{i18n.t("delete")}</RemoveCoinLabel>
                    </RemoveCoinButton>
                  </TradeCoinTitleContainer>
                  <TradeCoinQuestionContainer>
                    <TradeCoinQuestionLabel>
                      {i18n.t("initialOffer")}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.initial_offer.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                  <TradeCoinQuestionContainer>
                    <TradeCoinQuestionLabel>
                      {i18n.t("desiredValue")}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.desired_value.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                  <TradeCoinQuestionContainer>
                    <TradeCoinQuestionLabel>
                      {i18n.t("departurePoint")}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.departure_point.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                  <TradeCoinQuestionContainer lastIndex>
                    <TradeCoinQuestionLabel>
                      {i18n.t("desiredValueTheirs")}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.desired_value_of_them.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                </View>
              );
            })
          ) : (
            <TradeCoinTitleContainer>
              <TradeCoinTitle>{i18n.t("noCoins")}</TradeCoinTitle>
            </TradeCoinTitleContainer>
          )}
        </TopicAnswersContainer>
      </View>
    );
  }

  function renderReportBottom(item, index) {
    return (
      <View>
        <TopicAnswersContainer>
          <TopicHeader>
            <TopicHeaderIcon icon={state.icons[index]} />
            <TopicHeaderInfo>
              <TopicHeaderTitle>{item.name}</TopicHeaderTitle>
              <TopicHeaderQtyQuestion>
                {negotiations.topics[index].qtd_answer}{" "}
                {i18n.t("negotiationTopicQuestionsOf")}{" "}
                {negotiations.topics[index].qtd_questions}{" "}
                {i18n.t("negotiationTopicQuestionsText")}
              </TopicHeaderQtyQuestion>
            </TopicHeaderInfo>
          </TopicHeader>
          <InfoAnswer font>
            {item.questions[0].answer && item.questions[0].answer.answer
              ? item.questions[0].answer.answer
              : i18n.t("noResponse")}
          </InfoAnswer>
        </TopicAnswersContainer>
      </View>
    );
  }

  function saveReport() {
    if (Platform.OS == "ios") {
      sharePDF();
    } else {
      requestStoragePermissionShare();
    }
  }

  return (
    <Container>
      <Header
        title={i18n.t("reportHeader")}
        showLeftButton
        onPressLeft={() => back()}
        showRightButton
        rightIcon={Icons.share}
        onPressRight={() => saveReport()}
      />
      {fetching ? (
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
        <ScrollView>
          {renderReportHeader()}
          <ContainerList>
            <FlatList
              data={report}
              renderItem={({ item, index }) => renderItem(item, index)}
            />
          </ContainerList>
          <TopMargin />
        </ScrollView>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    negotiations: state.negotiations,
    language: state.language,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {
    negotiationTopicsRequest,
    negotiationTopicQuestionsRequest,
    setCurrentTopic,
    negotiationReportRequest,
    negotiationRemoveRequest,
    negotiationCoinRemoveRequest,
  } = NegotiationsActions;

  return bindActionCreators(
    {
      negotiationTopicsRequest,
      negotiationTopicQuestionsRequest,
      setCurrentTopic,
      negotiationReportRequest,
      negotiationRemoveRequest,
      negotiationCoinRemoveRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
