import * as React from 'react';
import {TextInputProps} from 'react-native';
import {InputContainer, InputLabel, InputText} from './InputStyles';

interface InputProps extends TextInputProps {
  name: string;
  placeholder: string;
  onChangeText(): void;
}

function Input({
  name,
  placeholder,
  onChangeText,
  value,
  onFocus,
  ...rest
}: InputProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <InputContainer>
      <InputLabel focused={focused}>{name}</InputLabel>
      <InputText
        {...rest}
        placeholder={placeholder}
        value={value}
        onChangeText={(text: string) => onChangeText(text)}
        onFocus={() => {
          onFocus && onFocus();
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        focused={focused}
        underlineColorAndroid="transparent"
      />
    </InputContainer>
  );
}

export default Input;
