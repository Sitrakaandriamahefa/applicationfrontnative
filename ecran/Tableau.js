// dependance nécessaire
// npm install @react-native-firebase/app @react-native-firebase/firestore
// npm install @react-native-firebase/auth @react-native-firebase/storage

import React from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { database } from './firebaseConfig'; // Importez database depuis votre fichier de configuration

const Tableau = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5); // Nombre d'éléments par page
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' ou 'desc'

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Référence à la base de données Realtime Database
        const ref = database().ref('/10_10_2024'); // Remplacez '/' par le chemin de votre base de données
        const snapshot = await ref.once('value');
        const dataObject = snapshot.val();

        // Convertir l'objet en tableau de dates, threads et données associées
        const dataArray = Object.keys(dataObject).map((date) => ({
          date,
          threads: Object.keys(dataObject[date]).map((thread) => ({
            thread,
            items: Object.keys(dataObject[date][thread]).map((key) => ({
              id: key,
              ...dataObject[date][thread][key],
            })),
          })),
        }));

        // Trier les dates
        dataArray.sort((a, b) => {
          const dateA = new Date(a.date.replace(/_/g, '-'));
          const dateB = new Date(b.date.replace(/_/g, '-'));
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setData(dataArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOrder]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  // Pagination
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Données de Firebase Realtime Database :</Text>

      {/* Bouton de tri */}
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        <Text style={styles.sortButtonText}>
          Trier par date ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
        </Text>
      </TouchableOpacity>

      {/* Affichage des données */}
      {currentItems.map(({ date, threads }) => (
        <View key={date} style={styles.dateContainer}>
          <Text style={styles.dateText}>Date: {date}</Text>
          {threads.map(({ thread, items }) => (
            <View key={thread} style={styles.threadContainer}>
              <Text style={styles.threadText}>Thread: {thread}</Text>
              <View style={styles.table}>
                <View style={styles.tableHeaderRow}>
                  <Text style={styles.tableHeader}>ID</Text>
                  <Text style={styles.tableHeader}>Frequency</Text>
                  <Text style={styles.tableHeader}>Word</Text>
                </View>
                {items.map((item) => (
                  <View key={item.id} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.id}</Text>
                    <Text style={styles.tableCell}>{item.frequency}</Text>
                    <Text style={styles.tableCell}>{item.word}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      ))}

      {/* Pagination */}
      <View style={styles.pagination}>
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationButton,
              currentPage === index && styles.paginationButtonActive,
            ]}
            onPress={() => paginate(index)}
          >
            <Text style={styles.paginationButtonText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  // gggg
  dateContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  threadContainer: {
    marginBottom: 15,
  },
  threadText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#444',
  },
  sortButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  paginationButtonActive: {
    backgroundColor: '#007BFF',
  },
  paginationButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Tableau;