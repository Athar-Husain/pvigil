import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../components/DrawerContent';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Auth" component={AuthNavigator} />
        <AppStack.Screen name="Main" component={MainNavigator} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
