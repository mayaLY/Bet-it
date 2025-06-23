import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,} from 'react-native';
import { useTheme } from '../../../context/Theme/ThemeContext';
import { RootStackParamList } from '../../../router/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
export default function RegisterPage({ navigation }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [email, setEmail] = useState('');
const [name, setUsername] = useState('');
const [hpassword, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


  const handleRegister = async () => {
    if (!email || !name || !hpassword || hpassword !== confirmPassword) {
      setError("Please fill all fields and make sure passwords match.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://192.168.7.16:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          hpassword,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
       
        throw new Error(data.message || "Registration failed");
      }
  
      
      console.log("User registered:", data);
      
      navigation.navigate("Login");
  
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    
    Alert.alert('Info', 'Google Sign-Up not implemented yet');
  };

  const themeStyles = isDark ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Text style={[styles.title, themeStyles.text]}>Register</Text>

      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Email"
        placeholderTextColor={isDark ? '#ccc' : '#888'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Username"
        placeholderTextColor={isDark ? '#ccc' : '#888'}
        value={name}
        onChangeText={setUsername}
      />

      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Password"
        placeholderTextColor={isDark ? '#ccc' : '#888'}
        value={hpassword}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Confirm Password"
        placeholderTextColor={isDark ? '#ccc' : '#888'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#de5246' }]}
        onPress={handleGoogleSignUp}
      >
        <Text style={styles.buttonText}>Sign up with Google</Text>
      </TouchableOpacity>
    </View>
  );
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
