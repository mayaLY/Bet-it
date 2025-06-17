import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/Theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const viewBetsPage = ({ navigation, route }: any) => {
  const { betId } = route.params;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [bet, setBet] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchBet = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      const res = await fetch('http://localhost:3000/bets/getBetById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setBet(data.bet);
      setOptions(data.options);
      console.log(data)
    } catch (err) {
      console.error('Error fetching bet:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchBet();
}, [betId]);

  if (loading) return <Text>Loading...</Text>;
  if (!bet) return <Text>Bet not found</Text>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f9f9f9' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{bet.betDescription}</Text>
      <Text style={{ color: isDark ? '#aaa' : '#333' }}>Expires: {new Date(bet.expiresAt).toLocaleString()}</Text>

      <Text style={[styles.optionsTitle, { color: isDark ? '#fff' : '#000' }]}>Options:</Text>
      {options.map((opt, idx) => (
        <Text key={idx} style={{ color: isDark ? '#fff' : '#000' }}>
          • {opt.optionDescription}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default viewBetsPage;
