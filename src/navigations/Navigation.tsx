import * as React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InitView from '../screens/InitView/InitView';
import DrawerComponent from './Drawer';
import Details from '../screens/Details/Details';
import { colors } from '../utils/constants';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Platform.OS === 'ios' ? 'white' : 'transparent',
  },
};

const Navigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
          options={{headerShown: false,title:'Inicio'}}
          name="InitView"
          component={InitView}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Drawer"
          component={DrawerComponent}
        />
         <Stack.Screen
          options={{headerShown: true,title:'Detalle',headerTintColor: colors.primary}}
          name="Details"
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
