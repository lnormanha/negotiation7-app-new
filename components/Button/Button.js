import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View} from 'react-native';
import {
  Container,
  Text,
  IconContainer,
  Icon,
  TextArea,
  ContentArea,
} from './ButtonStyles';

export default class Button extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    spaced_icons: PropTypes.bool,
    onPress: PropTypes.func,
    showIcon: PropTypes.bool,
    small: PropTypes.bool,
    bottomMargin: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    outline: PropTypes.bool,
  };

  // Defaults for props
  static defaultProps = {
    title: 'Continuar',
    spaced_icons: false,
    onPress: () => {},
    small: false,
  };

  render() {
    const {
      title,
      spaced_icons,
      onPress,
      showIcon,
      small,
      bottomMargin,
      loading,
      disabled,
      outline,
    } = this.props;
    return (
      <Container
        onPress={onPress}
        small={small}
        bottomMargin={bottomMargin}
        disabled={disabled}
        outline={outline}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <ContentArea small={small}>
            <TextArea>
              <Text disabled={disabled} outline={outline}>
                {title}
              </Text>
              {!spaced_icons && showIcon && (
                <IconContainer spaced_icons={spaced_icons}>
                  <Icon></Icon>
                </IconContainer>
              )}
            </TextArea>
            {spaced_icons && showIcon && (
              <IconContainer spaced_icons={spaced_icons}>
                <Icon></Icon>
              </IconContainer>
            )}
          </ContentArea>
        )}
      </Container>
    );
  }
}
