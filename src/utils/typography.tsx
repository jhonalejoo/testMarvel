import {StyleSheet} from 'react-native';
import { colors } from './constants';


export const typography = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
  error: {
    marginLeft: '5%',
    fontSize: 10,
    color: colors.danger,
    marginTop: '2%',
  },
});