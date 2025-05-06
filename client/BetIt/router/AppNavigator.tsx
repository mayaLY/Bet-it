import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPage from '../view/Components/AuthPage/AuthPage';
import RegisterPage from '../view/Components/RegisterPage/RegisterPage';
import LoginPage from '../view/Components/LoginPage/LoginPage';
export type RootStackParamList = {
  Auth: undefined;
  Register: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{
          headerStyle: {
            backgroundColor: '#1e90ff', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerShadowVisible: false, 
        }}>
        <Stack.Screen name="Auth" component={AuthPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
