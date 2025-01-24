import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
  DrawerItem,
} from '@react-navigation/drawer';

import Home from '../screens/Home/Home';
import { colors } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar sesión"
        onPress={async () => {
          await AsyncStorage.removeItem('user');
          props.navigation.navigate('InitView');
        }}
      />
    </DrawerContentScrollView>
  );
}

const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: colors.primary,
        headerTintColor: colors.primary, // Cambia el color del ícono del Drawer (hamburger icon)       
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
