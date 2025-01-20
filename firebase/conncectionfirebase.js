// Conncectionfirebase.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';

const Conncectionfirebase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    // Référence à la racine de la base de données
    const ref = database().ref('/10_10_2024/daily_simple_questions_thread_-_october_01,_2024');

    // Écouter les données une fois
    ref.once('value')
  .then(snapshot => {
    const allData = snapshot.val();
    if (allData) {
      const formattedData = [];
      for (const entry in allData) {
        formattedData.push(allData[entry]);
      }
      setData(formattedData);
    } else {
      console.warn('Aucune donnée trouvée à ce chemin.');
    }
    setLoading(false);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
    setLoading(false);
  });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Liste de tous les mots-clés
      </Text>
      <Text>Application connectée à Firebase !</Text>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>Mot: {item.word}</Text>
            <Text>Fréquence: {item.frequency}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Conncectionfirebase;