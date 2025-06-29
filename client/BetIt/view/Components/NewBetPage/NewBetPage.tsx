import React, { useState } from 'react';
import {View,Text,TextInput,Button,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../../context/Theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewBetPage = ({ navigation }: any) => {
  const [betDescription, setBetDescription] = useState('');
  const [expiresAt, setExpiresAt] = useState(new Date());
  const [options, setOptions] = useState(['', '']);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const updated = new Date(expiresAt);
      updated.setFullYear(selectedDate.getFullYear());
      updated.setMonth(selectedDate.getMonth());
      updated.setDate(selectedDate.getDate());
      setExpiresAt(updated);
    }
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const updated = new Date(expiresAt);
      updated.setHours(selectedTime.getHours());
      updated.setMinutes(selectedTime.getMinutes());
      updated.setSeconds(0);
      setExpiresAt(updated);
    }
  };

  const createBet = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch("http://192.168.7.16:3000/bets/setBet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          betDescription,
          expiresAt,
          options,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Creating bet failed");
      }

   
      navigation.reset({
  index: 2,
  routes: [
    { name: 'HomePage' },
    { name: 'viewBetsPage' },
    { name: 'betPage', params: {betId: data.bet._id } },
  ],
});

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#f9f9f9' },
      ]}
    >
      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
        Bet Description
      </Text>
      <TextInput
        placeholder="Enter Bet description"
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        value={betDescription}
        onChangeText={setBetDescription}
        style={[styles.input, isDark && styles.inputDark]}
      />

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
        Expiration Date & Time
      </Text>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={[styles.input, isDark && styles.inputDark]}
      >
        <Text style={{ color: isDark ? '#fff' : '#000' }}>
          {expiresAt.toDateString()}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={[styles.input, isDark && styles.inputDark]}
      >
        <Text style={{ color: isDark ? '#fff' : '#000' }}>
          {expiresAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={expiresAt}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={expiresAt}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
        Options
      </Text>
      {options.map((option, index) => (
        <TextInput
          key={index}
          placeholder={`Option ${index + 1}`}
          placeholderTextColor={isDark ? '#aaa' : '#555'}
          value={option}
          onChangeText={(text) => handleOptionChange(index, text)}
          style={[styles.input, isDark && styles.inputDark]}
        />
      ))}

      <TouchableOpacity onPress={addOption} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Option</Text>
      </TouchableOpacity>

      <Button title="Create Bet" onPress={createBet} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  inputDark: {
    backgroundColor: '#222',
    borderColor: '#444',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NewBetPage;
