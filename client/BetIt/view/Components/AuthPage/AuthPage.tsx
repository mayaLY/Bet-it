// AuthPage.tsx
import React from 'react';
import {View,Button,Switch,Text,StyleSheet,ActivityIndicator,} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../router/AppNavigator';
import { useTheme } from '../../../context/Theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthPage({ navigation }: Props) {
  const [loading, setLoading] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

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

  const themeStyles = isDark ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.switchContainer}>
        <Text style={themeStyles.text}>{isDark ? 'Dark' : 'Light'} Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
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
