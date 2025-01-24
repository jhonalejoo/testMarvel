import {StyleSheet} from 'react-native';
import { colors } from '../../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color:colors.text
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default styles;
