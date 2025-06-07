import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../context/Theme/ThemeContext';

// Define the type for the Bet object
interface Bet {
  _id: string;
  betDescription: string;
  options: string[];
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

const betPage = ({ navigation, route }: { navigation: any; route: any }) => {
  const { betId } = route.params;
  const [bet, setBet] = useState<Bet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchBet = async () => {
      try {
        const res = await fetch('http://localhost:3000/bets/getBetById', {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json',
         },
     body: JSON.stringify({ betId }),
    });
        const data = await res.json();
        setBet(data);
      } catch (err) {
        console.error('Failed to fetch bet:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBet();
  }, [betId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!bet) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>Bet not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{bet.betDescription}</Text>
      <Text style={[styles.expiration, { color: isDark ? '#aaa' : '#555' }]}>
        Expires at: {new Date(bet.expiresAt).toLocaleString()}
      </Text>

      <Text style={[styles.subTitle, { color: isDark ? '#fff' : '#000' }]}>Options:</Text>
      {bet.options.map((option, index) => (
        <View key={index} style={[styles.optionBox, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}>
          <Text style={{ color: isDark ? '#fff' : '#000' }}>{option}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expiration: {
    fontSize: 14,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionBox: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default betPage;
