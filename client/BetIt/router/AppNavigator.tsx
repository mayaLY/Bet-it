import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPage from '../view/Components/AuthPage/AuthPage';
//import RegisterPage from '../screens/RegisterPage';

export type RootStackParamList = {
  Auth: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthPage} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
