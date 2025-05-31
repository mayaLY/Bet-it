import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function SurveyBuilderPage() {
  const navigation = useNavigation();

  const [description, setDescription] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [options, setOptions] = useState(['', '']); 

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (text: string, index: number) => {
    const updated = [...options];
    updated[index] = text;
    setOptions(updated);
  };

  const handleCreateSurvey = () => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (!description.trim() || validOptions.length < 2) {
      Alert.alert('Error', 'Please fill out the description and at least 2 valid options.');
      return;
    }

    const survey = {
      description,
      expirationDate,
      options: validOptions,
    };

    
   /// navigation.navigate('SurveyDisplay', { survey });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a Bet</Text>

      <TextInput
        style={styles.input}
        placeholder="Bet Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>Select Expiration Date</Text>
        <Text>{expirationDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={expirationDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setExpirationDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.subtitle}>Options:</Text>
      {options.map((option, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChangeText={text => handleOptionChange(text, index)}
        />
      ))}

      <TouchableOpacity onPress={handleAddOption} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Option</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCreateSurvey} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Create Bet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  dateButtonText: {
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#26bbff',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
