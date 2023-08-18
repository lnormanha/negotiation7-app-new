import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, ScrollView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { useRouter } from "expo-router";

import { useLocalization } from "@/context/LocalizationProvider";
import NegotiationsActions from "../../state/redux/negotiations/NegotiationsRedux";

import { Header, Button } from "../../components";
import {
  Container,
  QuestionsContainer,
  AskCoinContainer,
  TopMargin,
  TopicSliderArea,
  TopicItem,
  TopicText,
  TopicBottom,
  Point,
  TopicLine,
  QuestionContainer,
  QuestionInput,
  QuestionLabel,
  QuestionDesc,
  BottomMargin,
  ButtonRow,
  BottomContainer,
} from "./TopicScreenStyles";
import { Icons, Metrics } from "../../constants";

const CustomScrollView = wrapScrollView(ScrollView);
const options = {
  align: "top",
  animated: true,
  immediate: false,
  insets: {
    top: 0,
    bottom: 0,
  },
};

function TopicScreen(props) {
  const initialState = {
    current_coin: 1,
    askNextCoin: false,
    createRefs: true,
  };

  const { negotiations, user } = props;
  const {
    current_topic,
    answers,
    current,
    editAnswer,
    showTutorial,
    fetching,
    topics,
    report,
    questions,
  } = negotiations;
  const { id } = user.payload;

  const [state, setState] = useState(initialState);
  const { push, back, replace } = useRouter();
  const { getLocaleString, currentLocale } = useLocalization();

  const { current_coin, askNextCoin, createRefs } = state;

  useEffect(() => {
    startForm();
  }, []);

  // componentDidUpdate() {
  //   const { answers, fetching } = props.negotiations;
  //   if (state.createRefs && answers.length > 0 && !fetching) {
  //     answers.forEach(thing => {
  //       this[`${thing}_ref`] = React.createRef();
  //     });
  //   }
  // }

  function startForm() {
    setTimeout(() => {
      scrollToIndex(current_topic.id - 1, true, 0.5);
    }, 500);
  }

  function goBack() {
    props.negotiationTopicsRequest({
      id: current.id,
      language: currentLocale,
    });
    props.negotiationReportRequest({
      id: current.id,
      language: currentLocale,
    });
    props.negotiationInfoRequest(current.id);
    back();
  }

  const handleChangeAnswer = (index, answer) => {
    const newAnswers = answers.map((answerItem, answerIndex) => {
      if (index !== answerIndex) {
        return answerItem;
      } else {
        return { ...answerItem, answer: answer };
      }
    });

    props.setAnswers({ answers: newAnswers, editAnswer });
  };

  function submitAnswers(addCoin) {
    const payload = {
      id: current.id,
      body: answers,
      addCoin: addCoin,
    };

    if (editAnswer && !addCoin) {
      props.negotiationEditAnswersRequest(payload);
    } else {
      props.negotiationSendAnswersRequest(payload);
    }
    setState({
      ...state,
      askNextCoin: addCoin,
    });
    if (current_topic.id != 8 && !addCoin) {
      scrollToIndex(current_topic.id - 1, true, 0);
    }
  }

  function endCoinFlow() {
    const nextTopic = topics[current_topic.id];
    props.negotiationTopicQuestionsRequest({
      id: nextTopic.id,
      language: currentLocale,
    });
    props.setCurrentTopic(nextTopic);
    if (current_topic.id != 8) {
      scrollToIndex(current_topic.id - 1, true, 0);
    }
    setTimeout(() => {
      setState({ ...state, askNextCoin: false });
    }, 500);
  }

  function scrollToIndex(index, animated, viewPosition) {
    sliderRef && sliderRef.scrollToIndex({ index, animated, viewPosition });
  }

  function goToReport() {
    props.negotiationReportRequest({
      id: current.id,
      language: currentLocale,
    });
    push("/report");
  }

  function goToTopic(topic) {
    setTimeout(() => {
      props.negotiationTopicQuestionsRequest({
        id: topic.id,
        language: currentLocale,
      });
    }, 300);

    props.setCurrentTopic(topic);
    replace("/topic");
    scrollToIndex(topic.id - 1, true, 0.5);
  }

  function renderTopicItem(item, index) {
    return (
      <TopicItem onPress={() => goToTopic(item)}>
        <TopicText
          maxFontSizeMultiplier={1}
          selected={item.id === current_topic.id}
        >
          {item.name.toUpperCase()}
        </TopicText>
        <TopicBottom>
          <TopicLine show={current_topic.id >= item.id} />
          <Point
            selected={item.id === current_topic.id}
            completed={item.qtd_questions == item.qtd_answer}
          />
          <TopicLine show={item.id < current_topic.id} />
        </TopicBottom>
      </TopicItem>
    );
  }

  function renderQuestions() {
    if (answers.length > 0 && !fetching) {
      return (
        <View>
          <FlatList
            data={answers}
            renderItem={({ item, index }) => renderQuestionItem(item, index)}
            bounces={false}
            showsVerticalScrollIndicator={false}
            extraData={negotiations.questions && report}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: Metrics.screenHeight / 1.6,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
  }

  function renderQuestionItem(item, index) {
    return (
      <ScrollIntoView ref={(x) => (this[`input${index}_ref`] = x)}>
        <QuestionContainer animation="fadeIn">
          <QuestionLabel>{questions[index]?.title}</QuestionLabel>
          <QuestionDesc>{questions[index]?.description}</QuestionDesc>
          <QuestionInput
            placeholder={getLocaleString("answerHere")}
            value={answers[index]?.answer}
            onChangeText={(name) => handleChangeAnswer(index, name)}
            onSubmitEditing={() =>
              index != answers.length - 1
                ? this[`input${index + 1}_ref`].scrollIntoView(options)
                : {}
            }
            onFocus={() => this[`input${index}_ref`].scrollIntoView(options)}
            multiline
            underlineColorAndroid="transparent"
          />
        </QuestionContainer>
      </ScrollIntoView>
    );
  }

  function renderAskCoin() {
    return (
      <AskCoinContainer>
        <TopMargin />
        <QuestionLabel isCoin>
          {getLocaleString("tradablesTitleFlow")}
        </QuestionLabel>
        <BottomMargin />
        <ButtonRow>
          <Button
            title={getLocaleString("no")}
            spaced_icons
            onPress={() => endCoinFlow()}
            small
          />
          <Button
            title={getLocaleString("yes")}
            spaced_icons
            onPress={() => setState({ ...state, askNextCoin: false })}
            small
          />
        </ButtonRow>
      </AskCoinContainer>
    );
  }

  function renderQuestionsContent() {
    return <QuestionsContainer>{renderQuestions()}</QuestionsContainer>;
  }

  function verifyAnswers() {
    let answerCount = 0;

    answers.forEach((answerItem, answerIndex) => {
      if (answerItem.answer != "") {
        answerCount += 1;
      }
    });
    if (current_topic.id != 6) {
      if (answerCount > 0) {
        return false;
      } else return true;
    } else {
      if (answerCount == answers.length) {
        return false;
      } else return true;
    }
  }

  return (
    <Container>
      <Header
        title={getLocaleString("negotiationHeader")}
        showLeftButton
        onPressLeft={() => goBack()}
        showRightButton
        rightIcon={Icons.report}
        onPressReport={() => goToReport()}
        isNegotiation
      />
      <TopicSliderArea>
        <FlatList
          data={topics}
          renderItem={({ item, index }) => renderTopicItem(item, index)}
          horizontal
          bounces={false}
          contentContainerStyle={{
            alignSelf: "flex-end",
          }}
          extraData={fetching && report}
          showsHorizontalScrollIndicator={false}
          ref={(slider) => (sliderRef = slider)}
        />
      </TopicSliderArea>
      <CustomScrollView>
        <TopMargin />
        {askNextCoin ? renderAskCoin() : renderQuestionsContent()}
      </CustomScrollView>

      {/* <FlexAlign /> */}
      {!askNextCoin && (
        <BottomContainer showShadow={current_topic.id == 6}>
          <Button
            title={
              current_topic.id == 8
                ? getLocaleString("topicQuestionFinalizeButton")
                : getLocaleString("topicQuestionContinueButton")
            }
            showIcon={current_topic.id == 8 ? false : true}
            spaced_icons
            onPress={() => submitAnswers(current_topic.id != 6 ? false : true)}
            loading={fetching}
            disabled={verifyAnswers() || fetching}
          />
        </BottomContainer>
      )}
      {/* <KeyboardSpacer topSpacing={0} /> */}
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
    negotiationSendAnswersRequest,
    negotiationEditAnswersRequest,
    negotiationTopicQuestionsRequest,
    negotiationReportRequest,
    negotiationTopicsRequest,
    setCurrentTopic,
    negotiationInfoRequest,
    setTutorial,
    setAnswers,
  } = NegotiationsActions;
  return bindActionCreators(
    {
      negotiationSendAnswersRequest,
      negotiationEditAnswersRequest,
      negotiationTopicQuestionsRequest,
      negotiationReportRequest,
      negotiationTopicsRequest,
      setCurrentTopic,
      negotiationInfoRequest,
      setTutorial,
      setAnswers,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicScreen);
