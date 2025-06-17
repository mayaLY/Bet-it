import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,TouchableOpacity,ActivityIndicator,StyleSheet,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/Theme/ThemeContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../router/AppNavigator';

const ViewBetsPage = () => {
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'viewBetsPage'>>();

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const res = await fetch('http://localhost:3000/bets/getBets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error fetching bets');

        // Sort bets by date (newest first)
        const sorted = data.bets.sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setBets(sorted);
      } catch (err) {
        console.error('Failed to load bets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.betItem, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}
      onPress={() => navigation.navigate('betPage', { betId: item._id })}
    >
      <Text style={[styles.betText, { color: isDark ? '#fff' : '#000' }]}>
        {item.betDescription}
      </Text>
      <Text style={{ color: isDark ? '#aaa' : '#555', fontSize: 12 }}>
        Created: {new Date(item.createdAt).toLocaleString()}
      </Text>
      <Text style={{ color: isDark ? '#aaa' : '#555', fontSize: 12 }}>
        Expires: {new Date(item.expiresAt).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4dd0e1" />
      </View>
    );
  }

  if (bets.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: isDark ? '#fff' : '#000' }}>No bets found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={bets}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  betItem: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  betText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
});

export default ViewBetsPage;
