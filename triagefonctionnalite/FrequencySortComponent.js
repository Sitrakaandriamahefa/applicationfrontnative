// FrequencySortComponent.js
import React, { useState } from 'react';
import { View, Text, FlatList,} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 

const FrequencySortComponent = ({ data }) => {
  const [sortedData, setSortedData] = useState([]); // Données triées

  // Fonction pour trier les données par fréquence
  const sortByFrequency = () => {
    const groupedData = {};

    // Grouper les données par date et thread
    data.forEach(item => {
      const key = `${item.date}-${item.thread}`;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });

    // Trier chaque groupe par fréquence (décroissant) et prendre les 10 premiers
    const sortedGroups = Object.keys(groupedData).map(key => {
      const sorted = groupedData[key].sort((a, b) => b.frequency - a.frequency).slice(0, 10);
      return {
        date: groupedData[key][0].date,
        thread: groupedData[key][0].thread,
        topFrequencies: sorted.map(item => item.frequency)
      };
    });

    setSortedData(sortedGroups);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Affichage du donner
      </Text>

      {/* Menu déroulant */}
      <Picker
        onValueChange={(itemValue) => {
          if (itemValue === 'frequency') {
            sortByFrequency();
          }
        }}
        style={{ marginBottom: 20 }}
      >
        <Picker.Item label="Sélectionner une option" value="" />
        <Picker.Item label="Trier par fréquence" value="frequency" />
      </Picker>

      {/* Afficher les données triées */}
      <FlatList
        data={sortedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontWeight: 'bold' }}>Date du : {item.date}</Text>
            <Text>Thread : {item.thread}</Text>
            <Text>Les 10 meilleures fréquences sont : {item.topFrequencies.join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FrequencySortComponent;