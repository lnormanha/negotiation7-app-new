import React, { useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { Header } from "../../components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";
import { useCreatePDF } from "../../hooks/useCreatePDF";
import NegotiationsActions from "../../state/redux/negotiations/NegotiationsRedux";

import {
  Container,
  ContainerList,
  TopMargin,
  InfoLabel,
  InfoAnswer,
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
import { Icons, Colors } from "../../constants";

function ReportScreen(props) {
  const { negotiations, user, language } = props;
  const { fetching, current, report } = negotiations;
  const { payload } = user;

  const { getLocaleString, currentLocale } = useLocalization();
  const { mapToHtml } = useCreatePDF();

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

    console.log({ pdfName });

    await FileSystem.moveAsync({
      from: uri,
      to: pdfName,
    });

    let type = "application/pdf";

    await Sharing.shareAsync(pdfName, { UTI: ".pdf", mimeType: type });
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
            <InfoLabel>{getLocaleString("clientLabel")}</InfoLabel>
            <InfoAnswer>
              {item.questions[0].answer?.answer ||
                getLocaleString("noResponse")}
            </InfoAnswer>
            <TopMargin />
            <InfoLabel>{getLocaleString("negotiationPlace")}</InfoLabel>
            <InfoAnswer>
              {item.questions[1].answer?.answer ||
                getLocaleString("noResponse")}
            </InfoAnswer>
            <TopMargin />
            <InfoLabel>{getLocaleString("negotiationDate")}</InfoLabel>
            <InfoAnswer>
              {item.questions[2].answer?.answer ||
                getLocaleString("noResponse")}
            </InfoAnswer>
            <TopMargin />
            <InfoLabel>{getLocaleString("negotiationTime")}</InfoLabel>
            <InfoAnswer>
              {item.questions[3].answer?.answer ||
                getLocaleString("noResponse")}
            </InfoAnswer>
            <TopMargin />
          </View>
        );
      } else {
        return (
          <View>
            <InfoLabel>{getLocaleString("objectNegotiationLabel")}</InfoLabel>
            <InfoAnswer>
              {item.questions[0].answer?.answer ||
                getLocaleString("noResponse")}
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
                {getLocaleString("negotiationTopicQuestionsOf")}{" "}
                {negotiations.topics[index].qtd_questions}{" "}
                {getLocaleString("negotiationTopicQuestionsText")}
              </TopicHeaderQtyQuestion>
            </TopicHeaderInfo>
          </TopicHeader>
          <TopicAnswersHeaders>
            <TopicAnswerHeader leftPos>
              <TopicAnswerTitle>
                {getLocaleString("oursLabel")}
              </TopicAnswerTitle>
            </TopicAnswerHeader>
            <TopicAnswerHeader rightPos>
              <TopicAnswerTitle>
                {getLocaleString("theirsLabel")}
              </TopicAnswerTitle>
            </TopicAnswerHeader>
          </TopicAnswersHeaders>
          {item.questions.map((question, qindex) => {
            return (
              <TopicAnswerContainer
                leftPos={qindex == 0}
                rightPos={qindex == 1}
              >
                <TopicAnswerText>
                  {question?.answer?.answer || getLocaleString("noResponse")}
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
                {getLocaleString("negotiationTopicQuestionsOf")}{" "}
                {negotiations.topics[index].qtd_questions}{" "}
                {getLocaleString("negotiationTopicQuestionsText")}
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
                      <RemoveCoinLabel>
                        {getLocaleString("delete")}
                      </RemoveCoinLabel>
                    </RemoveCoinButton>
                  </TradeCoinTitleContainer>
                  <TradeCoinQuestionContainer>
                    <TradeCoinQuestionLabel>
                      {getLocaleString("initialOffer")}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.initial_offer.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                  <TradeCoinQuestionContainer>
                    <TradeCoinQuestionLabel>
                      {getLocaleString("desiredValue")}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.desired_value.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                  <TradeCoinQuestionContainer>
                    <TradeCoinQuestionLabel>
                      {getLocaleString("departurePoint")}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.departure_point.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                  <TradeCoinQuestionContainer lastIndex>
                    <TradeCoinQuestionLabel>
                      {getLocaleString("desiredValueTheirs")}
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
              <TradeCoinTitle>{getLocaleString("noCoins")}</TradeCoinTitle>
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
                {getLocaleString("negotiationTopicQuestionsOf")}{" "}
                {negotiations.topics[index].qtd_questions}{" "}
                {getLocaleString("negotiationTopicQuestionsText")}
              </TopicHeaderQtyQuestion>
            </TopicHeaderInfo>
          </TopicHeader>
          <InfoAnswer font>
            {item.questions[0].answer && item.questions[0].answer.answer
              ? item.questions[0].answer.answer
              : getLocaleString("noResponse")}
          </InfoAnswer>
        </TopicAnswersContainer>
      </View>
    );
  }

  return (
    <Container>
      <Header
        title={getLocaleString("reportHeader")}
        showLeftButton
        onPressLeft={() => back()}
        showRightButton
        rightIcon={Icons.share}
        onPressRight={() => sharePDF()}
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
