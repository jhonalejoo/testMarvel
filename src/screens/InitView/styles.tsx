import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../utils/constants.tsx';

const InitViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: '70%',
    height: '40%',
  },
  containerTitle: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  firstTitle:{
    color:colors.primary,
    fontSize:25,
    fontFamily: fontFamily.fontFamilyBold
  },
  secondTitle:{
    color:colors.text,
    fontSize:25,
    fontFamily: fontFamily.fontFamilyBold
  },
  textInput: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.background,
    marginTop: '5%',
    fontFamily: fontFamily.fontFamilyRegular
  },
  containerButton: {
    marginTop: '15%',
    alignSelf: 'center',
    alignItems:'center'
  },
  gradientStyles: {
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export default InitViewStyles;
