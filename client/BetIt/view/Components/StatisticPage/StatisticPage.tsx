import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { RootStackParamList } from '../../../router/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const screenWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<RootStackParamList, 'Statistic'>;
export default function StatisticPage({ navigation }: Props)  {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });

  //const userId = route?.params?.userId;

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bets/getStats`);
        const data = await response.json();

        setStats({
          correct: data.correctAnswers || 0,
          incorrect: data.incorrectAnswers || 0,
        });
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const chartData = [
    {
      name: 'Correct',
      population: stats.correct,
      color: 'green',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Incorrect',
      population: stats.incorrect,
      color: 'red',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bets Statistics</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <PieChart
          data={chartData}
          width={screenWidth}
          height={250}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
