import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Container, Question, QuestionTip, Button } from "./styles";
import Header from "../../components/Header";

import { Images, Icons } from "../../constants";


export default class TradeCoinScreen extends Component {
  render() {
    return (
      <Container>
        <Header
          showLeftButton
          leftIcon={Icons.back}
          onPressLeft={() => goBack()}
        />
        <Question>Deseja adicionar uma nova moeda de troca?</Question>
        <QuestionTip>Selecione abaixo.</QuestionTip>
        <View style={{ flex: 0.2 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <Button>
            <Text>Sim</Text>
          </Button>
          <Button>
            <Text>Não</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
