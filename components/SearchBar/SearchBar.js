import React, { Component } from "react";
import PropTypes from "prop-types";
import { SearchBar, Container, Icon } from "./SearchBarStyles";

export default class Search extends Component {
  static propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func,
    placeholder: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { value, onSearch, placeholder } = this.props;

    return (
      <Container>
        <Icon />
        <SearchBar
          placeholder={placeholder}
          placeholderTextColor="#8B98A2"
          onChangeText={onSearch}
          value={value}
          underlineColorAndroid="transparent"
        />
      </Container>
    );
  }
}
