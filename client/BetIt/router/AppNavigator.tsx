import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/Theme/ThemeContext';
import AuthPage from '../view/Components/AuthPage/AuthPage';
import RegisterPage from '../view/Components/RegisterPage/RegisterPage';
import LoginPage from '../view/Components/LoginPage/LoginPage';
import HomePage from '../view/Components/HomePage/HomePage';
import NewBet from '../view/Components/NewBetPage/NewBetPage';
import Statistic from '../view/Components/StatisticPage/StatisticPage';
import betPage from '../view/Components/betPage/betPage';
import viewBetsPage from '../view/Components/viewBetsPage/viewBetsPage';
export type RootStackParamList = {
  Auth: undefined;
  Register: undefined;
  Login: undefined;
  HomePage: undefined;
  NewBet: undefined;
  Statistic: undefined;
  betPage:undefined;
  viewBetsPage:undefined;
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
        <Stack.Screen name="NewBet" component={NewBet} />
        <Stack.Screen name="Statistic" component={Statistic} />
        <Stack.Screen name="betPage" component={betPage} />
        <Stack.Screen name="viewBetsPage" component={viewBetsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
