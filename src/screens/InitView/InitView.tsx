import React, { useEffect } from 'react';
import {View, Image} from 'react-native';
import {PrincipalTextInput} from '../../components/textInput/PrincipalTextInput.tsx';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import InitViewStyles from './styles.tsx';
import {colors} from '../../utils/constants.tsx';
import {PrimaryButton} from '../../components/buttons/PrimaryButton.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {
  ValidateEmail,
  ValidatePassword,
} from '../../functions/ErrorHandling.tsx';
import { PrincipalText } from '../../components/texts/PrincipalText.tsx';
import { typography } from '../../utils/typography.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Drawer: undefined;
};

const InitView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const creteSchema = Yup.object().shape({
    email: ValidateEmail(),
    password: ValidatePassword(),
  });

  useEffect(() => { 
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if(jsonValue !== null){
          navigation.navigate('Drawer');
        }
      } catch(e) {
        // error reading value
      }
    }
    getData();
  }, []);

  const redirect = async (values: any) => {
    try {
      const jsonValue = JSON.stringify({email:values.email});
      await AsyncStorage.setItem('user', jsonValue);
      if(values.email === 'jhonalejoo@gmail.com' && values.password === 'password'){
        navigation.navigate('Drawer');
      }
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={InitViewStyles.container}>
      <LinearGradient
        style={InitViewStyles.gradientStyles}
        start={{x: 0.7, y: 0}}
        end={{x: 0.7, y: 1}}
        colors={[colors.primary, colors.background]}>
        <Image
          source={require('../../../assets/images/login.png')}
          style={InitViewStyles.image}
        />
      </LinearGradient>
      <Formik
        initialValues={{email: 'jhonalejoo@gmail.com', password: 'password'}}
        validationSchema={creteSchema}
        onSubmit={redirect}>
        {({errors, touched, handleSubmit, values, setFieldValue}) => (
          <View>
            <PrincipalTextInput
              value={values.email}
              valueChange={'email'}
              nameIcon={'email'}
              change={setFieldValue}
              style={InitViewStyles.textInput}
              label={'Correo'}
              mode={'flat'}
              keyboard={'numeric'}
              error={!!errors?.email && touched?.email}
            />
             {errors?.email && touched?.email && (
                <PrincipalText text={errors.email} styles={typography.error} />
              )}
            <PrincipalTextInput
              value={values.password}
              valueChange={'password'}
              change={setFieldValue}
              style={InitViewStyles.textInput}
              label={'Contraseña'}
              nameIcon={'eye'}
              mode={'flat'}
              security={true}
              keyboard={'default'}
              error={!!errors?.password && touched?.password}
            />
            {errors?.password && touched?.password && (
                <PrincipalText text={errors.password} styles={typography.error} />
              )}
            <View style={InitViewStyles.containerButton}>
              <PrimaryButton
                text={'Iniciar sesión'}
                width={150}
                height={50}
                backgroundColor={colors.primary}
                disabled={false}
                action={() => handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default InitView;
