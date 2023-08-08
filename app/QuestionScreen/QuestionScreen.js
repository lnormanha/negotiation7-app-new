import React, { Component } from "react";
import { Header } from "../../components";
import { ScrollView, Text, KeyboardAvoidingView, View } from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {
  Container,
  Input,
  Button,
  Question,
  QuestionTip
} from "./QuestionScreenStyle.js";

class QuestionScreen extends Component {
  render() {
    const { navigation } = this.props;
    const { navigate, getParam, push, goBack } = navigation;

    let question = getParam("question");
    return (
      <Container>
        <Header
          title="Question Screen"
          showLeftButton
          onPressLeft={() => goBack()}
        />
        <Question>{question.title}</Question>
        <QuestionTip>{question.description}</QuestionTip>
        <Input />
        <View style={{ flex: 1 }} />
        <Button>
          <Text>Continuar</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionScreen);
