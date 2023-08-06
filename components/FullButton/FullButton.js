import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { Container, Label } from "./FullButtonStyles";


export default class FullButton extends Component {
  static propTypes = {
    label: PropTypes.string,
    onPress: PropTypes.func,
    loading: PropTypes.bool
  };

  render() {
    const { loading, onPress, label } = this.props;
    return (
      <Container onPress={onPress}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Label>{label}</Label>
        )}
      </Container>
    );
  }
}
