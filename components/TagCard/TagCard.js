import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Folder, Name } from "./TagCardStyles";

export default class TagCard extends Component {
  // Prop type warnings
  static propTypes = {
    name: PropTypes.string,
    quantity: PropTypes.string,
    onPress: PropTypes.func,
    selected: PropTypes.bool
  };

  // Defaults for props
  static defaultProps = {
    name: "9glabs",
    quantity: 2
  };

  render() {
    const { name, quantity, onPress, selected } = this.props;
    return (
      <Container onPress={onPress} selected={selected}>
        <Folder />
        <Name numberOfLines={1}>
          ({quantity}) {name}
        </Name>

      </Container>
    );
  }
}
