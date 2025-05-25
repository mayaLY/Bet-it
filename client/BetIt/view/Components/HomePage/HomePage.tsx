import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,} from 'react-native';
import { useTheme } from '../../../context/Theme/ThemeContext';
import { RootStackParamList } from '../../../router/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'HomePage'>;
export default function HomePage({ navigation }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


  const handleNewBet = async () => {
    navigation.navigate("NewBet");
  };

  const handleViewBets = () => {
    
    Alert.alert('Info', 'Google Sign-Up not implemented yet');
  };
  const handleStatistics = () => {
    
    Alert.alert('Info', 'Google Sign-Up not implemented yet');
  };

  const themeStyles = isDark ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Text style={[styles.title, themeStyles.text]}>HomePage</Text>

   
    

      <TouchableOpacity style={styles.button} onPress={handleNewBet}>
        <Text style={styles.buttonText}>New Bet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button} onPress={handleViewBets}>
        <Text style={styles.buttonText}>View Bets</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleStatistics}>
        <Text style={styles.buttonText}>Statisctics</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#26bbff',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
  },
  input: {
    borderColor: '#ccc',
    color: '#000',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
  },
  text: {
    color: '#fff',
  },
  input: {
    borderColor: '#555',
    color: '#fff',
  },
});
