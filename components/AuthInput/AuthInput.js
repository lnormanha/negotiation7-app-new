import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import {
  Container,
  InputContainer,
  Label,
  InputText,
  LabelArea
} from "./AuthInputStyles";

export default class AuthInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func
  };

  // Defaults for props
  static defaultProps = {
    label: "Test",
    placeholder: "Digite Aqui",
    onChangeText: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  render() {
    const { label, placeholder, onChangeText, value } = this.props;
    const { focused } = this.state;
    return (
      <Container>
        <LabelArea>
          <Label focused={focused}>{label}</Label>
        </LabelArea>
        <InputContainer>
          <InputText
            placeholder={placeholder}
            value={value}
            onChangeText={text => onChangeText(text)}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            focused={focused}
            {...this.props}
          />
        </InputContainer>
      </Container>
    );
  }
}
