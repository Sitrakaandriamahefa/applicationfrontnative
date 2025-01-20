//dependance
// npm install react-native-chart-kit

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Graphique = ({ route }) => {
  // Récupérer les données passées via la navigation
  const { data } = route.params;

  // Préparer les données pour le graphique
  const chartData = {
    labels: data.map(({ date }) => date),
    datasets: [
      {
        data: data.map(({ threads }) =>
          threads.reduce((acc, { items }) => acc + items.length, 0)
        ),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Graphique des données</Text>
      <BarChart
        data={chartData}
        width={350}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
});

export default Graphique;