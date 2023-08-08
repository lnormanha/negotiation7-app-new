import React, { Component } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { Header, Button } from "../../components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import KeyboardSpacer from "react-native-keyboard-spacer";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";

import NegotiationsActions from "../../state/redux/negotiations/NegotiationsRedux";

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

class TopicScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_coin: 1,
      askNextCoin: false,
      createRefs: true,
    };
  }
  componentDidMount() {
    this.startForm();
  }

  // componentDidUpdate() {
  //   const { answers, fetching } = this.props.negotiations;
  //   if (this.state.createRefs && answers.length > 0 && !fetching) {
  //     answers.forEach(thing => {
  //       this[`${thing}_ref`] = React.createRef();
  //     });
  //   }
  // }

  startForm() {
    const { negotiations } = this.props;
    const { current_topic, questions, current, showTutorial } = negotiations;

    setTimeout(() => {
      this.scrollToIndex(current_topic.id - 1, true, 0.5);
    }, 500);
  }

  goBack() {
    const { id } = this.props.user.payload;
    const { current } = this.props.negotiations;
    this.props.negotiationTopicsRequest({
      id: current.id,
      language: this.props.language.selected,
    });
    this.props.negotiationReportRequest({
      id: current.id,
      language: this.props.language.selected,
    });
    this.props.negotiationInfoRequest(current.id);
    this.props.navigation.goBack();
  }

  handleChangeAnswer = (index, answer) => {
    const { negotiations } = this.props;
    const { answers, editAnswer } = negotiations;

    const newAnswers = answers.map((answerItem, answerIndex) => {
      if (index !== answerIndex) {
        return answerItem;
      } else {
        return { ...answerItem, answer: answer };
      }
    });

    this.props.setAnswers({ answers: newAnswers, editAnswer });
  };

  submitAnswers(addCoin) {
    const { negotiations } = this.props;
    const { current_topic, answers, current, editAnswer } = negotiations;
    const payload = {
      id: current.id,
      body: answers,
      addCoin: addCoin,
    };

    if (editAnswer && !addCoin) {
      this.props.negotiationEditAnswersRequest(payload);
    } else {
      this.props.negotiationSendAnswersRequest(payload);
    }
    this.setState({
      askNextCoin: addCoin,
    });
    if (current_topic.id != 8 && !addCoin) {
      this.scrollToIndex(current_topic.id - 1, true, 0);
    }
  }

  endCoinFlow() {
    const { negotiations, language } = this.props;
    const { current_topic, topics } = negotiations;
    const nextTopic = topics[current_topic.id];
    this.props.negotiationTopicQuestionsRequest({
      id: nextTopic.id,
      language: language.selected,
    });
    this.props.setCurrentTopic(nextTopic);
    if (current_topic.id != 8) {
      this.scrollToIndex(current_topic.id - 1, true, 0);
    }
    setTimeout(() => {
      this.setState({ askNextCoin: false });
    }, 500);
  }

  scrollToIndex(index, animated, viewPosition) {
    this.sliderRef &&
      this.sliderRef.scrollToIndex({ index, animated, viewPosition });
  }

  goToReport() {
    const { negotiations, user, language } = this.props;
    const { current, report } = negotiations;

    this.props.negotiationReportRequest({
      id: current.id,
      language: language.selected,
    });
    this.props.navigation.navigate("ReportScreen");
  }

  goToTopic(topic) {
    const { negotiations, user, language } = this.props;
    const { current, report } = negotiations;

    setTimeout(() => {
      this.props.negotiationTopicQuestionsRequest({
        id: topic.id,
        language: language.selected,
      });
    }, 300);

    this.props.setCurrentTopic(topic);
    this.props.navigation.navigate("TopicScreen");
    this.scrollToIndex(topic.id - 1, true, 0.5);
  }

  renderTopicItem(item, index) {
    const { negotiations } = this.props;

    const { current_topic, questions, topics } = negotiations;

    return (
      <TopicItem onPress={() => this.goToTopic(item)}>
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

  renderQuestions() {
    const { negotiations } = this.props;
    const { answers, fetching, report } = negotiations;
    if (answers.length > 0 && !fetching) {
      return (
        <View>
          <FlatList
            data={answers}
            renderItem={({ item, index }) =>
              this.renderQuestionItem(item, index)
            }
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

  renderQuestionItem(item, index) {
    const { questions, answers, report } = this.props.negotiations;
    return (
      <ScrollIntoView ref={(x) => (this[`input${index}_ref`] = x)}>
        <QuestionContainer animation="fadeIn">
          <QuestionLabel>{questions[index]?.title}</QuestionLabel>
          <QuestionDesc>{questions[index]?.description}</QuestionDesc>
          <QuestionInput
            placeholder={i18n.t("answerHere")}
            value={answers[index]?.answer}
            onChangeText={(name) => this.handleChangeAnswer(index, name)}
            onSubmitEditing={() =>
              index != answers.length - 1
                ? this[`input${index + 1}_ref`].scrollIntoView(options)
                : {}
            }
            onFocus={() => this[`input${index}_ref`].scrollIntoView(options)}
            multiline
            underlineColorAndroid='transparent'
          />
        </QuestionContainer>
      </ScrollIntoView>
    );
  }

  renderAskCoin() {
    return (
      <AskCoinContainer>
        <TopMargin />
        <QuestionLabel isCoin>{i18n.t("tradablesTitleFlow")}</QuestionLabel>
        <BottomMargin />
        <ButtonRow>
          <Button
            title={i18n.t("no")}
            spaced_icons
            onPress={() => this.endCoinFlow()}
            small
          />
          <Button
            title={i18n.t("yes")}
            spaced_icons
            onPress={() => this.setState({ askNextCoin: false })}
            small
          />
        </ButtonRow>
      </AskCoinContainer>
    );
  }

  renderQuestionsContent() {
    const { negotiations } = this.props;
    const { current, topics, questions, current_topic } = negotiations;
    return <QuestionsContainer>{this.renderQuestions()}</QuestionsContainer>;
  }

  verifyAnswers() {
    let answerCount = 0;
    const { negotiations } = this.props;
    const { answers, current_topic } = negotiations;
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

  render() {
    const { negotiations } = this.props;
    const { askNextCoin } = this.state;
    const {
      current,
      topics,
      questions,
      current_topic,
      fetching,
      report
    } = negotiations;

    return (
      <Container>
        <Header
          title={i18n.t("negotiationHeader")}
          showLeftButton
          onPressLeft={() => this.goBack()}
          showRightButton
          rightIcon={Icons.report}
          onPressReport={() => this.goToReport()}
          isNegotiation
        />
        <TopicSliderArea>
          <FlatList
            data={topics}
            renderItem={({ item, index }) => this.renderTopicItem(item, index)}
            horizontal
            bounces={false}
            contentContainerStyle={{
              alignSelf: "flex-end",
            }}
            extraData={fetching && report}
            showsHorizontalScrollIndicator={false}
            ref={(slider) => (this.sliderRef = slider)}
          />
        </TopicSliderArea>
        <CustomScrollView>
          <TopMargin />
          {askNextCoin ? this.renderAskCoin() : this.renderQuestionsContent()}
        </CustomScrollView>

        {/* <FlexAlign /> */}
        {!askNextCoin && (
          <BottomContainer showShadow={current_topic.id == 6}>
            <Button
              title={
                current_topic.id == 8
                  ? i18n.t("topicQuestionFinalizeButton")
                  : i18n.t("topicQuestionContinueButton")
              }
              showIcon={current_topic.id == 8 ? false : true}
              spaced_icons
              onPress={() =>
                this.submitAnswers(current_topic.id != 6 ? false : true)
              }
              loading={fetching}
              disabled={this.verifyAnswers() || fetching}
            />
          </BottomContainer>
        )}
        {/* <KeyboardSpacer topSpacing={0} /> */}
      </Container>
    );
  }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicScreen);
