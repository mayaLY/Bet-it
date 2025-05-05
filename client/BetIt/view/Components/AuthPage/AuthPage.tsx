import React from 'react';
import { View, Button, ActivityIndicator, Text } from 'react-native';
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

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      {loading
        ? <ActivityIndicator size="large" />
        : <Button title="Go to Register" onPress={handleRegister} />}
    </View>
  );
}
