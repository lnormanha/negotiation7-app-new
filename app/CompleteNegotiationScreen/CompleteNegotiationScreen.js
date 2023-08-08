import React, { Component } from "react";
import { Header } from "../../components";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {
  Container,
  Render,
  Title,
  Description,
  Button,
  ButtonText
} from "./CompleteNegotiationScreenStyle";

import { Images, Icons } from "../../constants";

class CompleteNegotiationScreen extends Component {
  render() {
    const { navigation } = this.props;
    const { goBack, pop } = navigation;
    return (
      <Container>
        <Header
          title="Negociação 7.0"
          showLeftButton
          onPressLeft={() => goBack()}
          showRightButton
          rightIcon={Icons.close}
        />
        <Render image={Images.negotiationCompleteRender} />
        <Title>Negociação criada com sucesso!</Title>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed
          elementum libero, ac auctor metus. Maecenas volutpat eget sem eget
          fringilla.
        </Description>
        <Button>
          <ButtonText>Download</ButtonText>
        </Button>
        <Button>
          <ButtonText>Compartilhar</ButtonText>
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
)(CompleteNegotiationScreen);
