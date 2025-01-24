import React from 'react';
import {TextInput} from 'react-native-paper';
import {IPrincipalTextInput} from './IPrincipalTextInput';
import { colors } from '../../utils/constants';

export const PrincipalTextInput: React.FC<IPrincipalTextInput> = ({
  value,
  valueChange,
  change,
  style,
  label,
  mode,
  security,
  keyboard,
  error,
  nameIcon
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={text => change(valueChange, text)}
      mode={mode}
      style={style}
      keyboardType={keyboard}
      theme={{
        colors: {
          primary: colors.primary,
          error: colors.danger,
          text: colors.text,
          placeholder: colors.mutedText,
          background: colors.cardBackground,
        },
      }}
      textColor={colors.text}
      left={<TextInput.Icon icon={nameIcon} />}
      secureTextEntry={security}
      error={error}
    />
  );
};
