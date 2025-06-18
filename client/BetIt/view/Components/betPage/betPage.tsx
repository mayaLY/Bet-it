import React, { useEffect, useState } from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Button,Alert,} from 'react-native';
import { useTheme } from '../../../context/Theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BetPage = ({ route }: any) => {
  const { betId } = route.params;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [bet, setBet] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [hasPicked, setHasPicked] = useState(false);
  const [userPick, setUserPick] = useState<string | null>(null);

  useEffect(() => {
    const fetchBet = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch('http://192.168.7.11:3000/bets/getBetById', {
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
        setIsExpired(new Date(data.bet.expiresAt) < new Date());
      } catch (err) {
        console.error('Error fetching bet:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBet();
  }, [betId]);

   useEffect(() => {
    const fetchUserPick = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`http://192.168.7.11:3000/bets/hasPicked`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ betId }),
          }
        );
        const data = await res.json();
        if (data.picked) {
          setHasPicked(true);
          setUserPick(data.optionDescription);
        }
      } catch (err) {
        console.error('Error checking user pick:', err);
      }
    };

    if (betId) fetchUserPick();
  }, [betId]);

  const handleSubmitPick = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://192.168.7.11:3000/bets/pickOption`, {
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

  if (loading) return <Text>Loading...</Text>;
  if (!bet) return <Text>Bet not found</Text>;

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

      {!hasPicked ? (
        <>
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedOption(opt._id)}
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
            >
              <Text
                style={{
                  color: selectedOption === opt._id ? '#fff' : '#000',
                }}
              >
                {opt.optionDescription}
              </Text>
            </TouchableOpacity>
          ))}
          {selectedOption && (
            <Button title="Submit Pick" onPress={handleSubmitPick} />
          )}
        </>
      ) : (
        <Text style={{ color: 'green', marginTop: 10 }}>
          You picked: {userPick}
        </Text>
      )}
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
  optionItem: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
});

export default BetPage;
