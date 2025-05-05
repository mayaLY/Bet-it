import React from 'react';
import {View,Button,Switch,Text,StyleSheet,ActivityIndicator,} from 'react-native';
import { useTheme } from '../../../context/Theme/ThemeContext';
export default function RegisterPage() {
    const { theme, toggleTheme } = useTheme();
      const isDark = theme === 'dark';
      const themeStyles = isDark ? darkStyles : lightStyles;
  return (
      <View style={[styles.container, themeStyles.container]}>
        <View style={styles.switchContainer}>
          <Text style={themeStyles.text}>{isDark ? 'Dark' : 'Light'} Mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
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
