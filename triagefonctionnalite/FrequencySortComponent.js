// FrequencySortComponent.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FrequencySortComponent = ({ data }) => {
  const [sortedData, setSortedData] = useState([]); // Données triées
  const [filterType, setFilterType] = useState(''); // Type de filtre sélectionné

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

  // Fonction pour filtrer par mot-clé
  const filterByKeyword = () => {
    const groupedData = {};

    // Grouper les données par date et thread
    data.forEach(item => {
      const key = `${item.date}-${item.thread}`;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });

    // Extraire les mots-clés pour chaque groupe
    const keywordGroups = Object.keys(groupedData).map(key => {
      const keywords = groupedData[key].map(item => item.word);
      return {
        date: groupedData[key][0].date,
        thread: groupedData[key][0].thread,
        keywords: keywords
      };
    });

    setSortedData(keywordGroups);
  };

  // Gérer le changement de sélection dans le menu déroulant
  const handleFilterChange = (filterType) => {
    setFilterType(filterType);
    if (filterType === 'frequency') {
      sortByFrequency();
    } else if (filterType === 'keyword') {
      filterByKeyword();
    } else {
      setSortedData([]); // Réinitialiser les données triées
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Affichage des données</Text>

      {/* Menu déroulant */}
      <Picker
        selectedValue={filterType}
        onValueChange={handleFilterChange}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionner une option" value="" />
        <Picker.Item label="Trier par fréquence" value="frequency" />
        <Picker.Item label="Filtrer par mot-clé" value="keyword" />
      </Picker>

      {/* Afficher les données triées ou filtrées */}
      {filterType === 'frequency' && (
        <FlatList
          data={sortedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.date}>Date du : {item.date}</Text>
              <Text style={styles.thread}>Thread : {item.thread}</Text>
              <Text style={styles.frequencies}>
                Les 10 meilleures fréquences sont :{' '}
                <Text style={styles.frequencyValue}>{item.topFrequencies.join(', ')}</Text>
              </Text>
            </View>
          )}
        />
      )}

      {filterType === 'keyword' && (
        <FlatList
          data={sortedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.date}>Date du : {item.date}</Text>
              <Text style={styles.thread}>Thread : {item.thread}</Text>
              <Text style={styles.keywords}>
                Les mots-clés sont :{' '}
                <Text style={styles.keywordValue}>{item.keywords.join(', ')}</Text>
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#521887', // Fond légèrement gris
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f8f8f8', // Couleur sombre pour le titre
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3, // Ombre légère
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Ombre légère
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50', // Couleur sombre pour la date
    marginBottom: 5,
  },
  thread: {
    fontSize: 16,
    color: '#34495e', // Couleur légèrement différente pour le thread
    marginBottom: 10,
  },
  frequencies: {
    fontSize: 14,
    color: '#7f8c8d', // Couleur grise pour le texte descriptif
  },
  frequencyValue: {
    fontWeight: 'bold',
    color: '#e74c3c', // Couleur rouge pour les valeurs de fréquence
  },
  keywords: {
    fontSize: 14,
    color: '#7f8c8d', // Couleur grise pour le texte descriptif
  },
  keywordValue: {
    fontWeight: 'bold',
    color: '#27ae60', // Couleur verte pour les mots-clés
  },
});

export default FrequencySortComponent;