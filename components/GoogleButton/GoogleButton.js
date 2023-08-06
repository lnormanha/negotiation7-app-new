import React from "react";
import { ActivityIndicator } from "react-native";
// import PropTypes from 'prop-types';
import { Container, Icon, Label, LoadingContainer } from "./GoogleButtonStyles";

const GoogleButton = props => {
  return (
    <Container onPress={props.onPress}>
      <Icon />
      {props.loading ? (
        <LoadingContainer>
          <ActivityIndicator size="small" color="black" />
        </LoadingContainer>
      ) : (
        <Label>Google</Label>
      )}
    </Container>
  );
};

export default GoogleButton;
