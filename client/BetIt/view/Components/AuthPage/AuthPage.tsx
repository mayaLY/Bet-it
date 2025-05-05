import React from 'react';
import { View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../router/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthPage({ navigation }: Props) {
  const [loading, setLoading] = React.useState(false);

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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
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
    backgroundColor: '#f4f4f4',
  },
  button: {
    marginVertical: 10,
    width: 200,
  },
});
