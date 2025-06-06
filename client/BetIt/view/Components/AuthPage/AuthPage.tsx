import React from 'react';
import {View,Text,Switch,StyleSheet,ActivityIndicator,TouchableOpacity,} from 'react-native';
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
          <TouchableOpacity style={[styles.button, themeStyles.button]} onPress={handleRegister}>
            <Text style={styles.buttonText}>Go to Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, themeStyles.button]} onPress={handleLogin}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
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
    backgroundColor: '#273a73',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
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
  button: {
    backgroundColor: '#273a73',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#273a73',
  },
  text: {
    color: '#fff',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#4dd0e1',
  },
});
