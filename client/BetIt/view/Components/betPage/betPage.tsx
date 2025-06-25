import React, { useEffect, useState } from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Button,Alert } from 'react-native';
import { useTheme } from '../../../context/Theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import * as Share from 'expo-sharing'; // optional, native sharing
import { Share as RNShare } from 'react-native';

const BetPage = ({ route }: any) => {
  const { betId } = route.params;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [bet, setBet] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPicked, setHasPicked] = useState(false);
  const [userPick, setUserPick] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchBet = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch('http://192.168.7.16:3000/bets/getBetById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ betId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setBet(data.bet);
      setOptions(data.options);
      if (data.userPick?.option) {
        setSelectedOption(data.userPick.option);
      }

      // Parse user ID from token
      const payload = JSON.parse(atob(token!.split('.')[1]));
      setUserId(payload.userId);

    } catch (err) {
      console.error('Error fetching bet:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPick = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://192.168.7.16:3000/bets/hasPicked`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ betId }),
      });
      const data = await res.json();
      if (data.picked) {
        setHasPicked(true);
        setUserPick(data.optionDescription);
      }
    } catch (err) {
      console.error('Error checking user pick:', err);
    }
  };

  useEffect(() => {
    fetchBet();
  }, [betId]);

  useEffect(() => {
    if (betId) fetchUserPick();
  }, [betId]);

  const handleSubmitPick = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://192.168.7.16:3000/bets/pickOption`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ betId, optionId: selectedOption }),
      });

      const data = await res.json();
      if (res.ok) {
        setHasPicked(true);
        const picked = options.find((o) => o._id === selectedOption);
        setUserPick(picked?.optionDescription || null);
      } else {
        console.warn('Pick failed:', data);
      }
    } catch (err) {
      console.error('Error submitting pick:', err);
    }
  };

  const handleSetCorrect = async (optionId: string) => {
    try {
      console.log("handleSetCorrect is clicked");
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://192.168.7.16:3000/bets/setCorrectOption`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ betId, optionId }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Correct option set successfully');
        fetchBet(); 
      } else {
        console.warn('Failed to set correct option:', data);
      }
    } catch (err) {
      console.error('Error setting correct option:', err);
    }
  };
  const handleShare = async () => {
  const url = Linking.createURL(`bet/${betId}`);
  try {
    await RNShare.share({
      message: `Join this bet: ${bet.betDescription}\n\nClick to pick: ${url}`,
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
};

  if (loading) return <Text>Loading...</Text>;
  if (!bet) return <Text>Bet not found</Text>;

  const isOwner = userId && bet.createdBy?._id === userId;
  const isExpired = new Date(bet.expiresAt) < new Date();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#f9f9f9' },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        {bet.betDescription}
      </Text>
      <Text style={{ color: isDark ? '#aaa' : '#333' }}>
        Expires: {new Date(bet.expiresAt).toLocaleString()}
      </Text>

      <Text style={[styles.optionsTitle, { color: isDark ? '#fff' : '#000' }]}>
        Options:
      </Text>

      {options.map((opt, idx) => (
        <View key={idx} style={styles.optionContainer}>
          <Text style={{ color: isDark ? '#fff' : '#000' }}>
            • {opt.optionDescription}
          </Text>

          {!hasPicked && !isExpired && (
            <TouchableOpacity
              style={[
                styles.optionItem,
                {
                  backgroundColor:
                    selectedOption === opt._id
                      ? '#4caf50'
                      : isDark
                      ? '#333'
                      : '#ddd',
                },
              ]}
              onPress={() => setSelectedOption(opt._id)}
            >
              <Text
                style={{
                  color: selectedOption === opt._id ? '#fff' : '#000',
                }}
              >
                {selectedOption === opt._id ? 'Selected' : 'Pick'}
              </Text>
            </TouchableOpacity>
          )}

          {isOwner && isExpired && (
            <Button
              title="Mark as Correct"
              onPress={() => handleSetCorrect(opt._id)}
            />
          )}
        </View>
      ))}

      {!hasPicked && selectedOption && !isExpired && (
        <Button title="Submit Pick" onPress={handleSubmitPick} />
      )}

      {hasPicked && (
        <Text style={{ color: 'green', marginTop: 10 }}>
          You picked: {userPick}
        </Text>
      )}
      <Button title="Share This Bet" onPress={handleShare} />
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
  optionContainer: {
    marginVertical: 10,
  },
  optionItem: {
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
  },
});

export default BetPage;
