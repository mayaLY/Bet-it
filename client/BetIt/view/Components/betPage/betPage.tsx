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

  const handleSubmitPick = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch('http://localhost:3000/bets/pickOption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ betId, optionId: selectedOption }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      Alert.alert("Success", "Your option has been submitted.");
    } catch (err) {
      Alert.alert("Error");
     
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (!bet) return <Text>Bet not found</Text>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f9f9f9' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        {bet.betDescription}
      </Text>
      <Text style={{ color: isDark ? '#aaa' : '#333' }}>
        Expires: {new Date(bet.expiresAt).toLocaleString()}
      </Text>

      <Text style={[styles.optionsTitle, { color: isDark ? '#fff' : '#000' }]}>Options:</Text>
      {options.map((opt: any) => (
        <TouchableOpacity
          key={opt._id}
          onPress={() => !selectedOption && setSelectedOption(opt._id)}
          disabled={!!selectedOption}
          style={[
            styles.optionBox,
            {
              borderColor: selectedOption === opt._id ? '#4dd0e1' : '#ccc',
              backgroundColor:
                selectedOption === opt._id
                  ? '#b2ebf2'
                  : isDark
                  ? '#222'
                  : '#eee',
              opacity: !!selectedOption && selectedOption !== opt._id ? 0.5 : 1,
            },
          ]}
        >
          <Text style={{ color: isDark ? '#fff' : '#000' }}>{opt.optionDescription}</Text>
        </TouchableOpacity>
      ))}

      {!selectedOption && !isExpired && (
        <View style={{ marginTop: 20 }}>
          <Button title="Submit Pick" onPress={handleSubmitPick} disabled={!selectedOption} />
        </View>
      )}

      {selectedOption && (
        <Text style={{ color: 'green', marginTop: 20 }}>
          You picked: {options.find((o) => o._id === selectedOption)?.optionDescription}
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
  optionBox: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default BetPage;
