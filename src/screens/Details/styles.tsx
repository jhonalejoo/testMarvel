import {StyleSheet} from 'react-native';
import { colors } from '../../utils/constants';

const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color:colors.text
  },
  comicsListContainer: {
    flex: 1,
  },
});

export default detailsStyles;
