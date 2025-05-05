import React, { useState } from 'react';
import {View,Button,Switch,ActivityIndicator,StyleSheet,Text,useColorScheme} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../router/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthPage({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // manually toggled theme

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Register');
    }, 1000);
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 1000);
  };

  const toggleTheme = () => setDarkMode(prev => !prev);

  const themeStyles = darkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.switchContainer}>
        <Text style={themeStyles.text}>{darkMode ? 'Dark' : 'Light'} Mode</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={darkMode ? "#fff" : "#000"} />
      ) : (
        <>
          <View style={styles.button}>
            <Button title="Go to Register" onPress={handleRegister} />
          </View>
          <View style={styles.button}>
            <Button title="Go to Login" onPress={handleLogin} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  switchContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    width: 200,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
  },
  text: {
    color: '#000',
    marginRight: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
    marginRight: 10,
  },
});
