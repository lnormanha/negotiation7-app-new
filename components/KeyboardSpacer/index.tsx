import React, { useEffect, useState } from "react";
import {
  Keyboard,
  LayoutAnimation,
  View,
  Dimensions,
  Platform,
  StyleSheet,
  KeyboardEventListener,
  EmitterSubscription,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};

interface KeyboardSpacerProps {
  topSpacing: number;
  onToggle: (x: boolean, y: number) => void;
  style: StyleSheet;
}

export const KeyboardSpacer = ({
  topSpacing = 0,
  onToggle = () => null,
  style,
}: KeyboardSpacerProps) => {
  let _listeners: EmitterSubscription[] | null = null;

  const [state, setState] = useState({
    keyboardSpace: 0,
    isKeyboardOpened: false,
  });

  const updateKeyboardSpace = (event: LayoutAnimationConfig) => {
    if (!event.endCoordinates) {
      return;
    }

    let animationConfig = defaultAnimation;
    if (Platform.OS === "ios") {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    // get updated on rotation
    const screenHeight = Dimensions.get("window").height;
    // when external physical keyboard is connected
    // event.endCoordinates.height still equals virtual keyboard height
    // however only the keyboard toolbar is showing if there should be one
    const keyboardSpace =
      screenHeight / 2 - (event.endCoordinates.screenY + topSpacing);
    setState({
      keyboardSpace,
      isKeyboardOpened: true,
    });
    onToggle(true, keyboardSpace);
  };

  const resetKeyboardSpace = (event: LayoutAnimationConfig) => {
    let animationConfig = defaultAnimation;
    if (Platform.OS === "ios") {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    setState({
      keyboardSpace: 0,
      isKeyboardOpened: false,
    });

    onToggle(false, 0);
  };

  useEffect(() => {
    const updateListener =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const resetListener =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    _listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];

    () => {
      _listeners?.forEach((listener) => listener.remove());
    };
  }, []);

  return (
    <View style={[styles.container, { height: state.keyboardSpace }, style]} />
  );
};
