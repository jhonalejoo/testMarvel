import React from 'react';
import {Pressable} from 'react-native';
import buttonsStyles from './styles.tsx';
import { IPrimaryButton } from './IPrimaryButton.tsx';
import { PrincipalText } from '../texts/PrincipalText.tsx';
import { colors } from '../../utils/constants.tsx';


export const PrimaryButton: React.FC<IPrimaryButton> = ({
  text,
  backgroundColor,
  disabled,
  height,
  width,
  action
}) => {
  return (
    <Pressable
    disabled={disabled}
    onPress={action}
    style={{
      ...buttonsStyles.containerPrimary,
      width: width,
      height: height,
      backgroundColor: disabled ? colors.mutedText : backgroundColor,
    }}>
    <PrincipalText text={text} styles={buttonsStyles.textButtonPrimary} />
  </Pressable>
  );
};