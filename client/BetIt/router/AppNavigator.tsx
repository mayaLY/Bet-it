import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/Theme/ThemeContext';
import AuthPage from '../view/Components/AuthPage/AuthPage';
import RegisterPage from '../view/Components/RegisterPage/RegisterPage';
import LoginPage from '../view/Components/LoginPage/LoginPage';
import HomePage from '../view/Components/HomePage/HomePage';
export type RootStackParamList = {
  Auth: undefined;
  Register: undefined;
  Login: undefined;
  HomePage: undefined;
  NewBet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#4dd0e1' : '#273a73',
          },
          headerTintColor: isDark ? '#000' : '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="Auth" component={AuthPage} options={{ title: 'Auth' }} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
