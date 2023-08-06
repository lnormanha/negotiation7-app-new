import React from "react";
import { ActivityIndicator } from "react-native";
// import PropTypes from 'prop-types';
import { Container, Icon, Label } from "./FacebookButtonStyles";
const FacebookButton = props => {
  return (
    <Container onPress={props.onPress}>
      <Icon />
      {props.loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Label>Facebook</Label>
      )}
    </Container>
  );
};

export default FacebookButton;
