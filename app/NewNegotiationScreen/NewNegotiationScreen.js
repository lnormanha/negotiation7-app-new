import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Header } from "../../components";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText
} from "./NewNegotiationScreenStyle";

class NewNegotiationScreen extends Component {
  render() {
    const { navigation } = this.props;
    const { goBack, navigate, push } = navigation;
    return (
      <Container>
        <Header
          title="Nova negociação"
          showLeftButton
          onPressLeft={() => goBack()}
        />
        <Title>Insira o nome da sua negociação no campo abaixo</Title>
        <Input placeholder="Informe o nome aqui"></Input>
        <ScrollView />
        <Button>
          <ButtonText>Iniciar</ButtonText>
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
)(NewNegotiationScreen);
